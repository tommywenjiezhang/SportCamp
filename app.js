var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose   = require('mongoose')
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;
var
    Sport = require("./models/sports"),
    Comment     = require("./models/comment"),
    User        = require("./models/users");
var flash = require('connect-flash');
// user temp database testing


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sportsRouter= require('./routes/sports');
var commentRouter = require('./routes/comment');
var replyRouter = require('./routes/reply');

var app = express();

// mangodb url
const url = 'mongodb://localhost:27017/sportCampDB';
mongoose.connect(url)
app.use(flash());

app.use(session({ secret: 'passport-tutorial',resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("success")
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css/')))
app.use('/bootstrap/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js/')))
app.use('/bootstrap/util',express.static(path.join(__dirname,'node_modules/bootstrap/js/dist')))
app.use('/jquery',express.static(path.join(__dirname,'node_modules/jquery/dist/')))
app.use('/popper',express.static(path.join(__dirname,'node_modules/@popperjs/core/dist/umd')))


// passport
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sports',sportsRouter)
app.use("/sports/:id/comments", commentRouter);
app.use("/sports/:id/comments/:comment_id/replies",replyRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, process.env.IP, function(){
   console.log("The SportCamp Server Has Started!"+ process.env.PORT);
});
module.exports = app;
