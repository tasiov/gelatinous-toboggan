/* eslint no-console: [2, { allow: ["log", "warn", "error"] }] */
const Sequelize = require('sequelize');
const db = require('../modules/index.js');
const fs = require('fs');
const path = require('path');

// options = {username: username}
const createUser = (options) =>
  db.User.create(options)
    .then((user) => user)
    .catch((error) => console.log('Error creating user: ', error)
    );

const getAllUsers = () =>
  db.User.findAll()
    .then((users) => users)
    .catch((error) => console.error('Error retrieving users. ', error)
    );

// options = {username: username}
const getUser = (options) =>
  db.User.findOne({ where: options })
    .then((user) => user)
    .catch((error) => console.error('Error retrieving user. ', error)
    );

// options = {username: username}
const getAllUserQuilts = (options) =>
  getUser(options)
    .then((user) => user.getQuilts({ order: [['status', 'DESC']] }))
    .then((quilts) => quilts)
    .catch((error) => console.error('Error retrieving user\'s quilts: ', error)
    );

const getQuilt = (options) =>
  db.Quilt.findOne({ where: options })
    .then((quilt) => quilt)
    .catch((error) => console.error('Error retrieving quilt: ', error)
    );

/* options = {
  username: username,
  friends: [],
  quilt: {
    title: quiltTitle,
    theme: quiltTheme,
    video: video
  }
}*/
let newQuilt;

const postQuilt = (options) =>
  db.Quilt.create(options.quilt)
    .then((quilt) => {
      newQuilt = quilt;

      // add video to quilt
      quiltVideos(newQuilt, options.quilt.video);

      return Sequelize.Promise.all([
        db.User.findAll(
          { where: {
            username: {
              $in: options.friends,
            },
          } }),
        getUser({ username: options.username })]);
    })
    .then((data) =>
      Sequelize.Promise.all([
        newQuilt.setUsers(data[0], { status: 0 }),
        newQuilt.setUsers(data[1], { status: 1 }),
      ]))
    .then((data) => data[0][0].concat(data[1][0]))
    .catch((error) => console.error('Error posting a quilt. ', error));

const updateUserQuiltStatus = (options) => {
  const quilt = options.quilt; // quilt module. Can use getQuilt({ filename:quiltname }) to get quilt module
  const user = options.user; // user module. Can use getUser({username:username}) to get user module
  return quilt.setUsers(user, { status: 1 });
}
/************************************************************
                    Helper functions
************************************************************/

const quiltVideos = (quilt, video) => {
  const quiltName = quilt.get('filename');

  console.log('received video:');
  // check if quilt exists
    // create a file named 'quiltName' and append the video to it
    // append new video to existing quiltName
  // const rstream = fs.createReadStream(video);
  // //const rstream = fs.createReadStream(path.join(__dirname, '../videos/video3.mp4'));
  // const wstream = fs.createWriteStream(path.join(__dirname, '../videos/video2.mp4'));
  // rstream.pipe(wstream);

 fs.writeFile(path.join(__dirname, '../videos/video2.mp4'), new Buffer(video, "base64"), function(err) {
   console.log('error writing video:', err);
 });

}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getAllUserQuilts,
  postQuilt,
  getQuilt,
};
