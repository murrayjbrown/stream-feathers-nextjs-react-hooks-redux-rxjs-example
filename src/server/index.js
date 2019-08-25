// Next.js app server
/* eslint-disable global-require */
const dev = process.env.NODE_ENV !== 'production';
const nextApp = require('next')({ dev });
const logger = require('./logger');

const handleNextRequest = nextApp.getRequestHandler();
nextApp.prepare().then(() => {
	// Set up Feathers/Express app
	const express = require('@feathersjs/express');
	const app = require('./app');

	//
	// Route specific request paths to Next.js
	//
	app.use('/', (req, res) => handleNextRequest(req, res));
	app.get('/posts/', (req, res) => {
		return nextApp.render(req, res, '/posts');
	});
	app.get('/posts/:id', (req, res) => {
		return nextApp.render(req, res, '/posts', { id: req.params.id });
	});

	//
	// Default: Route requests to Next.js
	//
	app.get('*', (req, res) => {
		return handleNextRequest(req, res);
	});
	app.get('/public/:asset', req => {
		return app.render('/public', req.params.asset);
	});

	//
	// Configure a middleware for 404s and the error handler
	//
	app.use(express.notFound());
	app.use(express.errorHandler({ logger }));

	// Configure app hooks
	const appHooks = require('./app.hooks');
	app.hooks(appHooks);

	// publish global service events
	app.service('ticks').publish('created', data => {
		return app.channel('everyone').send(data);
	});
	app.service('colors').publish('created', data => {
		return app.channel('everyone').send(data);
	});

	//
	// Listen on port
	//
	const port = app.get('port');
	const server = app.listen(port);
	process.on('unhandledRejection', (reason, p) =>
		logger.error('Unhandled Rejection at: Promise ', p, '; reason: ', reason),
	);
	server.on('listening', () =>
		logger.info(
			'Feathers application started on http://%s:%d',
			app.get('host'),
			port,
		),
	);
});
