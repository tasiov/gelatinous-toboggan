/* eslint no-console: [2, { allow: ["log", "warn", "error"] }] */
import Sequelize from 'sequelize';
import db from '../modules/index.js';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import utils from '../../config/utils';

// options = { email: email, password: password }
const createUser = (email, password) =>
  db.User.findOrCreate({ where: { email } })
    .spread((user, created) => {
      return created ? user.setPassword(password) : false;
    })
    .catch((error) => console.log(`Error creating user: ${error}`));

const updateUser = (id, data) =>
  db.User.update(data, { where: { id } })
    .catch(err => console.log(err));

const getAllUsers = () =>
  db.User.findAll()
    .catch((error) => console.error(`Error retrieving all users: ${error}`));

// options = {username: username}
const getUser = (options) =>
  db.User.findOne({ where: options })
    .catch((error) => console.error(`Error retrieving user: ${error}`));

const verifyUser = (usernameOrEmail, password) => {
  let currentUser;
  return db.User.findOne({
    where: {
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    },
  })
  .then(user => {
    currentUser = user;
    return user && user.verifyPassword(password);
  })
  .then(isVerified => isVerified ? currentUser : false)
  .catch(error => console.error(`Error verifying user: ${error}`));
}

const crossReference = (emails, phoneNumbers) =>
  db.User.find({
    where: {
      $or: [
        { email: { $in: emails } },
        { phoneNumber: { $in: phoneNumbers } },
      ],
    },
  })
  .then(user => user ? user.get('id') : null)
  .catch(error => console.error(`Error cross referencing user: ${error}`));

// status 0 = pending me
// status 1 = pending others
// status 2 = done
function mapQuilts(userQuilts) {
  return userQuilts.map(userQuilt => ({
    id: userQuilt.get('id'),
    theme: userQuilt.get('theme'),
    // status: userQuilt.get('UserQuilt').get('status') + userQuilt.get('status'),
    status: userQuilt.get('status'),
  })).reverse();
}

// options = {username: username}
const getAllUserQuilts = (username) =>
  getUser({ username })
    .then(user => user.getQuilts())
    .then(mapQuilts)
    .catch(error => console.error(`Error retrieving user's quilts: ${error}`));

const getQuilt = (options) => (
  db.Quilt.findOne({ where: options })
    .catch(error => console.error(`Error retrieving quilt: ${error}`))
);

const addFriends = (userId, friendIds) => {
  let currentUser;
  return db.User.findById(userId).then(user => {
    currentUser = user;
    return db.User.findAll({
      where: {
        id: {
          $in: friendIds,
        },
      },
    });
  }).then(friends => {
    // for some reason, sequelize isn't giving an addFriends method for user
    return Sequelize.Promise.map(friends, friend => currentUser.addFriend(friend))
  }).catch(error => console.log(`Error adding friends: ${error}`));
}

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
          id: {
            $in: options.users,
          },
        },
      })
    ))
    .then(users => newQuilt.addUsers(users, { status: 0 }))
    .then(() => newQuilt.id)
    .catch(error => console.error(`Error posting a quilt: ${error}`))
};

const updateUserQuiltStatus = (userId, quiltId) => {
  return getUser({ id: userId }).then((user) => {
    return getQuilt({ id: quiltId })
      .then(quilt => quilt.setUsers(user, { status: 1 }));
  })
  .then(() => quiltId)
  .catch((error) => console.error(`Error updating user quilt status: ${error}`))
};

const getAllOtherUsers = (username) =>
  db.User.findAll({
    where: {
      $not: {
        username,
      },
    },
  })
  .then((users) => users)
  .catch((error) => console.error(`Error retreiving all other users: ${error}`));

export default {
  addFriends,
  createUser,
  crossReference,
  getAllUsers,
  getAllOtherUsers,
  getUser,
  getAllUserQuilts,
  getQuilt,
  postQuilt,
  updateUser,
  updateUserQuiltStatus,
  verifyUser,
}
