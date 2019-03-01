import express from 'express';
import bodyParser from 'body-parser';

import blogs from '../controllers/blogs';

const routes = express.Router();

routes.get('/', blogs.list);
routes.get('/:id', blogs.getById, blogs.returnBlog);

module.exports = routes;
