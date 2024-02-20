import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { CreateOrder, PaginationOrders, Order, OrderId, OrderState } from '../../types/Order'
import axios, { AxiosError } from 'axios'
import { authenticateUserAsync } from './loginReducer'

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
}



export const createOrderAsync = createAsyncThunk(
    'createProductAsync',
    async (newOrder: CreateOrder, { dispatch }) => {
        try {
            const token = localStorage.getItem('data');
            if (!token) {
                throw new Error('No hay token disponible');
            }
            const result = await axios.post('https://comm2024.azurewebsites.net/api/v1/orders/customer-orders', newOrder, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (result.status === 201) {

                await dispatch(authenticateUserAsync(token));

                return result.data
            }

        }
        catch (e) {
            const error = e as AxiosError
            throw new Error(error.message)
        }
    }
)


export const getAllOrdersAsync = createAsyncThunk<Order[], PaginationOrders, { rejectValue: string }>(
    'getAllOrdersAsync',
    async ({ limit, offset }: PaginationOrders, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem('data');
            if (!token) {
                throw new Error('No hay token disponible');
            }

            const result = await axios.get(
                `https://comm2024.azurewebsites.net/api/v1/orders?offset=${offset}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data: Order[] = await result.data

            await dispatch(authenticateUserAsync(token));

            return data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)


export const deleteOrderAsync = createAsyncThunk(
    'deleteProductAsync',
    async (id: OrderId) => {
        try {
            const token = localStorage.getItem('data');
            if (!token) {
                throw new Error('No hay token disponible');
            }
            const result = await axios.delete<boolean>(`https://comm2024.azurewebsites.net/api/v1/orders/${id}`, {
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

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    state.orders.push(action.payload)
                }
            })
            .addCase(createOrderAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message,
                    }
                }
            })
            .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
                const newOrders = action.payload
                const prevOrders = state.orders

                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        orders: newOrders.concat(prevOrders),
                        loading: false,
                        error: null,
                    }
                }
            })
            .addCase(getAllOrdersAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllOrdersAsync.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(deleteOrderAsync.fulfilled, (state, action) => {
                if (typeof action.payload === 'string') {
                    state.orders = state.orders.filter(o => o.Id !== action.payload)
                }
            })

            .addCase(deleteOrderAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message
                    }
                }
            })
    }
})

const orderReducer = ordersSlice.reducer
export default orderReducer
