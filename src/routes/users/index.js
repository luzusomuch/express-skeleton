import express from 'express';

import users from '../../controllers/users';
import auth from '../../controllers/auth';
import items from './items';

const routes  = express.Router();

routes.get('/', auth.verifyToken, users.list);
routes.get('/me', auth.verifyToken, users.returnCurrentUser);
routes.get('/:id', auth.verifyToken, users.read);

routes.use('/:userId/items', users.loadUser, items);

routes.route('/:id')
  .all(auth.verifyToken)
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

routes.route('/')
  .get(auth.verifyToken, users.list)
  .post(users.create);

module.exports = routes;
