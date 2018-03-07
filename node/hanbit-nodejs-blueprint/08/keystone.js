// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var swig = require('swig');

// Disable swig's bulit-in template caching, express handles it
swig.setDefaults({ cache: process.env.NODE_ENV === 'development' ? false : 'memory' });

keystone.init({

	'name': '08',
	'brand': '08',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/themes/newBlog/views',
	'emails': 'templates/themes/newBlog/emails',
	'view engine': 'swig',

	'custom engine': swig.renderFile,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'UserAdmin',

});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));



keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	userAdmins: 'user-admins',
});

keystone.start();
