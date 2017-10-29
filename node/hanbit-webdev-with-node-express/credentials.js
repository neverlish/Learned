module.exports = {
	cookieSecret: 'your cookie secret goes here',
	gmail: {
		user: process.env.GOOGLE_USER,
		password: process.env.GOOGLE_PASSWORD,
	},
	mongo: {
		development: {
			connectionString: process.env.MLAB
		},
		production: {
			connectionString: process.env.MLAB
		}
	},
	authProviders: {
		facebook: {
			development: {
				appId: process.env.FB_DEV_APP_ID,
				appSecret: process.env.FB_DEV_APP_SECRET_CODE,
			}
		}
	}
};
