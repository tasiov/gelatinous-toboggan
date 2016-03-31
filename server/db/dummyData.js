import sequelize from './index.js';
import modules from './modules/index.js';
import Sequelize from 'sequelize';
// const controllers = require('./controllers/index.js');

const user1 = {
  username: 'maryam',
};

const user2 = {
  username: 'josh',
};

const user3 = {
  username: 'tasio',
};

const user4 = {
  username: 'griffin',
};

const allUsers = [
  user1,
  user2,
  user3,
  user4,
];

const quilt1 = {
  title: 'quilt1',
  theme: 'Theme of quilt 1',
  status: 1,
};

const quilt2 = {
  title: 'quilt2',
  theme: 'Theme of quilt 2',
  status: 0,
};

const quilt3 = {
  title: 'quilt3',
  theme: 'Theme of quilt 3',
  status: 0,
};

const quilt4 = {
  title: 'quilt4',
  theme: 'Theme of quilt 4',
  status: 0,
};

const allQuilts = [
  quilt1,
  quilt2,
  quilt3,
  quilt4,
];

function initializeData() {
  // remove force for production
  return sequelize.sync({ force: true })
    .then(() =>
      Sequelize.Promise.all([
        Sequelize.Promise.map(allUsers, user => modules.User.create(user)),
        Sequelize.Promise.map(allQuilts, quilt => modules.Quilt.create(quilt)),
      ])
    ).then((data) => {
      const createdUsers = data[0];
      const createdQuilts = data[1];
      createdUsers[0].addQuilt(createdQuilts[0], { status: 1 });
      createdUsers[1].addQuilt(createdQuilts[0], { status: 1 });
      createdUsers[1].addQuilt(createdQuilts[1], { status: 0 });
      createdUsers[1].addQuilt(createdQuilts[3], { status: 1 });
      createdUsers[2].addQuilt(createdQuilts[1], { status: 1 });
      createdUsers[3].addQuilt(createdQuilts[1], { status: 1 });
      createdUsers[2].addQuilt(createdQuilts[3], { status: 1 });
      createdUsers[3].addQuilt(createdQuilts[3], { status: 1 });
      createdUsers[0].addQuilt(createdQuilts[2], { status: 0 });
      createdUsers[2].addQuilt(createdQuilts[2], { status: 0 });
      createdUsers[3].addQuilt(createdQuilts[2], { status: 1 });
    });
}

// for development only, remove in production
initializeData();

module.exports = initializeData;
