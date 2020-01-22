const router = require('express').Router()
const {Product, Review} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {title: {[Op.like]: `${req.query.search}%`}},
      include: [Review]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
