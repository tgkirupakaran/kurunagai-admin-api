module.exports = (sequelize, Sequelize) => {
const Photo = sequelize.define('Photo', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id', 
    }
  },
  title: {
    type: Sequelize.STRING,
  },
  thumbnail: {
    type: Sequelize.BLOB,
  },
  album_id: {
    type: Sequelize.STRING,
  },
  captured_by: {
    type: Sequelize.STRING,
  },
  captured_on: {
    type: Sequelize.DATE,
  },
  captured_at: {
    type: Sequelize.STRING,
  },
  resolution:{
    type: Sequelize.STRING,
  },
  other_meta_data: {
    type: Sequelize.STRING,
  },

});

return Photo;
}