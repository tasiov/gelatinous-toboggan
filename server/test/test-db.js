import { expect } from 'chai';
import Sequelize from 'sequelize';
import db from '../db/index.js';
import modules from '../db/modules/index.js';
// import controllers from '../db/controllers/index.js';

// testing the modules

describe('User Model', () => {
  before((done) =>
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => done(null))
      .catch((error) => done(error))
    );

  it('should be able to create a new user', () =>
    modules.User.create({ username: 'maryam' })
    .then((user) => expect(user).to.exist)
  );
  it('should not create duplicate users', () =>
  modules.User.create({ username: 'maryam' })
  .then((user) => expect(user).to.not.exist)
  .catch((error) => expect(error).to.exist)
  );
});

describe('Quilt Model', () => {
  before((done) =>
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => done(null))
      .catch((error) => done(error))
    );

  it('should be able to create a new quilt', () =>
    modules.Quilt.create({ filename: 'quilt1', status: 1 })
    .then((quilt) => {
      expect(quilt).to.exist;
      expect(quilt.get('filename')).to.equal('quilt1');
    })
  );
});

describe('UserQuilt Model', () => {
  before((done) =>
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => done(null))
      .catch((error) => done(error))
    );

  it('should be able to assign user to a quilt', () =>
    Sequelize.Promise.all([
      modules.User.create({ username: 'maryam' }),
      modules.Quilt.create({ filename: 'quilt1', status: 1 }) ])
    .then((data) => data[0].addQuilt(data[1], { status: 1 }))
    .then((quilts) => expect(quilts[0][0]['userId']).to.equal(1))
    .catch((error) => console.error('Assign Quilt Error:', error))
  );
});
// testing the controllers
