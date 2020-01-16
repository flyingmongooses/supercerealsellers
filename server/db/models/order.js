const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'shipped', 'delivered'),
    allowNull: false
  }
})
Order.addHook('beforeValidate', order => {
  order.status = 'open'
})
module.exports = Order
