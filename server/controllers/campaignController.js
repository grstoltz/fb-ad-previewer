const {
  Instance,
  Campaign,
  AdSet,
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
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const instance = await Instance.create({})
    .then(result => result)
    .catch(err => err);

  const processAds = async instance => {
    await asyncForEach(data, async element => {
      const {
        'Ad Set Id': adSetId,
        'Ad Id': adId,
        'Ad Name': adName,
        adPath: imgPath
      } = element;

      await AdSet.find({
        instanceId: instance._id,
        ads: {
          $elemMatch: { adId }
        }
      }).then(result => {
        if (result.length === 0) {
          Ad.create({ adId, adName, imgPath }).then(ad => {
            return AdSet.update(
              { adSetId, instanceId: instance._id },
              { $push: { ads: { ad } } }
            ).then(result => {
              console.log(result);
              return result;
            });
          });
        }
      });
    });

    Campaign.find({ instanceId: instance._id }).then((result, err) => {
      if (err) res.send(err);
      res.send(result);
    });
  };

  // PROCESSING AD SETS
  const processAdSets = async instance => {
    await asyncForEach(data, async element => {
      const {
        'Ad Set Id': adSetId,
        'Ad Set Name': adSetName,
        'Campaign ID': campaignId
      } = element;

      Campaign.find({
        instanceId: instance._id,
        campaigns: {
          $elemMatch: { adSetId }
        }
      }).then(result => {
        if (result.length === 0) {
          AdSet.create({ adSetId, adSetName, instanceId: instance._id }).then(
            adSet => {
              return Campaign.update(
                { campaignId, instanceId: instance._id },
                { $push: { adSets: { adSet } } }
              ).then(result => {
                console.log(result);
              });
            }
          );
        }
      });
    });
    processAds(instance);
  };

  const processCampaigns = async () => {
    const campaignArray = [];

    await data.forEach(function(a) {
      if (!this[a['Campaign ID']]) {
        this[a['Campaign ID']] = {
          campaignId: a['Campaign ID'],
          campaignName: a['Campaign Name'],
          instanceId: instance._id
        };
        campaignArray.push(this[a['Campaign ID']]);
      }
    }, Object.create(null));

    const results = await Campaign.insertMany(campaignArray)
      .then(campaigns => {
        return Instance.update(
          { _id: instance._id },
          { $push: { campaigns: { $each: campaigns } } }
        );
      })
      .catch(err => console.log(err))
      .then(async result => {
        console.log(result);
        return processAdSets(instance);
      })
      .catch(err => console.log(err));

    return results;
  };

  processCampaigns();
};
