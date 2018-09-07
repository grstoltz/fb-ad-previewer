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
      // createdBy: DataTypes.STRING,
      processing: DataTypes.BOOLEAN
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Instance.associate = models => {
    Instance.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Instance;
};
