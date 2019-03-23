import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';
import fileUpload from 'express-fileupload';

import jobRouter from './routes/jobs';
import submissionRouter from './routes/submission';
import userRouter from './routes/user';

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const app = express();

app.disable('etag');
app.use(fileUpload());
app.use(express.static('./cv'));
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(logger('dev'));
app.use(express.json({ limit: '100mb', extended: true }));
app.use(passport.initialize());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('respond with a resource');
});

app.use('/jobs', jobRouter);
app.use('/submissions', submissionRouter);
app.use('/users', userRouter);

passport.use(new JWTstrategy({
  secretOrKey: 'nodeauthsecret',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
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
