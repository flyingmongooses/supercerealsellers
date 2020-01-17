const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'shipped', 'delivered'),
    defaultValue: 'open',
    allowNull: false
  }
})
module.exports = Order
