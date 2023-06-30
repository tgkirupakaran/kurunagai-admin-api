module.exports = (sequelize, Sequelize) => {
    const Invite = sequelize.define('Invite', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      //   references: {
      //     model: 'users', 
      //     key: 'id', 
      //  }
      },
      invited_by: {
        type: Sequelize.STRING,
        allowNull: false,
      //   references: {
      //     model: 'users', 
      //     key: 'id', 
      //  }
      },
      email_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('CUSTOMER', 'ADMIN','SUPERADMIN','EXECUTIVEBOARDMEMBER'),
        // 'CUSTOMER' - Kurunagai user, access to kurunagai application. 
        // 'ADMIN' - Kurunagai administrator, limited access to Kurunagai Admin portal for Operations.
        // 'SUPERADMIN' - Kurunagai Senior administrator, access to Kurunagai Admin portal and Billing and subscription settings.
        // 'EXECUTIVEBOARDMEMBER' - GOD MODE Full Access to Database, Storage, Infrastructure and Application
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('JOINREQUEST', 'VERIFICATION'),
         // 'JOINREQUEST' - Inivitation email for a User to join Kurunai in a partucular Role. 
        // 'VERIFICATION' - Email verification for self joined (Sign up) User 
      },
      status: {
        type: Sequelize.ENUM('CREATED', 'SENT','VERIFIED','EXPIRED'),
        allowNull: false,
      }
    });
    
    return Invite;
    }