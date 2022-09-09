var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
/*Requerimiento method reconocimiento de put y delete*/
const methodOverride = require("method-override")

const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware")

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var moviesRouter = require('./src/routes/movies');
//Var genresRouter = require('./src/routes/genres');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method")); /*metodo para el reconocimiento del put y delete*/



/* Session */ 
app.use(session({
  secret: "Sesión secreta",
  resave: false,
  saveUninitialized: false,
}));

app.use(userLoggedMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
//App.use('/genres', genresRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Servidor en funcionamiento
app.listen('3031', () => console.log('Servidor corriendo en el puerto 3031'));

module.exports = app;