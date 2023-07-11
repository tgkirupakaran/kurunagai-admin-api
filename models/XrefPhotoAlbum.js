module.exports = (sequelize, Sequelize) => {
const XrefPhotoAlbum = sequelize.define('XrefPhotoAlbum', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  photo_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  album_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

return XrefPhotoAlbum;
}