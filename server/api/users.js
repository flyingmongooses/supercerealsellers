const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const adminCheck = (req, res, next) => {
  try {
    if (req.session.user && req.session.user.role === 'ADMIN') {
      next()
    } else {
      res.status(403).json('Get out of here, pal')
    }
  } catch (err) {
    next(err)
  }
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', adminCheck, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', adminCheck, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
