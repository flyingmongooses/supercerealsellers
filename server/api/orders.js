const router = require('express').Router()

const {Order, Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: Product}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

///this displays the order info and all orders items based on the orders Id///
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findAll({
      where: {
        id: req.params.id
      },
      include: [{model: Product}]
    })
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

///this displays all of the orders and order items for a given user based on the user's id///
router.get('/user/:id', async (req, res, next) => {
  try {
    const singleUserOrders = await Order.findAll({
      where: {
        userId: req.params.id
      },
      include: [{model: Product}]
    })
    res.json(singleUserOrders)
  } catch (err) {
    next(err)
  }
})

///needs work, needs to be able to check if the user has already started a new cart///

router.post('/', async (req, res, next) => {
  try {
    const {userId, productId} = req.body
    const order = await Order.findOrCreate({
      where: {userId},
      include: [{model: Product}]
    })
    const product = await Product.findByPk(productId)
    await order[0].addProduct(product)
    res.json(order[0])
  } catch (err) {
    next(err)
  }
})

//Delete an item from an order

router.put('/delete', async (req, res, next) => {
  try {
    const {id, productId} = req.body
    const order = await Order.findByPk(id, {include: [{model: Product}]})
    const refreshedCart = await order.removeProduct({where: {id: productId}})
    res.json(refreshedCart)
  } catch (err) {
    next(err)
  }
})
