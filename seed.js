const {db, User} = require('./server/db')
const Product = require('./server/db/models/product')
const Category = require('./server/db/models/category')
const Order = require('./server/db/models/order')
const Review = require('./server/db/models/review')
const faker = require('faker')
const {green, red} = require('chalk')

const seed = async () => {
  try {
    await db.sync({force: true})

    const paul = await User.create({
      firstName: 'Paul',
      lastName: 'Luhrsen',
      email: 'pl@gmail.com',
      password: 'password',
      address: '909 N Campbell',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60622',
      role: 'admin'
    })
    const userPromises = []
    for (let i = 0; i < 100; i++) {
      userPromises.push(
        await User.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.random.word(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          zipcode: faker.address.zipCode()
        })
      )
    }

    Promise.all(userPromises)

    const unhealthy = await Category.create({
      name: 'Unhealthy'
    })
    const boring = await Category.create({
      name: 'Boring'
    })
    const weird = await Category.create({
      name: 'Weird'
    })

    const booberry = await Product.create({
      title: 'Booberry',
      description: "It's like blueberry, but instead, it's boo.",
      price: 299,
      inventory: 100
    })
    const productImages = [
      'https://www.pikpng.com/pngl/m/256-2564366_honey-nut-cheerios-gluten-free-breakfast-cereal-cheerios.png',
      'https://www.fye.com/dw/image/v2/BBNF_PRD/on/demandware.static/-/Sites-fye-master/default/dwca30a657/fye/000/000000/fye.000000793396121007_0.jpg?sw=1000',
      'https://i5.walmartimages.com/asr/f405e24f-f1a3-4093-b74f-fb4570ffc0ef_1.22c2838cf2f63ead9f1fa6beccdae3b8.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
      'https://cdn.shopify.com/s/files/1/0091/1910/5081/products/image_8b37de8c-80de-472e-bae5-66f9b1c87c3e_620x.jpg?v=1574584196',
      'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1560369049-capn-crunch-cotton-candy-cereal-square-1560369020.jpg'
    ]
    const productPromises = []
    for (let j = 0; j < 100; j++) {
      productPromises.push(
        await Product.create({
          title: faker.random.word(),
          description: faker.random.words(),
          price: faker.random.number({min: 199, max: 1400}),
          inventory: faker.random.number({min: 10, max: 1000}),
          imageUrl: productImages[faker.random.number({min: 0, max: 4})]
        })
      )
      const products = await Promise.all(productPromises)
      for (let m = 0; m < products.length; m++) {
        if (m % 3) {
          await products[m].addCategory(unhealthy)
        }
        if (m % 2) {
          await products[m].addCategory(weird)
        }
        if (m % 4) {
          await products[m].addCategory(boring)
        }
      }
    }
    const firstOrder = await Order.create({
      status: 'open',
      userId: paul.id
    })
    await firstOrder.addProduct(booberry)

    await booberry.addCategory(unhealthy)
    firstOrder.order_items = {
      quantity: 100
    }
    const booberryReview = await Review.create({
      title: 'Booberry rox!',
      rating: 5,
      description: 'I actually saw a ghost'
    })
    await booberry.addReview(booberryReview)
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
