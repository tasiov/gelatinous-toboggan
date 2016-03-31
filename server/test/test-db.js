import { expect } from 'chai';
import Sequelize from 'sequelize';
import db from '../db/index.js';
import modules from '../db/modules/index.js';
import controllers from '../db/controllers/index.js';

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
    modules.Quilt.create({ title: 'quilt1', status: 1 })
    .then((quilt) => {
      expect(quilt).to.exist;
      expect(quilt.get('title')).to.equal('quilt1');
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
      modules.Quilt.create({ title: 'quilt1', status: 1 })])
    .then((data) => data[0].addQuilt(data[1], { status: 1 }))
    .then((quilts) => expect(quilts[0][0].userId).to.equal(1))
  );
});

// testing the controllers
describe('postQuilt Controller', () => {
  before((done) =>
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => done(null))
      .catch((error) => done(error))
    );

  it('should be able to create quilt and associate users with it', () =>
    Sequelize.Promise.all([
      modules.User.create({ username: 'tasio' }),
      modules.User.create({ username: 'griffin' }),
      modules.User.create({ username: 'josh' })])
    .then(() => {
      const quilt = {
        username: 'tasio',
        friends: ['josh', 'griffin'],
        quilt: { title: 'quilt1', status: 0 },
      };
      return controllers.postQuilt(quilt);
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userId === 1) { // tasio
          expect(data[i].status).to.equal(1);
        } else if (data[i].userId === 1) { // griffin
          expect(data[i].status).to.equal(0);
        } else if (data[i].userId === 2) { // josh
          expect(data[i].status).to.equal(0);
        }
      }
    })
  );
});
