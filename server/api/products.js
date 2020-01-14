const router = require('express').Router()
const {Product} = require('../db/models/product')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Product.findAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})
