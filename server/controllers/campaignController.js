const {
  Instance,
  Campaign,
  AdGroup,
  Ad
} = require('../db/models/CampaignSchema');
const { data } = require('../db/models/');

exports.findAll = (req, res) => {
  Instance.find({})
    .then(result => res.send(result))
    .catch(err => res.status(422).json(err));
};

exports.deleteAll = (req, res) => {
  Campaign.remove({}).then(result => res.send(result));
};

exports.create = async (req, res) => {
  // const { data } = req.app.locals;
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const instance = await Instance.create({})
    .then(result => result)
    .catch(err => err);

  console.log(instance);

  const generateDocuments = async (arr, instanceId) => {
    for (let i = 0; i < arr.length; i++) {
      const campaign = await Campaign.findOneAndUpdate(
        { campaign_id: arr[i]['Campaign ID'] },
        { campaign_id: arr[i]['Campaign ID'], name: arr[i]['Campaign Name'] },
        options
      )
        .then(result => {
          // console.log(result);
          return Instance.findOneAndUpdate(
            { _id: instanceId },
            //   { campaigns: result._id },
            {
              $addToSet: {
                campaigns: {
                  campaign_id: result.campaign_id,
                  name: result.name
                }
              }
            }
          )
            .then(result => console.log(result))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  await generateDocuments(data, instance._id);

  const result = await Instance.find({ _id: instance._id }).then(
    result => result
  );

  console.log(`final results:${result}`);

  res.send(result);
};
