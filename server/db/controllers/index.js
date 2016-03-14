/* eslint no-console: [2, { allow: ["log", "warn", "error"] }] */
const Sequelize = require('sequelize');
const db = require('../modules/index.js');

// options = {username: username}
const createUser = (options) =>
  db.User.create(options)
    .then((user) => user)
    .catch((error) => console.log('Error creating user: ', error)
    );

const getAllUsers = () =>
  db.User.findAll()
    .then((users) => users)
    .catch((error) => console.error('Error retreiving users. ', error)
    );

// options = {username: username}
const getUser = (options) =>
  db.User.findOne({ where: options })
    .then((user) => user)
    .catch((error) => console.error('Error retreiving user. ', error)
    );

// options = {username: username}
const getAllUserQuilts = (options) =>
  getUser(options)
    .then((user) => user.getQuilts({ order: [['status', 'DESC']] }))
    .then((quilts) => quilts)
    .catch((error) => console.error('Error retreiving user\'s quilts: ', error)
    );

const getQuilt = (options) =>
  db.Quilt.findOne({ where: options })
    .then((quilt) => quilt )
    .catch((error) => console.error('Error retreiving quilt: ', error)
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
      return Sequelize.Promise.all([
        db.User.findAll(
          { where: {
            username: {
              $in: options.friends,
            },
          }}),
        getUser({ username: options.username})])
    })
    .then((data) =>
      Sequelize.Promise.all([
        newQuilt.setUsers(data[0], { status: 0 }),
        newQuilt.setUsers(data[1], { status: 1 }),
      ]))
    .then((data) => data[0][0].concat(data[1][0]))
    .catch((error) => console.error('Error posting a quilt. ', error))

// let test_getAllUsers = () =>
//   getAllUsers().then(function(users){
//     console.log('users:', users);
//   }).catch(function(error){
//     console.log('error:', error);
//   });
//
// let test_getUser = (options) =>
//   getUser(options).then(function(user){
//     console.log('user:', JSON.stringify(user));
//   }).catch(function(error){
//     console.log('error:', error);
//   })
//
// let test_getAllUserQuilts = (options) =>
//   getAllUserQuilts(options).then(function(user){
//     console.log('user:', JSON.stringify(user));
//   }).catch(function(error){
//     console.log('error:', error);
//   })
//
// let test_postQuilt = (options) => {
//   let q = {
//     username: 'tasio',
//     quilt: {
//       filename: 'quilt4',
//       status: 0,
//       friends: ['josh', 'griffin']
//     }
//   }
//   postQuilt(q).then(function(quilt){
//       console.log('inside test:', JSON.stringify(quilt));
//   }).catch(function(error){
//     console.log('error:', error);
//   })
// }

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getAllUserQuilts,
  postQuilt,
  getQuilt,
  // test_getAllUsers,
  // test_getUser,
  // test_postQuilt
};
