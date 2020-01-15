const db = require('./db')

// register models

const {User, Product, Order, Category, Session} = require('./models')
module.exports = {db, User, Order, Product, Category, Session}

