import productsReducer, {
  createProductAsync,
  deleteProductAsync,
  getAllProductsAsync,
  initialState,
  removeProduct,
  sortByPrice,
  updateProductAsync,
} from '../../redux/reducers/productsReducer'
import { createStore } from '../../redux/store'
import { CreateProduct, UpdateProduct } from '../../types/Product'
import { productsData } from '../data/productsData'
import server from '../shared/productServer'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Test normal actions in productsReducer', () => {
  test('Should sort products by price desc', () => {
    const state = {
      products: productsData,
      loading: false,
      error: '',
    }
    const products = productsReducer(state, sortByPrice('desc')).products
    expect(products[0]).toBe(productsData[0])
    expect(products[1]).toBe(productsData[2])
  })
  test('Should return initial state', () => {
    const state = productsReducer(initialState, {
      payload: undefined,
      type: undefined,
    })
    expect(state).toMatchObject(initialState)
  })
  test('Should delete an existing product', () => {
    const resultAction = store.dispatch(removeProduct('3333-3333-3333333'))
    expect(resultAction.payload).toBe(3333 - 3333 - 3333333)
  })
})

describe('Test async thunk actions in productsReducer', () => {
  test('Should fetch all products with pagination', async () => {
    await store.dispatch(getAllProductsAsync({ limit: 3, offset: 0 }))
    expect(store.getState().products.products.length).toBe(3)
  })
  test('should create product', async () => {
    const input: CreateProduct = {
      title: 'test product',
      description: 'test product',
      price: 100,
      categoryId: '11111',
      images: [
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      ],
    }
    await store.dispatch(createProductAsync(input))
    expect(store.getState().products.products.length).toBe(1)
  })
  test('should not create product with wrong id', async () => {
    const input: CreateProduct = {
      title: 'test product',
      description: 'test product',
      price: 100,
      categoryId: '10101010',
      images: [
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      ],
    }
    await store.dispatch(createProductAsync(input))
    expect(store.getState().products.products.length).toBe(0)
  })
  test('Should update product', async () => {
    const input: UpdateProduct = {
      id: 10,
      update: {
        price: 200,
        title: 'Newly updated product',
      },
    }
    const action = await store.dispatch(updateProductAsync(input))
    expect(action.payload).toMatchObject({
      id: 10,
      title: 'Newly updated product',
      price: 200,
      category: {
        id: '1111',
        name: 'Clothes',
        categoryImage: {
          categoryImageUrl: 'https://i.imgur.com/00qWleT.jpeg',
        },
      },
      images: [
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
        { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      ],
      description:
        'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    })
  })
  test('Should delete an existing product', async () => {
    const resultAction = await store.dispatch(deleteProductAsync(8))
    expect(resultAction.payload).toBe(8)
  })
  test('Should delete an non-existing product', async () => {
    const resultAction = await store.dispatch(deleteProductAsync(55))
    expect(resultAction.payload).toBe('Cannot delete')
  })
})
