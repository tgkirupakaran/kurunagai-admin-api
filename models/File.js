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
    // references: {
    //   model: 'users', 
    //   key: 'id', 
    // }
  },
  title: {
    type: Sequelize.STRING,
  },
  originalTitle: {
    type: Sequelize.STRING,
  },
  encoding: {
    type: Sequelize.STRING,
  },
  mimetype: {
    type: Sequelize.STRING,
  },
  tempfilename: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.ENUM('INTEMP', 'ENCRYPTEDINTEMP','UPLOADED','PINNED','FINAL','FORDELETE','DELETED'),
  }


});

return Photo;
}