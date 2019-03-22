import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import { Pool, Client } from 'pg';
import bcrypt from 'bcrypt';

import jobRouter from './routes/jobs';
import submissionRouter from './routes/submission';
import userRouter from './routes/user';

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const app = express();

app.disable('etag');

app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/jobs', jobRouter);
app.use('/users', submissionRouter);
app.use('/users', userRouter);

app.get('/test', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.send('respond with a resource');
});

passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey : 'nodeauthsecret',
  //we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    console.log('All good');
    console.log(token);
  try {
    //Pass the user details to the next middleware
    return done(null, token.id);
  } catch (error) {
    done(error);
  }
}));
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
