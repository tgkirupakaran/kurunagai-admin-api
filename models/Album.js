module.exports = (sequelize, Sequelize) => {
const Album = sequelize.define('Album', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    // references: {
    //   model: 'users', 
    //   key: 'id', 
    // }
  },
  title: {
    type: Sequelize.STRING,
  }
});

return Album;
}