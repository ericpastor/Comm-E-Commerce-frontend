import { useEffect } from 'react'

import { useAppDispatch } from './useAppDispatch'
import { authenticateUserAsync } from '../redux/reducers/loginReducer'
import { useAppSelector } from './useAppSelector'

export const useCurrentProfile = () => {
    const { currentProfile, loading, error } = useAppSelector(state => state.login)

    const dispatch = useAppDispatch()

    const token = localStorage.getItem('data')

    useEffect(() => {
        if (token)
            dispatch(authenticateUserAsync(token))
    }, [dispatch, token])

    return { currentProfile, loading, error, token }

}


