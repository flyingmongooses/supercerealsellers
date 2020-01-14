const {db, User} = require('./server/db')
const Product = require('./server/db/models/product')
const faker = require('faker')
const {green, red} = require('chalk')

const seed = async () => {
  try {
    await db.sync({force: true})

    const paul = await User.create({
      first_name: 'Paul',
      last_name: 'Luhrsen',
      email: 'pl@gmail.com',
      password: 'password',
      address: '909 N Campbell',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60622'
    })
    const userPromises = []
    for (let i = 0; i < 100; i++) {
      userPromises.push(
        await User.create({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.random.word(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          zipcode: 60622
        })
      )
    }
    Promise.all(userPromises)
    const booberry = await Product.create({
      title: 'Booberry',
      description: "It's like blueberry, but instead, it's boo.",
      price: 2.99,
      quantity: 100
    })
    const productPromises = []
    for (let j = 0; j < 100; j++) {
      productPromises.push(
        await Product.create({
          title: faker.random.word(),
          description: faker.random.words(),
          price: 2.99,
          quantity: 100
        })
      )
      Promise.all(productPromises)
    }
  } catch (err) {
    console.log(err)
  }
}

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
module.exports = seed
