const db = require('../models');
const s3 = require('../services/s3');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

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
      const { adSetId, adSetName, adId, adName, imgPath } = element;
      const idx = objArray.findIndex(
        elem => elem.campaignId === element.campaignId
      );

      const adSetIdx = objArray[idx].adSets.findIndex(
        elem => elem.adSetId === element.adSetId
      );

      if (adSetIdx === -1) {
        objArray[idx].adSets.push({
          adSetId,
          adSetName,
          ads: [
            {
              adId,
              adName,
              imgPath
            }
          ]
        });
      } else {
        objArray[idx].adSets[adSetIdx].ads.push({
          adId,
          adName,
          imgPath
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

exports.getInstanceByUser = (req, res) => {
  db.Instance.findAll({
    where: {
      createdBy: req.params.id
    }
  })
    .then(result => {
      const mappedArray = result.map(element => element.instanceId);
      const filteredArray = [...new Set(mappedArray)];
      res.status(200).send(filteredArray);
    })
    .catch(err => res.status(422).json(err));
};

exports.deleteInstance = (req, res) => {
  const deleteImages = imgArr => {
    const result = s3.deleteInstanceImages(imgArr);
    return result;
  };

  db.Instance.findAll({ where: { instanceId: req.params.id } }).then(result => {
    const mappedArray = result.map(element => {
      const imgKey = element.imgPath
        .split('/')
        .slice(-1)[0]
        .replace(/%3A/g, ':');
      return {
        Key: imgKey
      };
    });
    deleteImages(mappedArray);

    return db.Instance.destroy({
      where: { instanceId: req.params.id }
    })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(422).json(err));
  });
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

  await asyncForEach(res.app.locals.data, element => {
    const {
      [Object.keys(element)[0]]: campaignId,
      'Campaign Name': campaignName,
      'Ad Set ID': adSetId,
      'Ad Set Name': adSetName,
      'Ad ID': adId,
      'Ad Name': adName,
      imgPath,
      createdBy
    } = element;

    db.Instance.create({
      createdBy,
      instanceId,
      campaignId,
      campaignName,
      adSetId,
      adSetName,
      adId,
      adName,
      imgPath
    })
      .then(result => result)
      .catch(err => console.log(err));
  });
  res.send({ status: 200, instanceId });
};
