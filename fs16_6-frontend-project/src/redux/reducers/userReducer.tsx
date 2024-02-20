import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { CreateUser, PaginationUsers, User, UserId, UserState } from '../../types/User'
import axios, { AxiosError } from 'axios'
import { authenticateUserAsync } from './loginReducer'

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
}



export const createUserAsync = createAsyncThunk(
    'createProductAsync',
    async (newUser: CreateUser) => {
        try {
            const result = await axios.post('https://comm2024.azurewebsites.net/api/v1/users/register', newUser)
            if (result.status === 201) {
                return result.data
            }

        }
        catch (e) {
            const error = e as AxiosError
            throw new Error(error.message)
        }
    }
)


export const getAllUsersAsync = createAsyncThunk<User[], PaginationUsers, { rejectValue: string }>(
    'getAllProductsAsync',
    async ({ limit, offset }: PaginationUsers, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem('data');
            if (!token) {
                throw new Error('No hay token disponible');
            }

            const result = await axios.get(
                `https://comm2024.azurewebsites.net/api/v1/users?offset=${offset}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data: User[] = await result.data

            await dispatch(authenticateUserAsync(token));

            return data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)


export const deleteUserAsync = createAsyncThunk(
    'deleteProductAsync',
    async (id: UserId) => {
        try {
            const token = localStorage.getItem('data');
            if (!token) {
                throw new Error('No hay token disponible');
            }
            const result = await axios.delete<boolean>(`https://comm2024.azurewebsites.net/api/v1/users/${id}`, {
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

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    state.users.push(action.payload)
                }
            })
            .addCase(createUserAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message,
                    }
                }
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                const newUsers = action.payload
                const prevUsers = state.users

                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        users: prevUsers.concat(newUsers),
                        loading: false,
                        error: null,
                    }
                }
            })
            .addCase(getAllUsersAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllUsersAsync.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                if (typeof action.payload === 'string') {
                    state.users = state.users.filter(p => p.id !== action.payload)
                }
            })

            .addCase(deleteUserAsync.rejected, (state, action) => {
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

const userReducer = usersSlice.reducer
export default userReducer
