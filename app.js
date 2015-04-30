var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multipart = require('connect-multiparty');
var User = require('./models/user.js');
var authRequired = require('./utils/auth-required.js');
var passport = require('passport');
var mongoose = require('mongoose');
var hbs = require('hbs');
var config = require('./config');

// mongoose setup
mongoose.connect(config.mongodb);

// passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app setup
var app = express();
app.set('env', config.env);
app.set('port', config.port);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
require('./utils/hbs-helper')(hbs);

// routes
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multipart({uploadDir: __dirname + '/public/uploads'}));
app.use(cookieParser());

if(app.get('env') === 'development'){
    var RedisStore = require('connect-redis')(session);
    app.use(session({secret: 'hello! TMY', resave: true, saveUninitialized: true, store: new RedisStore()}));
}
else{
    app.use(session({secret: 'hello! TMY', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));
}


app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./utils/locals'));

app.use('/', require('./routes/home'));
app.use('/account', require('./routes/account'));
app.use('/admin', authRequired, require('./routes/admin'));

app.use(notFoundCatcher);
app.use(app.get('env') === 'development' ? devErrorHandler : prodErrorHandler);

// run!
app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});

process.on('uncaughtException', function(err) {
    console.error((new Date()).toUTCString() + ' uncaughtException found:',
        err.stack || 'no stack info', 'exiting...');
    process.exit(1);
});

// error handlers
function notFoundCatcher(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function devErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        error: err.message || err || 'unkown error',
        stack: err.stack || 'no stack info'
    });
    // print stacktrace
    console.log(err.message);
    console.log(err.stack);
}

function prodErrorHandler(err, req, res, next) {
    res.status(err.status || 500);

    // no stacktrace
    res.render('error', {
        error: err.message || err || 'unkown error'
    });
}

module.exports = app;
