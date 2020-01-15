const db = require('./db')

// register models
const {User, Product, Order, Category} = require('./models')
module.exports = {db, User, Order, Product, Category}
