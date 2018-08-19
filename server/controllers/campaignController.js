const models = require('../models');

// const { data } = require('../db/models/');

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
        'Ad Set ID': adSetId,
        'Ad ID': adId,
        'Ad Name': adName,
        Image: imgPath
      } = element;

      await Ad.create({ adId, adName, imgPath }).then(ad => {
        console.log(ad);
        return AdSet.update(
          { adSetId, instanceId: instance._id },
          {
            $push: {
              ads: { adId: ad.adId, adName: ad.adName, imgPath: ad.imgPath }
            }
          }
        ).then(result => {
          console.log(result);
          return result;
        });
      });
    }).then(res.send('completed'));
  };

  // PROCESSING AD SETS
  const processAdSets = async instance => {
    const adSetArray = [];

    await data.forEach(function(a) {
      if (!this[a['Ad Set ID']]) {
        this[a['Ad Set ID']] = {
          adSetId: a['Ad Set ID'],
          adSetName: a['Ad Set Name'],
          campaignId: a['Campaign ID'],
          instanceId: instance._id
        };
        adSetArray.push(this[a['Ad Set ID']]);
      }
    }, Object.create(null));

    await asyncForEach(adSetArray, async element => {
      const { adSetId, adSetName, campaignId } = element;

      await AdSet.create({ adSetId, adSetName, instanceId: instance._id }).then(
        adSet => {
          console.log(adSet);
          return Campaign.update(
            { campaignId, instanceId: instance._id },
            {
              $push: {
                adSets: {
                  adSetId: adSet.adSetId,
                  adSetName: adSet.adSetName
                }
              }
            }
          ).then(result => {
            console.log(result);
          });
        }
      );
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
