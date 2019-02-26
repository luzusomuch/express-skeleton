import express from 'express';
import bodyParser from 'body-parser';

import auth from '../controllers/auth';
import users from '../controllers/users';

const routes = express.Router();

routes.post('/login', 
  auth.login);

routes.post('/register', 
  users.create);

module.exports = routes;
