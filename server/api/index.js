const router = require('express').Router()
module.exports = router
const {User} = require('../db/models')

const adminCheck = async (req, res, next) => {
  try {
    const person = await User.findOne({
      where: {
        id: req.session.passport.user
      }
    })
    if (person.role === 'admin') {
      next()
    } else {
      res.status(403).json('Get out of here, pal')
    }
  } catch (err) {
    next(err)
  }
}

router.use('/users', adminCheck, require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/search', require('./search'))
router.use('/categories', require('./categories'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
