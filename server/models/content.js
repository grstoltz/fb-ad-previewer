module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    'Content',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // instanceId: DataTypes.STRING,
      createdBy: DataTypes.STRING,
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
  Content.associate = models => {
    Content.belongsTo(models.Instance, {
      foreignKey: 'instanceId'
    });
  };
  return Content;
};
