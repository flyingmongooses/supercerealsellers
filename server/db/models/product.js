const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      isEmpty: false
    }
  },
  quantity: {
    type: Sequelize.NUMBER,
    validate: {
      defaultValue: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      defaultValue:
        'https://www.pikpng.com/pngl/m/256-2564366_honey-nut-cheerios-gluten-free-breakfast-cereal-cheerios.png'
    }
  }
})

module.exports = Product
