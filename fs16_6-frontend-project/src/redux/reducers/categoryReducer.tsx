import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Category, CategoryState, CreateCategory } from '../../types/Product'
import { authenticateUserAsync } from './loginReducer'



export const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
}

export const getAllCategoriesAsync = createAsyncThunk(
    'getAllCategoriesAsync',
    async () => {
        try {
            const result = await axios.get(
                `https://comm2024.azurewebsites.net/api/v1/categories`
            )
            const data: Category[] = await result.data
            return data
        } catch (e) {
            const error = e as AxiosError
            throw new Error(error.message)
        }
    }
)

export const createCategoryAsync = createAsyncThunk(
    'createCategoryAsync',
    async (newCategory: CreateCategory, { dispatch }) => {
        try {
            const token = localStorage.getItem('data');
            if (!token) {
                throw new Error('No hay token disponible');
            }
            const result = await axios.post('https://comm2024.azurewebsites.net/api/v1/categories', newCategory, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const createdCategory = result.data;

            await dispatch(authenticateUserAsync(token));

            return createdCategory;
        } catch (e) {
            const error = e as AxiosError;
            throw new Error(error.message);
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(getAllCategoriesAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllCategoriesAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        error: action.payload.message,
                    }
                }
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    state.categories.push(action.payload)
                }
            })
            .addCase(createCategoryAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(createCategoryAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message,
                    }
                }
            })
    },
})

const categoryReducer = categoriesSlice.reducer
export default categoryReducer
