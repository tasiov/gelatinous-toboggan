// import utils from './utils.js'; // our custom middleware
import controller from '../db/controllers/index';
import _ from 'lodash';
import base64 from 'base64-stream';
import fs from 'fs';

const util = require('util');
setInterval(() => {
  console.log(util.inspect(process.memoryUsage()));
}, 1000)



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
    const title = JSON.parse(req.headers['meta-data']).title;
    const writeStream = fs.createWriteStream(`./${title}.MOV`);
    req.pipe(base64.decode()).pipe(writeStream);
    return;

    if (_.isEmpty(req.body)) {
      res.status(400).send('Failed to retrieve video data');
    } else {
      /*
      req.body = {
        title: '',
        theme: '',
        users: [],
        video: base64,
    }
      */
      controller.postQuilt(req.body)
        .then((data) => res.status(200).send("Received video"))
        .catch((error) => res.status(500).send(`Failed submission: ${error}`));
    }
  });

  app.get('/api/quilt/:id', (req, res) => {
    console.log('server: /api/quilt/:id ', req.params.id);
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
