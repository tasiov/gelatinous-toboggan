/* eslint no-unused-vars: [2, { "varsIgnorePattern": "UserQuilt" }] */

/*
This application uses a sqlite db with sequelize orm (http://docs.sequelizejs.com/en/latest/).
The database schema: schema_mvp.png.
There are two primary tables:
* users:
* quilt:

The following relationships exist within the db:
* users to users: m-n (users can have multiple friends)
* users to quilts: m-n (users can have multiple quilts and quilts can have multiple users)
*/

import Sequelize from 'sequelize';
import path from 'path';

const sequelize = new Sequelize('quilt', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'quilt.sqlite'),
});

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
  sequelize,
};
