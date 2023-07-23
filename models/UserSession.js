module.exports = (sequelize, Sequelize) => {
    const UserSession = sequelize.define('UserSession', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      user_id:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    
    return UserSession;
    } 