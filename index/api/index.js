const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index');
const venoms = require('./routes/venoms');
const proteins = require('./routes/proteins');

const app = express();

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://venomkb-admin:RambXyx6@54.221.23.226/venomkb-staging')
  .then(() =>  console.log('connection to MongoDB succesful'))
  .catch((err) => console.error(err));


// Test to see if we can connect and get Venoms
// const VenomSchema = new mongoose.Schema({
//   _id: String,
//   venomkb_id: String,
//   species: String
// });

// // the schema is useless so far
// // we need to create a model using it
// var Venom = mongoose.model('Venom', VenomSchema, 'venoms');

// // get all the venoms
// Venom.find({}, function(err, venoms) {
//   if (err) throw err;
//   // object of all the users
//   console.log('find all venoms');
//   console.log(venoms);
// });


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', routes);
app.use('/venoms', venoms);
app.use('/proteins', proteins);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
