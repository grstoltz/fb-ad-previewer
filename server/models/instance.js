module.exports = (sequelize, DataTypes) => {
  const generateId = () => {
    const instanceId = Math.random()
      .toString()
      .slice(2, 11);
    return instanceId;
  };

  const Instance = sequelize.define(
    'Instance',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue() {
          return generateId();
        }
      },
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
