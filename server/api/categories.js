const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Category.findAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})
