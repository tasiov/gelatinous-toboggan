// import utils from './utils.js'; // our custom middleware
import controller from '../db/controllers/index';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { writeVideoToDiskPipeline, getQuiltFromId } from './utils';
import Authentication from '../db/controllers/authentication';
import passportService from '../db/services/passport';
import passport from 'passport';
import phone from 'phone';
import async from 'async';

const requireAuth = passport.authenticate('jwt', { session: false });

export default (app) => {
  // login
  // 1) check if user exists
    // if yes, verify password
      // if correct, res.status(200).send('logged in!')
      // if incorrect, res.status().send('incorrect password')
    // if no, res.status().send('User does not exist')
  app.get('/api/auth', (req, res) => {
    controller.verifyUser(req.query.usernameOrEmail, req.query.password)
      .then(user => {
        if (user) {
          res.status(200)
            .send({
              id: user.get('id'),
              username: user.get('username'),
              token: Authentication.tokenForUser(user.get('email'))
            })
        } else {
          res.status(400).send('Invalid Login')
        }
      })
      .catch(error => res.status(500).send(`Failed verify user request: ${error}`));
  });

  // signup
  app.post('/api/auth', (req, res) => {
    controller.createUser(req.query.email, req.query.password)
      .then(user => {
        if (user) {
          res.status(201).send({
            id: user.get('id'),
            email: user.get('email'),
            token: Authentication.tokenForUser(user.get('email'))
          });
        } else {
          res.status(406).send('Email already exists');
        }
      })
      .catch(error => res.status(500).send(`Failed signup request: ${error}`));
  });

  app.put('/api/auth', requireAuth, (req, res) => {
    let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
      controller.getUser(JSON.parse(body))
      .then((user) => {
        if(user){
          res.status(409).send('username already exists');
        } else {
          controller.updateUser(req.query.userId, JSON.parse(body))
          .then(() => res.status(204).send('Successfully updated'))
          .catch(error => res.status(500).send(`Failed to update user: ${error}`));
        }
      }).catch(error => res.status(500).send(`Failed update user request: ${error}`));
    })
  });

  app.get('/api/quilt', requireAuth, (req, res) => {
    // if request query object is empty, send 404
    if (_.isEmpty(req.query)) {
      res.status(400).send('Failed to retrieve query string');
    } else {
      controller.getAllUserQuilts(req.query.username)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(500).send(`Failed get quilt request: ${error}`));
    }
  });

  app.post('/api/quilt', requireAuth, (req, res) => {
    const data = JSON.parse(req.headers['meta-data']);
    writeVideoToDiskPipeline(req, res, data, true);
  });

  // TODO: add required auth
  // TODO: clean up and optimize
  app.post('/api/cross', requireAuth, (req, res) => {
    const userId = req.query.userId;
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    }).on('end', () => {
      data = JSON.parse(data);
      async.map(data, (contact, callback) => {
        controller.crossReference(contact.emails, contact.phoneNumbers)
          .then(id => callback(null, Object.assign(contact, { id })));
      }, (error, results) => {
        if(error) {
          res.status(500).send(`Failed post cross reference request: ${error}`);
        } else {
          res.status(201).send(results.filter(contact => contact.id !== null && contact.id !== userId));
        }
      });
    })
  });

  // note: due to limitations of react-native-video, this route
  // expects the authentication token in the querystring
  app.get('/api/quilt/:id', requireAuth, (req, res) => {
    res.sendFile(getQuiltFromId(req.params.id));
  });

  app.post('/api/quilt/:id', requireAuth, (req, res) => {
    const data = JSON.parse(req.headers['meta-data']);
    data.quiltId = req.params.id;
    writeVideoToDiskPipeline(req, res, data, false);
  });

  app.get('/api/friends/:id', requireAuth, (req, res) => {
    if (_.isEmpty(req.params.id)) {
      res.status(400).send('Failed to retrieve user');
    } else {
      controller.getAllOtherUsers(req.params.id)
      .then(data =>  res.status(200).send(data))
      .catch(error => res.status(500).send(`Failed get friends request: ${error}`))
    }
  });

  app.post('/api/friends/:id', (req, res) => {
    const userId = req.params.id;
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    }).on('end', () => {
      const friends = JSON.parse(data).friends;
      controller.addFriends(userId, friends)
        .then(() => res.sendStatus(201))
        .catch(error => res.status(500).send(`Failed add friends request: ${error}`))
    })
  });

  app.get('/api/user/:username', (req, res) => {
    if (_.isEmpty(req.params.username)) {
      res.status(400).send('Failed to retrieve user');
    } else {
      controller.getUser(req.params)
      .then((data) => res.status(200).send(data || {}))
      .catch((error) => res.status(500).send(`Failed get user request: ${error}`));
    }
  });

  app.get('/api/notifications/:id', (req, res) => {
    if (_.isEmpty(req.params.id)) {
      res.status(400).send('Failed to retrieve user');
    } else {
      controller.getUsersNotifs(req.params.id)
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((error) => res.status(500).send(`Failed request: ${error}`));
    }
  });
};
