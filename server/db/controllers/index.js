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
    .catch((error) => console.log('Error creating user: ', error));

const getAllUsers = () =>
  db.User.findAll()
    .catch((error) => console.error('Error retrieving users. ', error));

// options = {username: username}
const getUser = (options) =>
  db.User.findOne({ where: options })
    .catch((error) => console.error('Error retrieving user. ', error));

// options = {username: username}
const getAllUserQuilts = (options) =>
  getUser(options)
    .then((user) => user.getQuilts({ order: [['status', 'DESC']] }))
    .catch((error) => console.error('Error retrieving user\'s quilts: ', error));

const getQuilt = (options) => (
  db.Quilt.findOne({ where: options })
    .catch((error) => console.error('Error retrieving quilt: ', error))
);

const postQuilt = (options) => {
  let newQuilt;
  return db.Quilt.create(_.pick(options, ['title', 'theme']))
    .then((quilt) => {
      newQuilt = quilt;
      return getUser({ username: options.creator });
    })
    .then(user => newQuilt.addUser(user, { status: 1 }))
    .then(() => (
      db.User.findAll({
        where: {
          username: {
            $in: options.users,
          },
        },
      })
    ))
    .then(users => newQuilt.addUsers(users, { status: 0 }))
    .then(() => newQuilt.id)
    .catch((error) => console.error('Error posting a quilt. ', error))
};

// const updateUserQuiltStatus = (options) => {
//   const quilt = options.quilt; // quilt module. Can use getQuilt({ filename:quiltname }) to get quilt module
//   const user = options.user; // user module. Can use getUser({username:username}) to get user module
//   return quilt.setUsers(user, { status: 1 });
// };

const updateUserQuiltStatus = (userId, quiltId) => {
  return getUser({ id: userId }).then((user) => {
    return getQuilt({ id: quiltId })
      .then(quilt => quilt.setUsers(user, { status: 1 }));
  });
};



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
  getQuilt,
  postQuilt,
  updateUserQuiltStatus,
};
