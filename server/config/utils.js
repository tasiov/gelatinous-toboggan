import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export function saveTempMOV(id, video) {
  // check if quilt exists
    // create a file named 'quiltName' and append the video to it
    // append new video to existing quiltName
  // const rstream = fs.createReadStream(video);
  // //const rstream = fs.createReadStream(path.join(__dirname, '../videos/video3.mp4'));
  // const wstream = fs.createWriteStream(path.join(__dirname, '../videos/video2.mp4'));
  // rstream.pipe(wstream);
  const filePath = path.join(__dirname, `../videos/tmp/quilt_${id}.MOV`);
  fs.writeFile(filePath, new Buffer(video, "base64"), function(err, success) {
    if (err) {
      console.log('error writing video:', err);
    } else {
      convertMOVToMP4(filePath);
    }
  });
};

function convertMOVToMP4(filePath) {
  const newFilePath = filePath.split(path.extname(filePath))[0] + '.mp4';
  const convert = exec(`ffmpeg -i ${filePath} ${newFilePath}; rm ${filePath}`, (error, stdout, stderr) => {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
  });
}

function concatenateToQuilt(src, dest, dest2) {
  const convert = exec(`ffmpeg -i ${src} -i ${dest} -filter_complex concat=n=2:v=1:a=1 -f mp4 -y ${dest2}; mv ${dest2} ${dest}`, (error, stdout, stderr) => {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
  });
}
