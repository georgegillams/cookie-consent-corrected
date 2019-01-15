/* eslint consistent-return:0 */

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import SocketIo from 'socket.io';
import http from 'http';
import cookieParser from 'cookie-parser';
import logger from './util//logger';
import api from './api/api';

import argv from './util/argv';
import port from './util//port';
import setup from './middlewares/frontendMiddleware';
import { resolve } from 'path';

const app = express();
const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(
  session({
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', api);

// Add static projects (eg pecha kucha etc)
// app.use('/', express.static(__dirname + '/../public')); // ← adjust

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
