import MockAxiosAdapter from 'axios-mock-adapter'
import {expect} from 'chai'
import axios from 'axios'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import enforceImmutableState from 'redux-immutable-state-invariant'

let store
let mockAxios

///imports to test///
// import {setProducts, getProduct} from '../client/store/product'
import reducer from '../client/store/index'
import {fetchProducts} from '../client/store/product'

///tests go here///
describe('Thunks', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios)
    store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware, enforceImmutableState())
    )
  })

  afterEach(() => {
    mockAxios.restore()
  })

  describe('GET /products succeeds', () => {
    beforeEach(() => {
      mockAxios
        .onGet('/products')
        .reply(200, ['honey nut', 'booberry', 'frosted flakes'])
    })

    it('sets the received balloons on state', async () => {
      await store.dispatch(fetchProducts())
      const state = store.getState()
      expect(state.products).to.deep.equal([
        'honey nut',
        'booberry',
        'frosted flakes'
      ])
    })
  })

  // keeping this as an example if we went to test a failure on the thunk. it needs to be updated and have the correct action creators to do so
  //describe('GET /products fails', () => {
  //   beforeEach(() => {
  //     mockAxios.onGet('/products').reply(404, 'No products available!')
  //   })

  //   it('sets the thrown error on state', async () => {
  //     await store.dispatch(fetchProducts())
  //     const state = store.getState()
  //     expect(state.productsError.response.data).to.deep.equal(
  //       'No products available!'
  //     )
  //   })
  // })
})
