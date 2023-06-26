module.exports = (sequelize, Sequelize) => {
const Invoice = sequelize.define('Invoice', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  charges: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  discounts: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  due_date: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM('CREATED', 'SENT','VIEWED','PAID'),
    allowNull: false,
    defaultValue: 'CREATED',
  }
});

return Invoice
}