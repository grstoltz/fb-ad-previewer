const { Instance } = require('../db/models/CampaignSchema');

exports.findById = (req, res) => {
  console.log(req.params);
  Instance.find({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => res.status(422).json(err));
};
