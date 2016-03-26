/* eslint no-console: [2, { allow: ["log", "warn", "error"] }] */
import Sequelize from 'sequelize';
import db from '../modules/index.js';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import utils from '../../config/utils';

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

// status 0 = pending me
// status 1 = pending others
// status 2 = done
function mapQuilts(userQuilts) {
  return userQuilts.map(userQuilt => ({
    id: userQuilt.get('id'),
    theme: userQuilt.get('theme'),
    status: userQuilt.get('UserQuilt').get('status') + userQuilt.get('status'),
  })).reverse();
}

// options = {username: username}
const getAllUserQuilts = (options) =>
  getUser(options)
    .then(user => user.getQuilts())
    .then(mapQuilts)
    .catch(error => console.error('Error retrieving user\'s quilts: ', error));

const getQuilt = (options) => (
  db.Quilt.findOne({ where: options })
    .catch((error) => console.error('Error retrieving quilt: ', error))
);

const postQuilt = (options) => {
  let newQuilt;
  let createObj = Object.assign({}, _.pick(options, ['title', 'theme']), {status: 0});
  return db.Quilt.create(createObj)
    .then((quilt) => {
      newQuilt = quilt;
      return getUser({ username: options.creator.username });
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

const updateUserQuiltStatus = (userId, quiltId) => {
  return getUser({ id: userId }).then((user) => {
    return getQuilt({ id: quiltId })
      .then(quilt => quilt.setUsers(user, { status: 1 }));
  }).then(() => quiltId);
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

export default {
  createUser,
  getAllUsers,
  getAllOtherUsers,
  getUser,
  getAllUserQuilts,
  getQuilt,
  postQuilt,
  updateUserQuiltStatus,
}
