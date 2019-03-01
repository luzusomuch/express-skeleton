import express from 'express';

import auth from './auth';
import users from './users';
import blog from './blog';
import response from '../helpers/response';

const routes  = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/authenticate', auth);
routes.use('/users', users);
routes.use('/blogs', blog);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use(function(req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
