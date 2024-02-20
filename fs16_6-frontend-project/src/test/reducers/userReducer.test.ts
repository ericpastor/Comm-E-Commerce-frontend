import { createUserAsync } from '../../redux/reducers/userReducer'
import { createStore } from '../../redux/store'
import { CreateUser } from '../../types/User'
import server from '../shared/userServer'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Test for create a user', () => {
  test('should create product', async () => {
    const input: CreateUser = {
      firstName: 'Ferd',
      lastName: 'Apellido',
      phone: '444444',
      email: 'someFred@hmail.com',
      password: 'somepassword',
      avatar: { avatarUrl: 'http' },
    }
    await store.dispatch(createUserAsync(input))
    expect(store.getState().users.users.length).toBe(1)
  })
})
