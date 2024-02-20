import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { productsData } from '../data/productsData'
import { CreateProduct, Product } from '../../types/Product'
import { categoriesData } from '../data/categoriesData'

export const handlers = [
  rest.delete(
    'https://api.escuelajs.co/api/v1/products/:id',
    (req, res, ctx) => {
      const { id } = req.params
      if (productsData.find((p) => p.id === String(id))) {
        return res(ctx.json(true))
      } else {
        return res(ctx.json(false))
      }
    }
  ),
  rest.post(
    'https://api.escuelajs.co/api/v1/products',
    async (req, res, ctx) => {
      const data = req.bodyUsed
    }
  ),
  rest.get('https://api.escuelajs.co/api/v1/products/:id', (req, res, ctx) => {
    const { id } = req.params
    if (productsData.find((p) => p.id === String(id)))
      return res(ctx.json(req.bodyUsed))
  }),

  rest.post(
    'https://api.escuelajs.co/api/v1/products/',
    async (req, res, ctx) => {
      const input: CreateProduct = await req.json()
      const category = categoriesData.find((c) => c.id === input.categoryId)
      if (category) {
        const newProduct: Product = {
          id: productsData.length + 1,
          images: input.images,
          title: input.title,
          description: input.description,
          category,
          price: input.price,
        }
        return res(ctx.json(newProduct))
      } else {
        ctx.status(400)
        ctx.json({
          message: [
            'price must be a positive number',
            'images must contain at least 1 elements',
            'each value in images must be a URL address',
            'images must be an array',
          ],
          error: 'Bad Request',
          statusCode: 400,
        })
      }
    }
  ),

  rest.put(
    'https://api.escuelajs.co/api/v1/products/:id',
    async (req, res, ctx) => {
      const update = await req.json()
      const { id } = req.params
      const index = productsData.findIndex((p) => p.id === String(id))
      try {
        if (index > -1) {
          return res(
            ctx.json({
              ...productsData[index],
              ...update,
            })
          )
        } else {
          ctx.status(400)
          return res(
            ctx.json({
              message: [
                'price must be a positive number',
                'images must contain at least 1 elements',
                'each value in images must be a URL address',
                'images must be an array',
              ],
              error: 'Bad Request',
              statusCode: 400,
            })
          )
        }
      } catch (e) {}
    }
  ),
  rest.get('https://api.escuelajs.co/api/v1/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesData))
  }),
]
const server = setupServer(...handlers)
export default server
