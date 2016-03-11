import utils from './utils.js'; // our custom middleware

export default (app, express) => {
  app.get('/', (req, res) => {
    res.send("Hello World!");
  });
};
