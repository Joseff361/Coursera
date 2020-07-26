var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

const mongoose = require('mongoose')
const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)

connect.then((cb) => {
  console.log("Connected correctly to server")
})
.catch((err) => console.log(err))



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Lo colocamos antes de que se pueda acceder a cualquier recurso
//Opcionalmente podemos firmar una cookie, la cual se almacena en req.secret
app.use(cookieParser('JoseffAuth'))
//La firma encripta el header
//La firma no puede ser alfanumerica: solo numeros o solo letas

function auth (req, res, next) {

  if (!req.signedCookies.user) { //Si no existe la cookie
    var authHeader = req.headers.authorization 
    if (!authHeader) { //Si el usuario no esta autorizado(no se le ha asignado el header 'authorization')
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        return next(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        res.cookie('user','admin',{signed: true}) //Creacion de la cookie, con firma
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }
  else { //Si tiene la cookie como header...
      if (req.signedCookies.user === 'admin') {
          console.log(req.secret)
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
      }
  }
}



app.use(auth)

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

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
