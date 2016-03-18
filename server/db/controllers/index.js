/* eslint no-console: [2, { allow: ["log", "warn", "error"] }] */
const Sequelize = require('sequelize');
const db = require('../modules/index.js');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const utils = require('../../config/utils');

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

  /*
    req.body = {
      title: '',
      theme: '',
      users: [],
      creator: ''
      video: base64,
    }
  */
let newQuilt;

const postQuilt = (options) =>
  db.Quilt.create(_.pick(options, ['title', 'theme']))
    .then((quilt) => {
      newQuilt = quilt;

      const quiltId = quilt.get('id');

      utils.saveTempMOV(quiltId, options.video);

      return Sequelize.Promise.all([
        db.User.findAll({
          where: {
            username: {
              $in: options.users,
            },
          },
        }),
        getUser({ username: options.creator })]);
    })
    .then((data) => {
      console.log(data);
      return Sequelize.Promise.all([
        newQuilt.setUsers(data[0], { status: 0 }),
        newQuilt.setUsers(data[1], { status: 1 }),
      ]);
    })
    .catch((error) => console.error('Error posting a quilt. ', error));

const updateUserQuiltStatus = (options) => {
  const quilt = options.quilt; // quilt module. Can use getQuilt({ filename:quiltname }) to get quilt module
  const user = options.user; // user module. Can use getUser({username:username}) to get user module
  return quilt.setUsers(user, { status: 1 });
}

const getAllOtherUsers = (username) =>
  db.User.findAll({
    where: {
      $not: {
        username,
      },
    },
  }).then((users) => users)
    .catch((error) => console.error('Error retreiving users. ', error)
    );

module.exports = {
  createUser,
  getAllUsers,
  getAllOtherUsers,
  getUser,
  getAllUserQuilts,
  postQuilt,
  getQuilt,
};
