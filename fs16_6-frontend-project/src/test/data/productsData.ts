import { Product } from '../../types/Product'

export const productsData: Product[] = [
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
      id: '2222',
      name: 'Electronics',
      categoryImage: {
        categoryImageUrl: 'https://i.imgur.com/00qWleT.jpeg',
      },
    },
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
      id: '55555',
      name: 'Others',
      categoryImage: {
        categoryImageUrl: 'https://i.imgur.com/00qWleT.jpeg',
      },
    },
  },
  {
    id: '3333-3333-3333333',

    title: 'Gorgeous Soft Hat',
    price: 635,
    description:
      'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    images: [
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
      { imageUrl: 'https://picsum.photos/640/640?r=1875' },
    ],
    category: {
      id: '1111',
      name: 'Clothes',
      categoryImage: {
        categoryImageUrl: 'https://i.imgur.com/00qWleT.jpeg',
      },
    },
  },
]
