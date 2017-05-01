var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passport');
var app = express();

// DB Setting
mongoose.connect(process.env.MLAB);
var db = mongoose.connection;
db.once('open', function() {
  console.log('DB connected');
});
db.on('error', function(err) {
  console.log('DB Error : ' + err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret: 'MySecret', resave: true, saveUninitialized: true}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// custom  middlewares
app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
})

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

app.listen(3000, function() {
  console.log('server on!');
});
