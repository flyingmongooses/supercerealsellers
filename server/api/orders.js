const router = require('express').Router()

const {Order, Product, OrderItems} = require('../db/models')
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

///this displays the "open" order and order items for a given user based on the user's id///
router.get('/user/:id', async (req, res, next) => {
  try {
    const singleUserOrder = await Order.findOne({
      where: {userId: req.params.id, status: 'open'},
      include: [{model: Product}]
    })
    res.json(singleUserOrder)
  } catch (err) {
    next(err)
  }
})

///this displays ALL orders and order-items for a given user///

router.get('/user-order/:id', async (req, res, next) => {
  try {
    const singleUserOrders = await Order.findAll({
      where: {userId: req.params.id},
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
    const {userId, productId, quantity} = req.body
    const order = await Order.findOrCreate({
      where: {userId},
      include: [{model: Product}]
    })
    const product = await Product.findByPk(productId)
    await order[0].addProduct(product)
    await OrderItems.update(
      {
        quantity: quantity
      },
      {
        where: {orderId: order[0].id, productId}
      }
    )
    res.json(order[0])
  } catch (err) {
    next(err)
  }
})

//Delete an item from an order

router.put('/delete', async (req, res, next) => {
  try {
    const {id, productId} = req.body
    const order = await Order.findOne({
      where: {userId: id},
      include: [{model: Product}]
    })
    const product = await Product.findOne({where: {id: productId}})
    await order.removeProduct(product)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id
    const order = await Order.findByPk(orderId)
    console.log('before', order)
    await order.update({status: 'processing'})
    console.log('after', order)
    res.json(order)
  } catch (err) {
    console.log(err)
  }
})
