const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Category.findAll({where: {name: req.body}})
    res.json(products)
  } catch (err) {
    next(err)
  }
})
