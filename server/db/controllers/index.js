'use strict'
const db = require('../modules/index.js');

const getAllUsers = () => {
  return db.User.findAll()
    .then(function(users) {
      // TODO: remove unwanted fields/specify fields to return
      return users;
    }).catch(function(error) {
      console.error('Error retreiving users. ', error);
    });
}

const getUser = (options) => {
  // options = {username: username}
  return db.User.findOne({ where: options })
    .then(function(user) {
      return user;
    }).catch(function(error) {
      console.error('Error retreiving user. ', error);
    });
}

const getAllUserQuilts = (options) => {
  // options = {username: username}
  return getUser(options)
    .then(function(user) {
      return user.getQuilts({order: [['status', 'DESC']]})
        .then(function (quilts) {
          return quilts;
        }).catch(function(error) {
          console.error('Error retreiving user\'s quilts. ', error);
        });
    });
}

const postQuilt = (options) => {
  /* options = {
    username: username,
    friends: [],
    quilt: {
      title: quiltTitle,
      theme: quiltTheme,
      video: video
    }
  }
  */
  let friends = (options.friends).concat([options.username]);

  // console.log('friends:', friends);
  console.log('quilt to be created:', options.quilt);
  let newQuilt;
  return db.Quilt.create(options.quilt)
    .then(function(quilt) {
      // console.log('before adding friends, created quilt:', JSON.stringify(quilt));
      newQuilt = quilt;
      return db.User.findAll(
        {where: {
          username: {
            $in: friends
          }
        }}
      );
    }).then(function(friends){
      // TODO: update status of username to {status: 1}
      return newQuilt.setUsers(friends, {status: 0});
    }).then(function(data){
      console.log('successfully associated quilts with users:', JSON.stringify(data));
    }).catch(function(error) {
      console.error('Error creating a quilt. ', error);
    });
}

let test_getAllUsers = () => {
  getAllUsers().then(function(users){
    console.log('users:', users);
  }).catch(function(error){
    console.log('error:', error);
  });
}
let test_getUser = (options) => {
  getUser(options).then(function(user){
    console.log('user:', JSON.stringify(user));
  }).catch(function(error){
    console.log('error:', error);
  })
}
let test_getAllUserQuilts = (options) => {
  getAllUserQuilts(options).then(function(user){
      console.log('inside test:', options);
    console.log('user:', JSON.stringify(user));
  }).catch(function(error){
    console.log('error:', error);
  })
  console.log('after test');
}

let test_postQuilt = (options) => {
  let q = {
    username: 'tasio',
    friends: ['josh', 'griffin'],
    quilt: {
      filename: 'quilt4',
      status: 0    }
  }
  postQuilt(q).then(function(quilt){
      console.log('inside test:', JSON.stringify(quilt));
  }).catch(function(error){
    console.log('error:', error);
  })
  console.log('after test');
}

module.exports = {
  getAllUsers,
  getUser,
  getAllUserQuilts,
  postQuilt,
  test_getAllUsers,
  test_getUser,
  test_getAllUserQuilts,
  test_postQuilt
};
