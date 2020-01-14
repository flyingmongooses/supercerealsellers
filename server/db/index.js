const db = require('./db')

// register models
const {User, Product, Order} = require('./models')

module.exports = {db, User, Order, Product}
