module.exports = (sequelize, Sequelize) => {
    const SMS = sequelize.define('SMS', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      from: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
      receivedat: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      }    
    
    });
    
    return SMS;
    }