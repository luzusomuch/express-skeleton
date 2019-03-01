import express from 'express';
import bodyParser from 'body-parser';
import mongoose from'mongoose';
import morgan from 'morgan';
import jwt from'jsonwebtoken';
import http from 'http';
import socketIO from 'socket.io';

import User from './models/user';
import Item from './models/item';
import Token from './models/token';
import Blog from './models/blog';

import config from 'config';
import db from './db/db';
import routes from './routes';

import socket from './helpers/socket';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);

socket.configSocket(io);

const port = process.env.PORT || config.server.port;
server.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);

module.exports = app;
