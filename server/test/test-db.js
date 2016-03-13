import Sequelize from 'sequelize';
import { expect } from 'chai';
import db from '../db/modules/index.js'

// testing the modules
describe('User Model', () => {

  it('should be a sqlite model', () => {
    db.User.create({ username: 'user1' })
    .then((user) => {
      console.log('create:', user);
      expect().to.be.instanceOf()
    });
  });
  it('should have a schema',  () =>
    expect(User.schema).to.exist
  );
});
// testing the controllers
