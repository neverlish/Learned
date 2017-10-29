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
		},
		google: {
			development: {
				clientID: process.env.GOOGLE_DEV_CLIENT_ID,
				clientSecret: process.env.GOOGLE_DEV_CLIENT_SECRET_CODE,
			}
		}
	}
};
