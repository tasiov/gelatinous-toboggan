import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import base64 from 'base64-stream';
import { promisify } from 'bluebird';
import controller from '../db/controllers/index';
import _ from 'lodash';

// this module can still be cleaned up very much
const execPromise = promisify(exec);
const mkdirPromise = promisify(fs.mkdir);
const concatQueues = {};

function moveFromTmpToQuilts(file) {
  const basename = path.basename(file);
  const basedir = file.split(basename)[0];
  return path.join(basedir, '../../quilts', `${basedir.split('/').slice(-2,-1)}.mp4`);
}

function changeExtentionToMp4(filePath) {
  const name = filePath.split(path.extname(filePath))[0];
  return `${name}.mp4`;
}

function convertMOVToMP4(filePath, firstFlag) {
  const newFilePath = changeExtentionToMp4(filePath);
  return execPromise(`ffmpeg -i ${filePath} ${firstFlag ? moveFromTmpToQuilts(newFilePath) : newFilePath}; rm ${filePath}`)
}

export function getQuiltFromId(id) {
  return path.join(__dirname, `../videos/quilts/quilt_${id}.mp4`);
}

function getIntermediateQuiltFromId(id) {
  return path.join(__dirname, `../videos/quilts/quilt_${id}_tmp.mp4`);
}

function getTmpQuiltFromId(quiltId, userId) {
  return path.join(__dirname, `../videos/tmp/quilt_${quiltId}/quilt_${userId}.MOV`);
}

function concatenateToQuilt(src, dest, dest2, quiltId, contributorId) {
  return execPromise(`ffmpeg -i ${dest} -i ${src} -filter_complex concat=n=2:v=1:a=1 -f mp4 -y ${dest2}; mv ${dest2} ${dest}; rm ${src}`)
    .then(() => {
      addedToQuiltNotif(contributorId, quiltId, 2);
      controller.isQuiltDone(quiltId).then((isDone) => {
        if (isDone) doneQuiltNotif(quiltId);
      })
    });
}

function makeTmpDirectoryFromId(id) {
  const quiltFolder = path.join(__dirname, `../videos/tmp/quilt_${id}`);
  return mkdirPromise(quiltFolder);
}

function wrapStreamInPromise(stream) {
  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
}

function newQuiltNotif(userId, quiltId) {
  controller.getQuilt({ id: quiltId })
  .then((quilt) => Promise.all(
    [ quilt.theme, quilt.getUsers({ where: { $not: { id: userId, }, }, }) ]
  )).then((data) => _.forEach(data[1], (user) =>
    // data[0] = quilt theme, data[1] = users array
    // notifType: 1 = invitation to quilt
    // notifType: 2 = contribution made to quilt
    controller.createNotif(user.id, quiltId, data[0], 1)
  ));
}

function addedToQuiltNotif(contributorId, quiltId) {
  Promise.all(
    [ controller.getQuilt({ id: quiltId }),
      controller.getUser({ id: contributorId }) ])
  .then((data) => {
    return Promise.all(
      [ data[0].getUsers({ where: { $not: { id: contributorId, }, }, }),
        data[0].theme,
        data[1].username ])
  }).then((data) => {
    _.forEach(data[0], (user) => (
      controller.createNotif(user.id, quiltId, data[1], 2, data[2])
    ))
  }).catch(console.log);
}

function doneQuiltNotif(quiltId) {
  controller.getQuilt({ id: quiltId })
  .then((quilt) => Promise.all([ quilt.theme, quilt.getUsers() ]))
  .then((data) => {
    _.forEach(data[1], (user) => (
      controller.createNotif(user.id, quiltId, data[0], 3)
    ))
  }).catch(console.log);
}

export async function writeVideoToDiskPipeline(req, res, data, firstFlag) {
  const quiltId = await (firstFlag ? controller.postQuilt(data) : controller.updateUserQuiltStatus(data.creator.id, data.quiltId));
  if (firstFlag) {
    await makeTmpDirectoryFromId(quiltId);
  }
  const filePath = getTmpQuiltFromId(quiltId, data.creator.id);
  const writeStream = fs.createWriteStream(filePath);
  await wrapStreamInPromise(req.pipe(base64.decode()).pipe(writeStream));
  await convertMOVToMP4(filePath, firstFlag)
  if (!firstFlag) {
    const newExtension = changeExtentionToMp4(filePath);
    const destinationLoc = getQuiltFromId(quiltId);
    const intermediateLoc = getIntermediateQuiltFromId(quiltId);
    if (!concatQueues[destinationLoc]) {
      concatQueues[destinationLoc] = createAsyncQueue();
    }
    concatQueues[destinationLoc].enqueue(concatenateToQuilt, newExtension, destinationLoc, intermediateLoc, quiltId, data.creator.id);
  } else {
    controller.updateQuiltStatusToReady(quiltId);
    newQuiltNotif(quiltId, data.creator.id, 1);
  }
  // then send push notification to friends
  // unsure when exactly to send status code
  res.sendStatus(201);

}
// todo: catch errors

function createAsyncQueue() {
  const obj = {};
  obj.storage = [];
  obj.enqueue = (f, ...args) => {
    obj.storage.push(obj._wrap(f, ...args));
    if (obj.storage.length === 1) {
      obj.storage[0]();
    }
  }
  obj._wrap = (f, ...args) => {
    const wrappedF = () => {
      f(...args).then((data) => {
        obj.storage.shift();
        if (obj.storage.length) {
          obj.storage[0]();
        }
      })
    };
    return wrappedF;
  }
  return obj;
}
