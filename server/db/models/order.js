const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'closed', 'processing'),
    allowNull: false
  }
})

module.exports = Order
