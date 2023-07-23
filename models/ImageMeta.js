module.exports = (sequelize, Sequelize) => {
const ImageMeta = sequelize.define('ImageMeta', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  file_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: Sequelize.BLOB,
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

return ImageMeta;
}