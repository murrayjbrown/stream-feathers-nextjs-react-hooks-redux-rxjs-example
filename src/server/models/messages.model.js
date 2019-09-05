const NeDB = require('nedb');
const path = require('path');

module.exports = function messagesModel(app) {
	const dbPath = app.get('nedb');
	const Model = new NeDB({
		filename: path.join(dbPath, 'messages.db'),
		autoload: true,
	});

	return Model;
};
