/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as NavBar} from './NavBar'
export {default as UserHome} from './UserHome'
export {Login, Signup} from './AuthForm'
export {default as AllProducts} from './AllProducts'
export {default as Checkout} from './Checkout'
export {default as CreateAccount} from './CreateAccount'
export {default as Main} from './Main'
