var http = require('http');
var https = require('https');
var express = require('express');
var fs = require('fs');
var app = express();
var Q = require('q');

// 핸들바 뷰 엔진 설정
var handlebars = require('express-handlebars').create({ 
	defaultLayout: 'main',
	helpers: {
		section: function(name, options) {
			if (!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		},
		static: function(name)	 {
			return require('./lib/static.js').map(name);
		}
	}
});

var config = require('./config.js');

var credentials = require('./credentials');

var twitter = require('./lib/twitter')({
	consumerKey: credentials.twitter.consumerKey,
	consumerSecret: credentials.twitter.consumerSecret,
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

switch(app.get('env')) {
	case 'development':
		app.use(require('morgan')('dev'));
		break;
	case 'production':
		app.use(require('express-logger')({
			path: __dirname + '/log/requests.log'
		}));
		break;
}

var static = require('./lib/static.js').map;

app.use(function(req, res, next) {
	var now = new Date();
	res.locals.logoImage = now.getMonth == 11 && now.getDate() == 19 ?
		static('/img/logo_bud_clack.png') :
		static('/img/logo.png');
	next();
});

app.use(function(req, res, next) {
	// 이 요청을 처리할 도메인 생성
	var domain = require('domain').create();
	// 도메인에서 일어난 에러 처리
	domain.on('error', function(err) {
		console.error('DOMAIN ERROR CAUGHT\n', err.stack);
		try {
			// 5초 후에 안전한 셧다운
			setTimeout(function() {
				console.error('Failsafe shutdown');
				process.exit(1);
			}, 5000);

			// 클러스터 연결 해제
			var worker = require('cluster').worker;
			if (worker) worker.disconnect();

			// 요청을 받는 것을 중지
			server.close();
			try {
				// 익스프레스의 에러 라우트 시도
				next(err);
			} catch (err) {
				// 익스프레스의 에러 라우트가 실패하면
				// 일반 노드 응답 사용
				console.error('Express error mechanism failed.\n', err.stack);
				res.statusCode = 500;
				res.setHeader('content-type', 'text/plain');
				res.end('Server error.');
			}
		} catch(err) {
			console.error('Unable to send 500 response.\n', err.stack);
		}
	});

	// 도메인에 요청과 응답 객체 추가
	domain.add(req);
	domain.add(res);

	// 나머지 요청 체인을 도메인에서 처리
	domain.run(next);
});

var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({url: credentials.mongo[app.get('env')].connectionString});

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	resave: false,
	saveUninitialized: false,
	secret: credentials.cookieSecret,
	store: sessionStore
}));

app.use(require('csurf')());
app.use(function(req, res, next) {
	res.locals._csrfToken = req.csrfToken();
	next();
});

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
	};
}

app.use(function(req, res, next) {
	if (!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherContext = getWeatherData();
	next();
});


var topTweets = {
	count: 10,
	lastRefreshed: 0,
	refreshInterval: 15 * 60 * 1000,
	tweets: []
};

function getTopTweets(cb) {
	if (Date.now() < topTweets.lastRefreshed + topTweets.refreshInterval)
		return cb(topTweets.tweets);
	
	twitter.search('#meadowlarktravel', topTweets.count, function(result) {
		var formattedTweets = [];
		var promises = [];
		var embedOpts = { omit_script: 1 };
		result.statuses.forEach(function(status) {
			var deferred = Q.defer();
			twitter.embed(status.id_str, embedOpts, function(embed) {
				formattedTweets.push(embed.html);
				deferred.resolve();
			});
			promises.push(deferred.promise);
		});
		Q.all(promises).then(function() {
			topTweets.lastRefreshed = Date.now();
			cb(topTweets.tweets = formattedTweets);
		});
	})
}

app.use(function(req, res, next) {
	getTopTweets(function(tweets) {
		res.locals.topTweets = tweets;
		next();
	});
});


var vhost = require('vhost');
// admin 서브도메인을 만듭니다. 이 코드는 다른 라우트보다 앞에 있어야 합니다.
var admin = express.Router();
app.use(vhost('admin.*', admin));

// admin 라우트를 만듭니다. 이 코드의 위치는 상관없습니다.
admin.get('/', function(req, res) {
	res.render('admin/home');
});

admin.get('/users', function(req, res) {
	res.render('admin/users');
});

app.use(function(req, res, next) {
	var cluster = require('cluster');
	if (cluster.isWorker) console.log('Worker %d received request', cluster.worker.id);
	next();
});

var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions: { keepAlive: 1}
	}
};

