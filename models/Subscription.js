module.exports = (sequelize, Sequelize) => {
const Subscription = sequelize.define('Subscription', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.STRING,
  },
  plan_name: {
    type: Sequelize.ENUM('STANDARD', 'FREE','FREEMIUM','LIMITED'),
    // 'STANDARD' - PAYG 
    // 'FREE' - limited usage size.
    // 'FREEMIUM' - Free unlimited usage until time.
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
