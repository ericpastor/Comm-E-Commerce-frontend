import { getAllCategoriesAsync } from '../../redux/reducers/categoryReducer'
import { createStore } from '../../redux/store'
import server from '../shared/productServer'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Test CategoryReducer async actions', () => {
  test('Should fetch all Categories', async () => {
    await store.dispatch(getAllCategoriesAsync())
    expect(store.getState().categories.categories.length).toBe(3)
  })
  test('Should has the same name', async () => {
    await store.dispatch(getAllCategoriesAsync())
    expect(store.getState().categories.categories[0].name).toMatch('Clothes')
  })
})
