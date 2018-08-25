module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      facebookProviderId: DataTypes.STRING,
      facebookProviderToken: DataTypes.STRING
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return User;
};
