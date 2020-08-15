require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./routes/admin');
var subjectRouter = require('./routes/subjects');
var studentRouter = require('./routes/students');
var pedagogyRouter = require('./routes/pedagogy');
var evaluateRouter = require('./routes/evaluate');

const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;
const connect = mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology:true });

connect.then((db) => {
  console.log('Connected!');

}, (err) => {
  console.log(err);
});

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/subjects', subjectRouter);
app.use('/student', studentRouter);
app.use('/pedagogy', pedagogyRouter);
app.use('/evaluate', evaluateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;