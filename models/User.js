module.exports = (sequelize, Sequelize) => {
const User = sequelize.define('User', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstname:{
    type: Sequelize.STRING,
  },
  lastname:{
    type: Sequelize.STRING,
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
    unique: true,
  },
  apple_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  microsoft_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  role: {
    type: Sequelize.ENUM('CUSTOMER', 'ADMIN','SUPERADMIN','EXECUTIVEBOARDMEMBER'),
    // 'CUSTOMER' - Kurunagai user, access to kurunagai application. 
    // 'ADMIN' - Kurunagai administrator, limited access to Kurunagai Admin portal for Operations.
    // 'SUPERADMIN' - Kurunagai Senior administrator, access to Kurunagai Admin portal and Billing and subscription settings.
    // 'EXECUTIVEBOARDMEMBER' - GOD MODE Full Access to Database, Storage, Infrastructure and Application
  },
  status: {
    type: Sequelize.ENUM('ACTIVE', 'INVITED','DISABLED','INACTIVE','NEW'),  
    allowNull: false,
    defaultValue: 'NEW'
  }
});

return User;
} 