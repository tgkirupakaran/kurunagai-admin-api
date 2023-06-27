module.exports = (sequelize, Sequelize) => {
const Payment = sequelize.define('Payment', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  invoice_id: {
    type: Sequelize.INTEGER,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM('COMPLETE','INCOMPLETE'),
  }


});

return Payment;
}
