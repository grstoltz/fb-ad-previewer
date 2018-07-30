const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const { Schema } = mongoose;

const AdSchema = new Schema({
  name: 'string',
  path: 'string'
});

const AdGroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ads: [AdSchema]
});

const CampaignSchema = new Schema({
  _id: false,
  campaign_id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  adGroups: [AdGroupSchema]
});

const InstanceSchema = new Schema({
  campaigns: [CampaignSchema]
});

// InstanceSchema.plugin(findOrCreate);
// CampaignSchema.plugin(findOrCreate);
// AdGroupSchema.plugin(findOrCreate);

const Instance = mongoose.model('Instance', InstanceSchema);
const Campaign = mongoose.model('Campaign', CampaignSchema);
const AdGroup = mongoose.model('Adgroup', AdGroupSchema);
const Ad = mongoose.model('Ad', AdSchema);

module.exports = {
  Instance,
  Campaign,
  AdGroup,
  Ad
};
