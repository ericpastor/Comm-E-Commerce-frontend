export type ProductId = string | undefined

export interface ProductById {
  id?: string | undefined
}

export interface UpdateProductDto {
  title?: string
  price?: number
  description?: string
  categoryId?: CategoryId
  images?: Image[]
}

export interface UpdateProduct {
  id: ProductId
  update: UpdateProductDto
}

export type CategoryId = string | undefined

export interface CategoryImage {
  id?: string
  file?: File | null | undefined
  categoryImageUrl: string
}

export interface Category {
  id: string
  name?: string
  categoryImage?: CategoryImage
}

export interface CreateCategory {
  name: string
  categoryImage: CategoryImage
}
export interface CategoryState {
  categories: Category[]
  loading: boolean
  error: string | null
}

export interface CategoryById extends Category {}

export interface Product {
  id?: ProductId
  title: string
  price: number
  description: string
  category: Category | CategoryById | string
  images: Image[]
}

export interface CreateProduct {
  title: string
  price: number
  description: string
  categoryId: string
  images: Image[]
}

export interface Image {
  id?: string
  productId?: string
  file?: File | null | undefined
  imageUrl: string
}

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null | undefined
}

export interface PaginationProducts {
  offset: number
  limit: number
}
