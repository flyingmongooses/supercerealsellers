const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

router.get('/', adminCheck, async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.session.userId = user.id
    console.log(req.session)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const foundUser = await User.findByPk(req.params.id)
    const updatedUser = await foundUser.update(req.body)
    res.send(updatedUser)
  } catch (err) {
    next(err)
  }
})
