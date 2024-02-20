import { CartItem } from '../../types/CartItem'

export const cartData: CartItem[] = [
  {
    id: '3333-3333-3333333',
    title: 'nuevo title',
    price: 987,
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    images: [
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
    ],
    category: {
      id: '222',
      name: 'Electronics',
      categoryImage: {
        categoryImageUrl: 'https://i.imgur.com/00qWleT.jpeg',
      },
    },
    Quantity: 1,
  },
  {
    id: '3333-3333-3333333',
    title: 'Bespoke Wooden Shirt',
    price: 551,
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    images: [
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
    ],

    category: {
      id: '5555555',
      name: 'Others',
      categoryImage: {
        categoryImageUrl: 'https://i.imgur.com/00qWleT.jpeg',
      },
    },
    Quantity: 2,
  },
]
