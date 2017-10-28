var fortune = require('./lib/fortune.js');
var express = require('express');
var app = express();

// 핸들바 뷰 엔진 설정
var handlebars = require('express-handlebars').create({ 
	defaultLayout: 'main',
	helpers: {
		section: function(name, options) {
			if (!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');

var credentials = require('./credentials');

var emailService = require('./lib/email.js')(credentials);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	resave: false,
	saveUninitialized: false,
	secret: credentials.cookieSecret
}));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

function getWeatherData() {
	return {
		locations: [
      {
        name: 'Portland',
        forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather: 'Overcast',
        temp: '54.1 F (12.3 C)',
      },
      {
        name: 'Bend',
        forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: 'Partly Cloudy',
        temp: '55.0 F (12.8 C)',
      },
      {
        name: 'Manzanita',
        forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
        weather: 'Light Rain',
        temp: '55.0 F (12.8 C)',
      },
    ],
	}
};

app.use(function(req, res, next) {
	if (!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherContext = getWeatherData();
	next();
})

app.use('/upload', function(req, res, next) {
	var now = Date.now();
	jqupload.fileHandler({
		uploadDir: function() {
			return __dirname + '/public/uploads/' + now;
		},
		uploadUrl: function() {
			return '/uploads/' + now;
		},
	})(req, res, next);
});

app.use(require('body-parser').urlencoded({ extended: true }));

app.use(function(req, res, next) {
	// 플래시 메시지가 있다면 콘텍스트에 전달한 다음 지웁니다.
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

var cartValidation = require('./lib/cartValidation.js')

app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);

app.get('/newsletter', function(req, res) {
	res.render('newsletter', { csrf: 'CSRF token goes here' });
});

function NewsletterSignup(){
}
NewsletterSignup.prototype.save = function(cb){
	cb();
};

var VALID_EMAIL_REGEX = new RegExp(
	'^[a-zA-Z0-9.!#$%&\'*+\/=?_^{|}~-]+@' +
	'[a-zA-Z0-9](?:[a-zA-Z0-9]{0,61}[a-zA-Z0-9])?' +
	'(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$'
);

app.post('/newsletter', function(req, res) {
	var name = req.body.name || '', email = req.body.email || '';
	// 입력 유효성 검사
	if (!email.match(VALID_EMAIL_REGEX)) {
		if (req.xhr) return res.json({ error: 'Invalid name email address.' });
		req.session.flash = {
			type: 'danger',
			intro: 'Validation error!',
			message: 'The email address you entered was not valid.',
		};
		return res.redirect(303, '/newsletter/archive');
	}

	// NewsletterSignup은 독자 여러분이 만들게 될 객체 예제입니다.
	// 프로젝트에 따라 정확한 구현 내용이나 인터페이스는 모두 달라질 테고 그건 여러분의 몫입니다.
	// 일반적인 익스프레스 프로그램이 어떤 모양인지 참고만 하십시오.
	new NewsletterSignup({name: name, email: email}).save(function(err) {
		if(err) {
			if(req.xhr) return res.json({ error: 'Database error.' });
			req.session.flash = {
				type: 'danger',
				intro: 'Database error!',
				message: 'There was a database error; please try again later.',
			};
			return res.redirect(303, '/newsletter/archive');
		}
		if(req.xhr) return res.json({ success: true });
		req.session.flash = {
			type: 'success',
			intro: 'Thank you!',
			message: 'You have now been signed up for the newsletter.',
		};
		return res.redirect(303, '/newsletter/archive');
	});
});

app.get('/newsletter/archive', function(req, res){
	res.render('newsletter/archive');
});

app.post('/process', function(req, res) {
	if (req.xhr || req.accepts('json, html') === 'json') {
		res.send({ success: true });
		// 에러가 있다면 { error: 'error desription '} 을 보냅니다.
	} else {
		res.redirect(303, '/thank-you');
		// 에러가 있다면 에러 페이지로 리다이렉트 합니다.
	}
});

app.get('/cart/checkout', function(req, res, next) {
	var cart = req.session.cart || (req.session.cart = { items: [] });
	if (!cart) next();
	res.render('cart-checkout');
});

app.post('/cart/checkout', function(req, res, next) {
	var cart = req.session.cart || (req.session.cart = { items: [] });
	if (!cart) next(new Error('Cart does not exist'));
	var name = req.body.name || '', email = req.body.email || '';
	// 유효성 검사
	if (!email.match(VALID_EMAIL_REGEX))
		return nes.next(new Error('Invalid email address.'));
	// 랜덤한 장바구니 ID를 부여합니다. 실무라면 데이터베이스 ID를 썼을 겁니다.
	cart.number = Math.random().toString().replace(/^0\.0*/, '');
	cart.billing = {
		name: name,
		email: email,
	};
	res.render('email/cart-thank-you', {layout: null, cart: cart}, function(err, html) {
		if (err) console.log('error in email template');
		emailService.send('neverlish@gmail.com', 'Hood River tours on sale today!', 'Get \'em while they\'re hot!');
	});
	res.render('cart-thank-you', {cart: cart});
});

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/thank-you', function(req, res){
	res.render('thank-you');
});

app.get('/about', function(req, res) {
	res.render('about', {
		fortune: fortune.getFortune(), 
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

app.get('/jquery-test', function(req, res){
	res.render('jquery-test');
});

app.get('/nursery-rhyme', function(req, res){
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

app.get('/contest/vacation-photo', function(req, res) {
	var now = new Date();
	res.render('contest/vacation-photo', {
		year: now.getFullYear(), month: now.getMonth()
	});
});

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
	console.log('POST!!!!')
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files');
		console.log(files);
		res.redirect(303, '/thank-you');
	});
});

app.get('/headers', function(req, res) {
	res.set('Content-Type', 'text/plain');
	var s = '';
	for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

// 404 폴백 핸들러 (미들웨어)
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

// 500 에러 핸들러 (미들웨어)
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() { 
	console.log('Express started in ' + app.get('env') + ' mode on http://localhost:' + app.get('port') + '; press Ctrl + C to terminate');
});
