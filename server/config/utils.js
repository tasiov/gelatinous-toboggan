import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import base64 from 'base64-stream';
import { promisify } from 'bluebird';

const execPromise = promisify(exec);
const concatQueues = {};

function moveFromTmpToQuilts(file) {
  const basename = path.basename(file);
  const basedir = file.split(basename)[0];
  return path.join(basedir, '../../quilts', basename);
}

function changeExtentionToMp4(filePath) {
  const name = filePath.split(path.extname(filePath))[0];
  return `${name}.mp4`;
}

export function convertMOVToMP4(filePath, firstFlag) {
  const newFilePath = changeExtentionToMp4(filePath);
  return execPromise(`ffmpeg -i ${filePath} ${firstFlag ? moveFromTmpToQuilts(newFilePath) : newFilePath}; rm ${filePath}`).then(data => console.log(data));
}

function getQuiltFromId(id) {
  return path.join(__dirname, `../videos/quilts/quilt_${id}.mp4`);
}

function tmpQuiltFromId(id) {
  return path.join(__dirname, `../videos/quilts/quilt_${id}_tmp.mp4`);
}

export function concatenateToQuilt(src, dest, dest2) {
  return execPromise(`ffmpeg -i ${src} -i ${dest} -filter_complex concat=n=2:v=1:a=1 -f mp4 -y ${dest2}; mv ${dest2} ${dest}`)
}

export function writeQuiltFile(quiltFolder, id, req, res, firstFlag, userId) {
  const filePath = firstFlag ? path.join(quiltFolder, `quilt_${id}.MOV`) : path.join(quiltFolder, `iquilt_${userId}.MOV`)
  const writeStream = fs.createWriteStream(filePath);
  req.pipe(base64.decode()).pipe(writeStream);
  writeStream.on('finish', () => {
    console.log('start converting');
    convertMOVToMP4(filePath, firstFlag)
      .then(() => {
        console.log('conversion complete')
        if (!firstFlag) {
          const newExtension = changeExtentionToMp4(filePath);
          const destinationLoc = getQuiltFromId(id);
          const intermediateLoc = tmpQuiltFromId(id);
          if (!concatQueues[destinationLoc]) {
            concatQueues[destinationLoc] = createAsyncQueue();
          }
          concatQueues[destinationLoc].enqueue(concatenateToQuilt, newExtension, destinationLoc, intermediateLoc);
        }
      })
    // then send push notification to friends
    res.status(200);
  });
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
        console.log(id, data);
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
