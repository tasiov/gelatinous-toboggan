// import utils from './utils.js'; // our custom middleware

export default (app) => {
  app.get('/api/auth', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.get('/api/quilt', (req, res) => {
    res.send('Hello World!');
  });
  app.post('/api/quilt', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/api/quilt/:id', (req, res) => {
    res.send('Hello World!');
  });
  app.post('/api/quilt/:id', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/api/friends/:id', (req, res) => {
    res.send('Hello World!');
  });
};
