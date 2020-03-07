const createError = require('http-errors');
const dotenv = require('dotenv')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose   = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const port = process.env.PORT || 5000;
// user temp database testing


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sportsRouter= require('./routes/sports');
const commentRouter = require('./routes/comment');
const replyRouter = require('./routes/reply');

const app = express();
dotenv.config();
// mangodb url
const url = 'mongodb://localhost:27017/sportCampDB';
mongoose.connect(url)
app.use(flash());
app.use(helmet());
app.use(session({ secret: 'passport-tutorial',resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');


const db = mongoose.connection;
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

app.listen(port, process.env.IP, function(){
   console.log("The SportCamp Server Has Started!"+ process.env.PORT);
});
module.exports = app;
