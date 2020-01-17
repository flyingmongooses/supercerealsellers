const router = require('express').Router()
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
