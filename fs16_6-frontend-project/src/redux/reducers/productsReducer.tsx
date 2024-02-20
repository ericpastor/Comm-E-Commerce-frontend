import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { authenticateUserAsync } from './loginReducer';

import {
  CreateProduct,
  PaginationProducts,
  Product,
  ProductById,
  ProductId,
  ProductState,
  UpdateProduct,
} from '../../types/Product'

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
}

export const getAllProductsAsync = createAsyncThunk<Product[], PaginationProducts, { rejectValue: string }>(
  'getAllProductsAsync',
  async ({ limit, offset }: PaginationProducts, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://comm2024.azurewebsites.net/api/v1/products?offset=${offset}&limit=${limit}`
      )
      const data: Product[] = await result.data
      return data
    } catch (e) {
      const error = e as Error
      return rejectWithValue(error.message)
    }
  }
)

export const getProductByIdAsync = createAsyncThunk(
  'getProductByIdAsync',
  async ({ id }: ProductById) => {
    try {
      const result = await axios.get(
        `https://comm2024.azurewebsites.net/api/v1/products/${id}`
      )
      const data: Product = await result.data
      return data
    } catch (e) {
      const error = e as AxiosError
      throw new Error(error.message)
    }
  }
)

export const createProductAsync = createAsyncThunk(
  'createProductAsync',
  async (newProduct: CreateProduct, { dispatch }) => {
    try {
      const token = localStorage.getItem('data');
      if (!token) {
        throw new Error('No hay token disponible');
      }

      const result = await axios.post('https://comm2024.azurewebsites.net/api/v1/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const createdProduct = result.data;

      await dispatch(authenticateUserAsync(token));

      return createdProduct;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
);


export const updateProductAsync = createAsyncThunk(
  'updateProductAsync',
  async (input: UpdateProduct): Promise<Product> => {
    try {
      const token = localStorage.getItem('data');
      if (!token) {
        throw new Error('No hay token disponible');
      }

      const result = await axios.patch(
        `https://comm2024.azurewebsites.net/api/v1/products/${input.id}`,
        input.update,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProduct = result.data;
      return updatedProduct;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
);


export const deleteProductAsync = createAsyncThunk(
  'deleteProductAsync',
  async (id: ProductId) => {
    try {
      const token = localStorage.getItem('data');
      if (!token) {
        throw new Error('No hay token disponible');
      }
      const result = await axios.delete<boolean>(`https://comm2024.azurewebsites.net/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.data) {
        throw new Error('Cannot delete')
      }
      return id
    }
    catch (e) {
      const error = e as Error
      return error.message
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
      action.payload === 'asc'
        ? state.products.sort((a, b) => a.price - b.price)
        : state.products.sort((a, b) => b.price - a.price)
    },
    removeProduct: (state, action: PayloadAction<ProductId>) => {
      return {
        products: state.products.filter((p) => p.id !== action.payload),
        loading: false,
        error: null,
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        const newProducts = action.payload
        const prevProducts = state.products

        if (!(action.payload instanceof Error)) {
          return {
            ...state,
            products: prevProducts.concat(newProducts),
            loading: false,
            error: null,
          }
        }
      })
      .addCase(getAllProductsAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        return {
          ...state,
          products: state.products.map(p =>
            p.id === action.payload.id ? action.payload : p
          ),
          loading: false,
          error: null,
        };
      })
      .addCase(getProductByIdAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            error: action.payload.message,
          }
        }
      })

      .addCase(createProductAsync.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          state.products.push(action.payload)
        }
      })
      .addCase(createProductAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        }
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          }
        }
      })

      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const updatedProducts = state.products.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );

        return {
          ...state,
          products: updatedProducts,
          loading: false,
          error: null,
        };
      })


      .addCase(updateProductAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        }
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          }
        }
      })

      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.products = state.products.filter(p => p.id !== action.payload)
        }
      })

      .addCase(deleteProductAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message
          }
        }
      })
  },
})

const productReducer = productsSlice.reducer
export const { sortByPrice, removeProduct } =
  productsSlice.actions
export default productReducer


