module.exports = (sequelize, Sequelize) => {
const Payment = sequelize.define('Payment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_id: {
    type: Sequelize.INTEGER,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_date: {
    type: Sequelize.DATE,
  }

});

return Payment;
}
