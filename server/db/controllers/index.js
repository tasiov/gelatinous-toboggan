/* eslint no-console: [2, { allow: ["log", "warn", "error"] }] */
const db = require('../modules/index.js');

const getAllUsers = () =>
  db.User.findAll()
    .then((users) => users
    ).catch((error) => console.error('Error retreiving users. ', error)
    );

// options = {username: username}
const getUser = (options) =>
  db.User.findOne({ where: options })
    .then((user) => user
    ).catch((error) => console.error('Error retreiving user. ', error)
    );

// options = {username: username}
const getAllUserQuilts = (options) =>
  getUser(options)
    .then((user) => user.getQuilts({ order: [['status', 'DESC']] })
    ).then((quilts) => quilts
    ).catch((error) => console.error('Error retreiving user\'s quilts. ', error)
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
      const friends = (options.friends).concat([options.username]);
      return db.User.findAll(
        { where: {
          username: {
            $in: friends,
          },
        } }
      );
      // TODO: update status of username to {status: 1}
    }).then((friends) => newQuilt.setUsers(friends, { status: 0 })
    ).then((data) =>
      console.log('successfully associated quilts with users:', data)
    ).catch((error) =>
      console.error('Error creating a quilt. ', error)
    );


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
//     friends: ['josh', 'griffin'],
//     quilt: {
//       filename: 'quilt4',
//       status: 0    }
//   }
//   postQuilt(q).then(function(quilt){
//       console.log('inside test:', JSON.stringify(quilt));
//   }).catch(function(error){
//     console.log('error:', error);
//   })
// }

module.exports = {
  getAllUsers,
  getUser,
  getAllUserQuilts,
  postQuilt,
  // test_getAllUsers,
  // test_getUser,
  // test_getAllUserQuilts,
  // test_postQuilt
};
