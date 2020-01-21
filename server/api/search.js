const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {title: req.query.search},
      include: [Review]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