switch(app.get('env')) {
	case 'development':
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectionString, opts);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

var Vacation = require('./models/vacation.js');

Vacation.find(function(err, vacations) {
	if (vacations.length) return;

	new Vacation({
		name: 'Hood River Day Trip',
		slug: 'hood-river-day-trip',
		category: 'Day Trip',
		sku: 'HR199',
		description: 'Spend a day sailing on the Columbia and enjoying craft beers in Hood River!',
		priceInCents: 9995,
		tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
		inSeason: true,
		maximumGuests: 16,
		available: true,
		packagesSold: 0,
	}).save();

	new Vacation({
		name: 'Oregon Coast Getaway',
		slug: 'oregon-coast-getaway',
		category: 'Weekend Getaway',
		sku: 'OC39',
		description: 'Enjoy the ocean air and quaint coastal towns!',
		priceInCents: 269995,
		tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
		inSeason: false,
		maximumGuests: 8,
		available: true,
		packagesSold: 0,
	}).save();

	new Vacation({
		name: 'Rock Climbing in Bend',
		slug: 'rock-climbing-in-bend',
		category: 'Adventure',
		sku: 'B99',
		description: 'Experience the thrill of climbing in the hight desert',
		priceInCents: 289995,
		tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
		inSeason: true,
		requiresWaiver: true,
		maximumGuests: 4,
		available: false,
		packagesSold: 0,
		notes: 'The tour guide is currently recovering from a skiiing accident',
	}).save();
});

var Dealer = require('./models/dealer.js');

Dealer.find({}, function(err, dealers) {
	if (dealers.length) return;

	new Dealer({
		name: 'Oregon Novelties',
		address1: '912 NW Davis St',
		city: 'Portland',
		state: 'OR',
		zip: '97209',
		country: 'US',
		phone: '503-555-1212',
		active: true,
	}).save();

	new Dealer({
		name: 'Bruce\'s Bric-a-Brac',
		address1: '159 Beeswax Ln',
		city: 'Manzanita',
		state: 'OR',
		zip: '97209',
		country: 'US',
		phone: '503-555-1212',
		active: true,
	}).save();

	new Dealer({
		name: 'Aunt Beru\'s Oregon Souveniers',
		address1: '544 NE Emerson Ave',
		city: 'Bend',
		state: 'OR',
		zip: '97701',
		country: 'US',
		phone: '503-555-1212',
		active: true,
	}).save();

	new Dealer({
		name: 'Oregon Goodies',
		address1: '1353 NW Beca Ave',
		city: 'Corvallis',
		state: 'OR',
		zip: '97330',
		country: 'US',
		phone: '503-555-1212',
		active: true,
	}).save();

	new Dealer({
		name: 'Oregon Grab-n-Fly',
		address1: '7000 NE Airport Way',
		city: 'Portland',
		state: 'OR',
		zip: '97219',
		country: 'US',
		phone: '503-555-1212',
		active: true,
	}).save();
});

var dealerCache = {
	lastRefreshed: 0,
	refreshInterval: 60 * 60 * 1000,
	jsonUrl: '/dealers.json',
	geocodeLimit: 2000,
	geocodeCount: 0,
	geocodeBegin: 0,
}

dealerCache.jsonFile = __dirname + '/public' + dealerCache.jsonUrl;

function geocodeDealer(dealer) {
	var addr = dealer.getAddress(' ');
	if (addr === dealer.geocodedAddress) return;

	if (dealerCache.geocodeCount >= dealerCache.geocodeLimit) {
		// 마지막으로 지오코딩한 지 24시간이 지났는지?
		if (Date.now() > dealerCache.geocodeCount + 24 * 60 * 60 * 1000) {
			dealerCache.geocodeBegin = Date.now();
			dealerCache.geocodeCount = 0;
		} else {
			// 사용 제한을 초과했으므로 지금은 사용할 수 없음
			return;
		}
	}

	var geocode = require('./lib/geocode.js');
	geocode(addr, function(err, coords) {
		if (err) return console.log('Geocoding failure for ' + addr);
		dealer.lat = coords.lat;
		dealer.lng = coords.lng;
		dealer.save();
	});
}

