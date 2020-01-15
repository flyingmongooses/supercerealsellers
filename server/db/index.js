const db = require('./db')

// register models
const {User, Product, Order, Session} = require('./models')

module.exports = {db, User, Order, Product, Session}
