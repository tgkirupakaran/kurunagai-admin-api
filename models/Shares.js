module.exports = (sequelize, Sequelize) => {
const Share = sequelize.define('Share', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  album_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

return Share;
}