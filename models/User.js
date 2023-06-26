module.exports = (sequelize, Sequelize) => {
const User = sequelize.define('User', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  },
  google_id: {
    type: Sequelize.STRING,
  },
  apple_id: {
    type: Sequelize.STRING,
  },
  microsoft_id: {
    type: Sequelize.STRING,
  },
});

return User;
}