function dealersToGoogleMaps(dealers){
	var js = 'function addMarkers(map){\n' +
		'var markers = [];\n' +
		'var Marker = google.maps.Marker;\n' +
		'var LatLng = google.maps.LatLng;\n';
	dealers.forEach(function(d){
		var name = d.name.replace(/'/, '\\\'').replace(/\\/, '\\\\');
		js += 'markers.push(new Marker({\n' +
					'\tposition: new LatLng(' +
					d.lat + ', ' + d.lng + '),\n' +
					'\tmap: map,\n' +
					'\ttitle: \'' + name.replace(/'/, '\\') + '\',\n' +
					'}));\n';
		});
	js += '}';
	return js;
}

dealerCache.refresh = function(cb) {
	if(Date.now() > dealerCache.lastRefreshed + dealerCache.refreshInterval){
		// 캐시를 업데이트 해야 합니다.
		Dealer.find({ active: true }, function(err, dealers){
			
			if(err) return console.log('Error fetching dealers: '+ err);
			
			// 좌표가 최신 상태라면 geocodeDealer는 아무 일도 하지 않습니다.
			dealers.forEach(geocodeDealer);

			// 판매자 정보를 모두 JSON 파일에 기록합니다.
			fs.writeFileSync(dealerCache.jsonFile, JSON.stringify(dealers));

			fs.writeFileSync(__dirname + '/public/js/dealers-googleMapMarkers.js', dealersToGoogleMaps(dealers));

			// 다 끝났으니 콜백을 실행합니다.
			cb();
		});
	}
}

function refreshDealerCacheForever(){
	dealerCache.refresh(function(){
		// 업데이트 주기가 끝나면 스스로를 호출
		setTimeout(refreshDealerCacheForever,dealerCache.refreshInterval);
	});
}

// 캐시가 없다면 빈 캐시를 만들어서 404 에러를 막습니다.
if(!fs.existsSync(dealerCache.jsonFile)) fs.writeFileSync(JSON.stringify([]));
// 캐시 업데이트 시작
refreshDealerCacheForever();

var getWeatherData = (function() {
	// 날씨 캐시
	var c = {
		refreshed: 0,
		refreshing: false,
		updateFrequency: 360000, // 한 시간
		locations: [
			{name: 'Portland'},
			{name: 'Bend'},
			{name: 'Manzanita'},
		]
	};

	return function() {
		if( !c.refreshing && Date.now() > c.refreshed + c.updateFrequency ){
			c.refreshing = true;
			var promises = c.locations.map(function(loc){
				return Q.Promise(function(resolve){
					var url = 'http://api.wunderground.com/api/' +
										credentials.WeatherUnderground.ApiKey +
										'/conditions/q/OR/' + loc.name + '.json';
					http.get(url, function(res){
						var body = '';
						res.on('data', function(chunk){
							body += chunk;
						});
						res.on('end', function(){
							body = JSON.parse(body);
							loc.forecastUrl = body.current_observation.forecast_url;
							loc.iconUrl = body.current_observation.icon_url;
							loc.weather = body.current_observation.weather;
							loc.temp = body.current_observation.temperature_string;
							resolve();
						});
					});
				});
			});
			Q.all(promises).then(function(){
				c.refreshing = false;
				c.refreshed = Date.now();
			});
		}
		return { locations: c.locations };
	}
})();

getWeatherData();

app.use(function(req, res, next) {
	// 플래시 메시지가 있다면 콘텍스트에 전달한 다음 지웁니다.
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

require('./routes.js')(app);

var Attraction = require('./models/attraction.js');

var rest = require('connect-rest');

rest.get('/attractions', function(req, content, cb) {
	Attraction.find({approved: true}, function(err, attractions) {
		if(err) return cb({ error: 'Internal error.' });
		cb(null, attractions.map(function(a) {
			return {
				name: a.name,
				id: a._id,
				description: a.description,
				location: a.location,
			};
		}));
	});
});

rest.post('/attraction', function(req, content, cb) {
	var a = new Attraction({
		name: req.body.name,
		description: req.body.description,
		location: {lat: req.body.lat, lng: req.body.lng},
		history: {
			event: 'created',
			email: req.body.email,
			date: new Date(),
		},
		approved: false,
	});
	a.save(function(er, a) {
		if(err) return cb({ error: 'Unable to add attraction.' });
		cb(null, { id: a._id });
	});
});

rest.get('/attraction/:id', function(req, content, cb) {
	Attraction.findById(req.params.id, function(err, a) {
		if(err) return cb({ error: 'Unable to retrieve attraction.' });
		cb(null, {
			name: a.name,
			id: a._id,
			description: a.description,
			location: a.location,
		});
	});
});

// API 설정
var apiOptions = {
	context: '/',
	domain: require('domain').create(),
};

apiOptions.domain.on('error', function(err) {
	console.log('API domain error.\n', err.stack);
	setTimeout(function() {
		console.log('Server shutting down after API domain error.');
		process.exit(1);
	}, 5000);
	server.close();
	var worker = require('cluster').worker;
	if (worker) worker.disconnect();
});

// API를 파이프라인에 연결합니다.
app.use(vhost('api.*', rest.rester(apiOptions)));

var auth = require('./lib/auth.js')(app, {
	// baseUrl은 옵션이며, 생략할 경우 기본 값은 localhost 입니다.
	// 로컬에서 작업하지 않을 때는 baseUrl이 유용한데 
	// 예를 들어 스테이징 서버가 있다면 BASE_URL 환경 변수를 
	// https://staging.meadowlark.com 으로 설정하면 됩니다.
	baseUrl: process.env.BASE_URL,
	providers: credentials.authProviders,
	successRedirect: '/account',
	failureRedirect: '/unauthorized',
});

// auth.init()는 패스포트 미들웨어를 연결합니다.
auth.init();

// 이제 인증 라우트를 사용할 수 있습니다.
auth.registerRoutes();

function customerOnly(req, res, next) {
	if(req.user && req.user.role === 'customer') return next();
	// 고객 전용 페이지를 만들어, 로그인해야함을 알리고 싶습니다.
	res.redirect(303, '/unauthorized');
}

function employeeOnly(req, res, next) {
	if(req.user && req.user.role === 'employee') return next();
	// 직원 전용 승인에 실패했다는 결과를 숨겨서, 잠재적 해커가 그런 페이지가 존재한다는 사실조차 모르게 하고 싶습니다.
	next('route');
}

function allow(roles) {
	return function(req, res, next) {
		if(req.user && roles.split(',').indexOf(req.user.role) !== -1)
			return next();
		res.redirect(303, '/unauthorized');
	}
}

app.get('/account', allow('customer,employee'), function(req, res) {
	res.render('account', { username: req.user.name });
});

app.get('/account/order-history', customerOnly, function(req, res) {
	res.render('account/order-history');
});

app.get('/account/email-prefs', customerOnly, function(req, res) {
	res.render('account/email-prefs');
});

// 직원용 라우트
app.get('/sales', employeeOnly, function(req, res) {
	res.render('sales');
});

// '인증되지 않음' 페이지도 필요합니다.
app.get('/unauthorized', function(req, res) {
	res.status(403).render('unauthorized');
});

var autoViews = {};
app.use(function(req, res, next) {
	var path = req.path.toLowerCase();
	// 캐시가 있으면 뷰를 렌더링합니다.
	if (autoViews[path]) return res.render(autoViews[path]);
	// 캐시가 없다면 일치하는 .handlebars 파일이 있는지 확인합니다.
	if (fs.existsSync(__dirname + '/views' + path + '.handlebars')) {
		autoViews[path] = path.replace(/^\//, '');
		return res.render(autoViews[path]);
	}
	// 뷰를 찾을 수 없으므로 404 핸들러에 넘깁니다.
	next();
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

var server;

function startServer() {
	var options = {
		key: fs.readFileSync(__dirname + '/ssl/meadowlark.pem'),
		cert: fs.readFileSync(__dirname + '/ssl/meadowlark.crt')
	};
	server = https.createServer(options, app).listen(app.get('port'), function() {
		console.log('Express started in ' + app.get('env') + ' mode on port' + app.get('port') + ' using HTTPS.');
	});
}

if (require.main === module) {
	// 애플리케이션은 앱 서버를 시동해 직접 실행됩니다.
	startServer();
} else {
	// require를 통해 애플리케이션을 모듈처럼 가져옵니다.
	// 함수를 반환해서 서버를 생성합니다.
	module.exports = startServer;
}
