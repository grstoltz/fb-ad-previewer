const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../db/models/UserSchema');

router.post('/', passport.authenticate('local'), (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { login: true },
    { new: true },
    (err, userAcc) => {
      if (err) {
        console.log('err', err);
        res.send(err);
      } else if (req.user) {
        res.send({ msg: 'you logged in', user: req.user });
      }
    }
  );
});

module.exports = router;
