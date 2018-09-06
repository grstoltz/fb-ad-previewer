const db = require('../models');

exports.upsertFbUser = (accessToken, refreshToken, profile, cb) => {
  db.User.findOrCreate({
    where: { facebookProviderId: profile.id },
    defaults: {
      fullName: profile.displayName,
      email: profile.emails[0].value,
      facebookProviderId: profile.id,
      facebookProviderToken: accessToken
    }
  })
    .then(result => {
      const user = result[0];
      const created = result[1];
      if (!created) {
        return cb(null, user);
      }
      return cb(null, user);
    })
    .catch(err => console.log(err));
};

exports.verifyUser = tokenId =>
  db.User.findOne({
    where: {
      id: tokenId
    }
  })
    .then(result => result)
    .catch(err => err);

exports.deleteUser = (req, res) =>
  db.User.delete({
    where: {
      facebookProviderId: req.params.id
    }
  })
    .then(result => result)
    .catch(err => err);
