const db = require('../models');

// const { data } = require('../db/models/');

exports.getInstance = (req, res) => {
  const processResults = async arr => {
    const objArray = [];

    // Create campaigns
    await arr.forEach(element => {
      const idx = objArray.findIndex(
        elem => elem.campaignId === element.campaignId
      );
      if (idx === -1) {
        objArray.push({
          campaignId: element.campaignId,
          campaignName: element.campaignName,
          adSets: []
        });
      }
    });

    // Create AdSets and Ads
    await arr.forEach(element => {
      const idx = objArray.findIndex(
        elem => elem.campaignId === element.campaignId
      );

      const adSetIdx = objArray[idx].adSets.findIndex(
        elem => elem.adSetId === element.adSetId
      );

      if (adSetIdx === -1) {
        objArray[idx].adSets.push({
          adSetId: element.adSetId,
          adSetName: element.adSetName,
          ads: [
            {
              adId: element.adId,
              adName: element.adName,
              imgPath: element.imgPath
            }
          ]
        });
      } else {
        objArray[idx].adSets[adSetIdx].ads.push({
          adId: element.adId,
          adName: element.adName,
          imgPath: element.imgPath
        });
      }
    });

    res.status(200).send(objArray);
  };

  db.Instance.findAll({ where: { instanceId: req.params.id } })
    .then(result => {
      processResults(result);
    })
    .catch(err => res.status(422).json(err));
};

exports.createInstance = async (req, res) => {
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const instanceId = Math.random()
    .toString()
    .slice(2, 11);

  console.log(res.app.locals.data[0]);
  await asyncForEach(res.app.locals.data, element => {
    const {
      [Object.keys(element)[0]]: campaignId,
      'Campaign Name': campaignName,
      'Ad Set ID': adSetId,
      'Ad Set Name': adSetName,
      'Ad ID': adId,
      'Ad Name': adName,
      imgPath
    } = element;

    db.Instance.create({
      instanceId,
      campaignId,
      campaignName,
      adSetId,
      adSetName,
      adId,
      adName,
      imgPath
    })
      .then(result => {
        console.log(result.dataValues);
        return result;
      })
      .catch(err => console.log(err));
  });
  res.send({ status: 200, instanceId });
};
