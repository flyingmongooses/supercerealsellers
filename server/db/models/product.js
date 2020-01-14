const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.pikpng.com/pngl/m/256-2564366_honey-nut-cheerios-gluten-free-breakfast-cereal-cheerios.png'
  }
})

module.exports = Product
