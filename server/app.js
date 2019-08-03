const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
// const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());

// Load configuration & set up features
app.configure(configuration());
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up favicon & public paths
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
app.use('/public', express.static(app.get('public')));

// Configure plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure middleware
app.configure(middleware);
app.configure(authentication);
app.configure(services);
app.configure(channels);

module.exports = app;
