module.exports = (sequelize, Sequelize) => {
const Subscription = sequelize.define('Subscription', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  user_id: {
    type: Sequelize.STRING,
  },
  plan_name: {
    type: Sequelize.ENUM('STANDARD', 'FREE','FREEMIUM','LIMITED'),
    // 'STANDARD' - PAYG 
    // 'FREE' - limited usage size in limited time.
    // 'FREEMIUM' - Free unlimited usage limited time.
    // 'LIMITED' - Read Only until 3 months.
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
  price: {
     type: Sequelize.DATE,
  },
});

return Subscription;
}
