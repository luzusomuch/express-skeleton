import express from 'express';

import users from '../../controllers/users';
import auth from '../../controllers/auth';
import items from './items';

const routes  = express.Router();

routes.get('/', auth.verifyToken, users.list);
routes.get('/me', auth.verifyToken, users.returnCurrentUser);
routes.get('/:id', auth.verifyToken, users.getUserById, users.read);
routes.post('/', auth.verifyToken, auth.isAdmin, users.create);
routes.patch('/:id', auth.verifyToken, users.getUserById, users.update);
routes.delete('/:id', auth.verifyToken, auth.isAdmin, users.getUserById, users.delete);

module.exports = routes;
