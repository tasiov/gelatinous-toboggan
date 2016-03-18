// import utils from './utils.js'; // our custom middleware
import controller from '../db/controllers/index';
import _ from 'lodash';

const currUser = 'tasio';

export default (app) => {
  app.get('/api/auth', (req, res) => {
    // if request query object is empty, send 404
    if (_.isEmpty(req.query)) {
      res.status(400).send('Failed to retrieve query string');
    } else {
      controller.getUser(req.query)
      .then((data) => {
        // if user is not in db, then create user
        if (!data) {
          controller.createUser(req.query)
            .then((user) => res.status(200).send({ id: user.id, username: user.username })
            ).catch((error) => res.status(500).send(`Failed request: ${error}`)
            );
        } else {
          res.status(200).send({ id: data.id, username: data.username });
        }
      }).catch((error) => res.status(500).send(`Failed request: ${error}`)
      );
    }
  });

  app.get('/api/quilt', (req, res) => {
    // if request query object is empty, send 404
    if (_.isEmpty(req.query)) {
      res.status(400).send('Failed to retrieve query string');
    } else {
      controller.getAllUserQuilts(req.query)
      .then((data) =>
        res.status(200).send(data)
      ).catch((error) => res.status(500).send(`Failed request: ${error}`)
      );
    }
  });

  // accepts urlencoded form data
  app.post('/api/quilt', (req, res) => {
    // console.log('quilt post request received:', req.body)
    if (_.isEmpty(req.body)) {
      res.status(400).send('Failed to retrieve video data');
    } else {
      /* TEMPORARY quilt formatting until we know what
       * front-end submission will look like and enable
       * session handling
       */
      // const quilt = {
      //   filename: req.body.filename,
      //   status: Number(req.body.status),
      //   friends: JSON.parse(req.body.friends),
      // };
      // const postData = {
      //   username: req.body.username,
      //   quilt,
      // };
      controller.postQuilt(req.body)
      .then((data) => res.status(200).send(data[0][0])
      ).catch((error) => res.status(500).send(`Failed submission: ${error}`)
      );
    }
  });

  app.get('/api/quilt/:id', (req, res) => {
    controller.getQuilt({ id: req.params.id })
    .then((data) => {
      const responseObj = data || {};
      res.status(200).send(responseObj);
    }).catch((error) => res.status(500).send(`Failed request: ${error}`)
    );
  });

  app.post('/api/quilt/:id', (req, res) => {
    if (_.isEmpty(req.body)) {
      res.status(400).send('Failed to retrieve video');
    } else {
      controller.getQuilt({ id: req.params.id })
      .then((data) => {
        if (_.isEmpty(data)) res.status(500).send('Invalid video id');
        // Concat video to quilt
        res.status(200).send('Received video submission');
      }).catch((error) => res.status(500).send(`Failed request: ${error}`)
      );
    }
  });

  app.get('/api/friends/:id', (req, res) => {
    console.log('get friends:', req.params.id);
    if (_.isEmpty(req.params.id)) {
      res.status(400).send('Failed to retrieve user');
    } else {
      controller.getAllOtherUsers(req.params.id)
      .then((data) => {
        // let friends = Object.assign(data);
        return res.status(200).send(data)
      }
      ).catch((error) => res.status(500).send(`Failed request: ${error}`)
      );
    }
  });
};
