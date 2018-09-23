export default (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'channel', 
    {
      name: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
    },
    { underscored: true },
  );

  Channel.associate = (models) => {
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });

    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
  };

  return Channel;
};
