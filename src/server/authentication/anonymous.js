const Strategy = require('passport-custom');

module.exports = opts => {
	return function anonAuthenticationSetup() {
		const verifier = async (req, done) => {
			// create a new user in the user service
			// mark this user with a specific anonymous=true attribute
			const user = await this.service(opts.userService).create({
				anonymous: true,
			});

			// authenticate the request with this user
			return done(null, user, {
				userId: user.id,
			});
		};

		// register the strategy in the app.passport instance
		this.passport.use('anonymous', new Strategy(verifier));
	};
};
