const router = require('express').Router()
const {
  Product,
  OrderItems,
  Order,
  Review,
  User,
  Category
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.query.page) {
      const products = await Product.findAll({
        include: [{model: Review, include: [{model: User}]}]
      })
      res.json(products)
    } else {
      const {page} = req.query
      const pageSize = 20
      const offset = page * pageSize
      const limit = pageSize
      const data = await Product.findAll({
        limit,
        offset,
        include: [{model: Review, include: [{model: User}]}]
      })
      res.send(data)
    }
  } catch (err) {
    next(err)
  }
})

//is this still needed?
// router.get('/reviews/:id', async (req, res, next) => {
//   try {
//     const productReviews = await Product.findByPk(req.params.id, {
//       include: [{model: Review}]
//     })
//     res.json(productReviews)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Review, include: [{model: User}]}]
    })
    res.json(singleProduct)
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
