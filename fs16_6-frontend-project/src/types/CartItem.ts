import { Product } from './Product'

export interface CartItem extends Product {
  Quantity: number
  Product?: Product
}
