const router = require('express').Router()
module.exports = router
let sess

router.get('/', async (req, res, next) => {
  console.log('in the route')
  sess = req.session
  if (sess.email) {
    return res.redirect('/hello')
  }
  res.send(`Welcome, ${sess.email}`)
})

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/search', require('./search'))
router.use('/categories', require('./categories'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
