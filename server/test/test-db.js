import Sequelize from 'sequelize';
import { expect } from 'chai';
import db from '../db/index.js';
import modules from '../db/modules/index.js';
import controllers from '../db/controllers/index.js';

// testing the modules

describe('User Model', () => {
  before((done) =>
    db.sequelize.sync({ force : true }) // drops table and re-creates it
      .then(() => done(null))
      .catch((error) => done(error))
    );

  it('should be able to create a new user', () =>
    modules.User.create({ username: 'maryam' })
    .then((user) => expect(user).to.exist)
  );
  it('should not create duplicate users',  () =>
  modules.User.create({ username: 'maryam' })
  .then((user) => expect(user).to.not.exist)
  .catch((error) => expect(error).to.exist)
  );
});
// testing the controllers
