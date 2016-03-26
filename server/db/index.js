/*
This application uses a sqlite db with sequelize orm (http://docs.sequelizejs.com/en/latest/).
The database schema: schema_mvp.png.
*/
const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('quilt', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'quilt.sqlite'),
});

export default sequelize;
