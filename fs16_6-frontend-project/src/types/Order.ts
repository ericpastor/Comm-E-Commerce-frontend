import { ProductId } from './Product'
import { Profile } from './Profile'
import { UserId } from './User'

export type Status = 'Unpaid' | 'Paid' | 'Pending' | 'Dispatch' | 'Delivered'

export type OrderId = string | undefined

export interface Order {
  Id?: OrderId
  UserId: Profile
  OrderProducts: OrderProduct[]
  Status: Status
}

interface ProdctInOrderProduct {
  Title?: string
  Price?: number
  Id: string
}

export interface OrderProduct {
  Quantity: number
  OrderId?: string
  Order?: Order
  Product: ProdctInOrderProduct
}

export interface OrderProductCreate {
  quantity: number
  productId: ProductId
}

export interface CreateOrder {
  userId: UserId
  orderProducts: OrderProductCreate[]
}

export interface OrderState {
  orders: Order[]
  currentUser?: Order
  loading: boolean
  error?: string | null | undefined
}

export interface PaginationOrders {
  offset: number
  limit: number
}
