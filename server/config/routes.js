// import utils from './utils.js'; // our custom middleware
import controller from '../db/controllers/index';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { writeVideoToDiskPipeline, getQuiltFromId } from './utils';

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

  app.post('/api/quilt', (req, res) => {
    const data = JSON.parse(req.headers['meta-data']);
    writeVideoToDiskPipeline(req, res, data, true);
  });
  // todo: verify with db call
  app.get('/api/quilt/:id', (req, res) => {
<<<<<<< 4c53568833bf6c248b909ac8af7b8820b4f9d079
    console.log(getQuiltFromId(req.params.id));
    res.sendFile(getQuiltFromId(req.params.id));
=======
    controller.getQuilt({ id: req.params.id })
    .then((data) => {
      const responseObj = data || {};
      res.status(200).send(responseObj);
    }).catch((error) => res.status(500).send(`Failed request: ${error}`)
    );
>>>>>>> refactor video as a component
  });

  app.post('/api/quilt/:id', (req, res) => {
    const data = JSON.parse(req.headers['meta-data']);
    data.quiltId = req.params.id;
    writeVideoToDiskPipeline(req, res, data, false);
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
