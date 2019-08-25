// @flow
const colors = require('./colors/colors.service.js');
const messages = require('./messages/messages.service.js');
const ticks = require('./ticks/ticks.service.js');
const users = require('./users/users.service.js');

// eslint-disable-next-line fp/no-nil
module.exports = function services(app: any) {
	app.configure(colors);
	app.configure(messages);
	app.configure(ticks);
	app.configure(users);
};
