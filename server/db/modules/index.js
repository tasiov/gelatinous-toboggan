/* eslint no-unused-vars: [2, { "varsIgnorePattern": "UserQuilt" }] */

/*
There are two primary tables:
* users:
* quilt:

The following relationships exist within the db:
* users to users: m-n (users can have multiple friends)
* users to quilts: m-n (users can have multiple quilts and quilts can have multiple users)
*/
const Sequelize = require('sequelize');
const sequelize = require('../index.js').sequelize;

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

const Quilt = sequelize.define('quilt', {
  filename: Sequelize.STRING,
  status: {
    type: Sequelize.INTEGER,
    values: [0, 1], // 0 - stitching, 1 - done
  },
});

const UserQuilt = sequelize.define('userQuilt', {
  status: {
    type: Sequelize.INTEGER,
    values: [0, 1], // 0 - pending, 1 - submitted
  },
});

// user - user m-n relationship (friends)
// create the self reference
// TODO: add status field (cancel - 0, pending - 1, accepted - 2) to friends model
User.belongsToMany(User, { as: 'friends', through: 'friends' });

// user - quilt m-n relationship (user-quilt)
User.belongsToMany(Quilt, { through: 'userQuilt' });
Quilt.belongsToMany(User, { through: 'userQuilt' });

module.exports = {
  User,
  Quilt,
};
