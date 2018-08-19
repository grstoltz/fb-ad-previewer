const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const { Schema } = mongoose;

const AdSchema = new Schema({
  adId: 'string',
  adName: 'string',
  imgPath: 'string',
  instanceId: 'string'
});

const AdSetSchema = new Schema({
  instanceId: 'string',
  adSetId: 'string',
  adSetName: {
    type: String,
    required: true
  },
  campaignId: 'string',
  ads: [AdSchema]
});

const CampaignSchema = new Schema({
  campaignId: {
    type: String
  },
  campaignName: {
    type: String,
    required: true
  },
  instanceId: {
    type: String
  },
  adSets: [AdSetSchema]
});

const InstanceSchema = new Schema({
  campaigns: [CampaignSchema]
});

// InstanceSchema.plugin(findOrCreate);
// CampaignSchema.plugin(findOrCreate);
// AdGroupSchema.plugin(findOrCreate);

const Instance = mongoose.model('Instance', InstanceSchema);
const Campaign = mongoose.model('Campaign', CampaignSchema);
const AdSet = mongoose.model('AdSet', AdSetSchema);
const Ad = mongoose.model('Ad', AdSchema);

module.exports = {
  Instance,
  Campaign,
  AdSet,
  Ad
};
