const db = require('./index.js');
const modules = require('./modules/index.js');
const Sequelize = require('sequelize');
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

const user5 = {
  username: 'xyz',
};

const allUsers = [
  user1,
  user2,
  user3,
  user4,
  user5,
];

const quilt1 = {
  filename: 'quilt1',
  status: 1,
};

const quilt2 = {
  filename: 'quilt2',
  status: 0,
};

const allQuilts = [
  quilt1,
  quilt2,
];

function initializeData() {
  // remove force for production
  return db.sequelize.sync({ force: true })
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
      createdUsers[2].addQuilt(createdQuilts[1], { status: 1 });
      createdUsers[3].addQuilt(createdQuilts[1], { status: 1 });
    });
}

// for development only, remove in production
initializeData();

module.exports = initializeData;
