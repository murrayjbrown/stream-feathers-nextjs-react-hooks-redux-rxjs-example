const config = require('config');
const winston = require('winston');

const logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			level: config.get('logLevel.file') ?? 'info',
			filename: './logs/all.log',
			format: winston.format.combine(
				winston.format.splat(),
				winston.format.simple(),
			),
			handleExceptions: true,
			json: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			colorize: false,
		}),
		new winston.transports.Console({
			level: config.get('logLevel.console') ?? 'info',
			format: winston.format.combine(
				winston.format.splat(),
				winston.format.simple(),
			),
			handleExceptions: true,
			json: false,
			colorize: true,
		}),
	],
	exitOnError: false,
});

module.exports = logger;
