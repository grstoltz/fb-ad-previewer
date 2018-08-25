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
      console.log(user);
      if (!created) {
        return cb(null, user);
      }
      return cb(null, user);
    })
    .catch(err => console.log(err));
};
