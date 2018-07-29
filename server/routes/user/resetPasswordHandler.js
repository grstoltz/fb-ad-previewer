const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../../config/config');
const { User } = require('../../db/models/UserSchema');

router.post('/', (req, res) => {
  const { token, email } = req.body;

  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.JWTsecret, (err, decoded) => {
    // using the token we passed to authonticate the account
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    User.findOne({ email }, (e, user) => {
      if (e) console.log('error resetting password', e);
      if (user) {
        user.setPassword(req.body.password, (err, user) => {
          if (err) {
            console.log(err);
          }
          user.save(err => {
            if (err) {
              console.log(err);
              res.send('password couldne be changed');
            } else {
              res.send('password changed');
            }
          });
        });
      }
    });
  });
});

module.exports = router;
