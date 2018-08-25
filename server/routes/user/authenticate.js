const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const userController = require('../../controllers/userController');

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      userController.upsertFbUser(
        accessToken,
        refreshToken,
        profile,
        (err, user) => done(err, user)
      );
    }
  )
);

const createToken = auth =>
  jwt.sign(
    {
      id: auth.id
    },
    'my-secret',
    {
      expiresIn: 60 * 120
    }
  );

const generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

router.route('/').post(
  passport.authenticate('facebook-token', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id
    };

    next();
  },
  generateToken,
  sendToken
);

module.exports = router;
