const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index');
const dbindexitems = require('./routes/dbindexitems');
const proteins = require('./routes/proteins');
const species = require('./routes/species');
const genomes = require('./routes/genomes');
const systemicEffects = require('./routes/systemicEffects');

const app = express();

const VENOMKB_STAGING_PW = process.env.VENOMKB_STAGING_PW;
const MONGO_IP = process.env.MONGO_IP;
console.log('VENOMKB_STAGING_PW: ', VENOMKB_STAGING_PW);
console.log('MONGO_IP: ', MONGO_IP);

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://venomkb-admin:' + VENOMKB_STAGING_PW + '@' + MONGO_IP + '/venomkb-staging')
  .then(() =>  console.log('connection to MongoDB succesful'))
  .catch((err) => console.error(err));


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', routes);
app.use('/dbindexitems', dbindexitems);
app.use('/proteins', proteins);
app.use('/species', species);
app.use('/genomes', genomes);
app.use('/systemic-effects', systemicEffects);

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
