import { User } from '../../types/User'

export const userData: User[] = [
  {
    id: '1111-11111-11111',
    email: 'john@mail.com',
    password: 'changeme',
    firstName: 'Jhon',
    lastName: 'Apellido jhon',
    phone: '1113333333',
    role: 'Customer',
    avatar: {
      avatarUrl: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
    },
  },
  {
    id: '2222-22222-222222',
    email: 'maria@mail.com',
    password: '12345',
    firstName: 'Maria',
    lastName: 'Apellido Maria',
    phone: '1111112',
    role: 'Customer',
    avatar: {
      avatarUrl: 'https://i.imgur.com/00qWleT.jpeg',
    },
  },
  {
    id: '3333-3333-3333333',
    firstName: 'Admin',
    lastName: 'Apellido Admin',
    phone: '1111111',
    email: 'admin@mail.com',
    password: 'admin123',
    role: 'admin',
    avatar: {
      avatarUrl: 'https://i.imgur.com/5mPmJYO.jpeg',
    },
  },
]
