const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('order_items', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderItems
