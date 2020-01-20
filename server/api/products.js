const router = require('express').Router()
const {Product, OrderItems, Order, Review, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [{model: Review}]})
    res.json(products)
  } catch (err) {
    next(err)
  }
})
router.get('/reviews/:id', async (req, res, next) => {
  try {
    const productReviews = await Product.findByPk(req.params.id, {
      include: [{model: Review}]
    })
    res.json(productReviews)
  } catch (err) {
    next(err)
  }
})
router.post('/reviews/:id', async (req, res, next) => {
  try {
    const {userId, review} = req.body
    console.log(req.body)
    const {title, rating, description} = review
    const user = await User.findByPk(userId)
    const product = await Product.findByPk(req.params.id, {
      include: [{model: Review}]
    })
    const newReview = await Review.create({title, rating, description})
    await user.addReview(newReview)
    await product.addReview(newReview)
    res.json(newReview)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [{model: Review}]
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

///need to capture and add correct quantity///
router.post('/:productId/:orderId', async (req, res, next) => {
  try {
    const cart = await OrderItems.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
        quantity: 1
      }
    })

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

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
