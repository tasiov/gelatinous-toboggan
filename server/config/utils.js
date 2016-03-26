import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import base64 from 'base64-stream';
import { promisify } from 'bluebird';
import controller from '../db/controllers/index';

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

function concatenateToQuilt(src, dest, dest2) {
  return execPromise(`ffmpeg -i ${dest} -i ${src} -filter_complex concat=n=2:v=1:a=1 -f mp4 -y ${dest2}; mv ${dest2} ${dest}; rm ${src}`)
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
    concatQueues[destinationLoc].enqueue(concatenateToQuilt, newExtension, destinationLoc, intermediateLoc);
  } else {
    controller.updateQuiltStatusToReady(quiltId);
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
