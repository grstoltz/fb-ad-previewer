const router = require('express').Router();
const passport = require('passport');

const { User } = require('../../db/models/UserSchema');

/* GET users listing. */
router.post('/', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { login: false },
    { new: true },
    (err, userAcc) => {
      if (err) {
        res.send(err);
      } else {
        // req.logout();
        res.send({ msg: 'logged out', user: '' });
      }
    }
  );

  // res.send('logged out')
});

module.exports = router;
