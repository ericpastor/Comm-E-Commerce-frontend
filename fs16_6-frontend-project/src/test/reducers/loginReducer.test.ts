import {
  authenticateUserAsync,
  loginUserAsync,
} from '../../redux/reducers/loginReducer'
import { createStore } from '../../redux/store'
import { userData } from '../data/userData'
import userServer, { access_token } from '../shared/userServer'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

beforeAll(() => userServer.listen())

afterEach(() => userServer.resetHandlers())

afterAll(() => userServer.close())

describe('Test usersReducer async actions', () => {
  test('Should login user with right credential', async () => {
    await store.dispatch(
      loginUserAsync({ email: 'john@mail.com', password: 'changeme' })
    )
    expect(store.getState().login.currentProfile?.firstName).toBe('Jhon')
    await store.dispatch(authenticateUserAsync(access_token + '_1'))
    expect(store.getState().login.currentProfile).toMatchObject(userData[0])
  })
  test('Should authenticate with right token', async () => {
    await store.dispatch(authenticateUserAsync(access_token + '_2'))
    expect(store.getState().login.currentProfile).toMatchObject(userData[1])
  })
})
