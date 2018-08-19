module.exports = (sequelize, DataTypes) => {
  const Instance = sequelize.define(
    'Instance',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      instanceId: DataTypes.STRING,
      campaignId: DataTypes.STRING,
      campaignName: DataTypes.STRING,
      adSetId: DataTypes.STRING,
      adSetName: DataTypes.STRING,
      adId: DataTypes.STRING,
      adName: DataTypes.STRING,
      imgPath: DataTypes.STRING
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return Instance;
};
