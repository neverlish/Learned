var main = require('./handlers/main.js'),
    contest = require('./handlers/contest.js'),
    vacation = require('./handlers/vacation.js'),
    cart = require('./handlers/cart.js'),
    cartValidation = require('./lib/cartValidation.js');
    contact = require('./handlers/contact.js'),
    samples = require('./handlers/sample.js');

module.exports = function(app) {

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

  var cartValidation = require('./lib/cartValidation.js')
  
  app.use(cartValidation.checkWaivers);
  app.use(cartValidation.checkGuestCounts);  

  app.get('/cart/checkout', function(req, res, next) {
    var cart = req.session.cart || (req.session.cart = { items: [] });
    if (!cart) next();
    res.render('cart-checkout');
  });

  var credentials = require('./credentials');
  var emailService = require('./lib/email.js')(credentials);
  var formidable = require('formidable');

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
  
  var fortune = require('./lib/fortune.js');

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

  app.get('/contest/vacation-photo', function(req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
      year: now.getFullYear(), month: now.getMonth()
    });
  });


  function saveContestEntry(contestName, email, year, month, photoPath) {
    // TODO
  }

  app.post('/contest/vacation-photo/:year/:month', function(req, res) {
    console.log('POST!!!!')
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if (err) {
        res.session.flash = {
          type: 'danger',
          intro: 'Oops!',
          message: 'There was an error processing your submission. Please try again.',
        };
        return res.redirect(303, '/contest/vacation-photo');
      }
      var photo = files.photo;
      var dir = vacationPhotoDir + '/' + Date.now();
      var path = dir + '/' + photo.name;
      fs.mkdirSync(dir);
      fs.renameSync(photo.path, dir + '/' + photo.name);
      saveContestEntry('vacation-photo', fields.email, req.params.year, req.params.month, path);
      req.session.flash = {
        type: 'success',
        intro: 'Good luck!',
        message: 'You have been entered into the contest.',
      };
      return res.redirect(303, '/contest/vacation-photo/entries');
    });
  });


  app.get('/contest/vacation-photo/entries', function(req, res){
    res.render('contest/vacation-photo/entries');
  });

  app.get('/set-currency/:currency', function(req, res) {
    req.session.currency = req.params.currency;
    return res.redirect(303, '/vacations');
  });

  function convertFromUSD(value, currency) {
    switch (currency) {
      case 'USD': return value * 1;
      case 'GBP': return value * 0.6;
      case 'BTC': return value * 0.0023707918444761;
      default: return NaN;
    }
  }

  var Vacation = require('./models/vacation.js');

  app.get('/vacations', function(req, res) {
    Vacation.find({available: true}, function(err, vacations) {
      var currency = req.session.currency || 'USD';
      var context = {
        vacations: vacations.map(function(vacation) {
          return {
            sku: vacation.sku,
            name: vacation.name,
            description: vacation.description,
            price: convertFromUSD(vacation.priceInCents/100, currency),
            inSeason: vacation.inSeason,
            qty: vacation.qty,
          }
        })
      };
      switch (currency) {
        case 'USD': context.currencyUSD = 'selected'; break;
        case 'GBP': context.currencyGBP = 'selected'; break;
        case 'BTC': context.currencyBTC = 'selected'; break;
      }
      res.render('vacations', context);
    });
  });

  var VacationInSeasonListener = require('./models/vacationInSeasonListener.js');

  app.get('/notify-me-when-in-season', function(req, res) {
    res.render('notify-me-when-in-season', {sku: req.query.sku})
  });

  app.post('/notify-me-when-in-season', function(req, res) {
    VacationInSeasonListener.update(
      {email: req.body.email},
      {$push: {skus: req.body.sku}},
      {upsert: true},
      function(err) {
        if (err) {
          console.error(err.stack);
          req.session.flash = {
            type: 'danger',
            intro: 'Ooops!',
            message: 'There was an error processing your request.',
          };
          return res.redirect(303, '/vacations');
        }
        req.session.flash = {
          type: 'success',
          intro: 'Thank you!',
          message: 'You will be notified when this vacation is in season.',
        };
        return res.redirect(303, '/vacations');
      }
    )
  })

  app.get('/headers', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
  });

  app.get('/epic-fail', function(req, res){
    process.nextTick(function(){
        throw new Error('Kaboom!');
    });
  });
}
