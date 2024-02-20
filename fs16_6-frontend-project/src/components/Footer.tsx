import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Toolbar } from '@mui/material'
import { toast } from 'sonner'

import AppBarFooter from '../custom-components/footer/AppBarFooter'
import TypographyFooter from '../custom-components/footer/TypographyFooter '
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useCurrentProfile } from '../hooks/useCurrentProfile'
import { logout } from '../redux/reducers/loginReducer'


function Footer() {
    const { currentProfile, token } = useCurrentProfile()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
        toast.success(`Bye! See you soon!`)
    }

    return (
        <AppBarFooter elevation={3}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <TypographyFooter>
                        &copy; {new Date().getFullYear()} COMM
                    </TypographyFooter>
                </Box>
                <Box sx={{ display: 'flex', gap: '0px', alignItems: 'flex-end' }}>
                    <Button
                        sx={{ my: 3, color: 'white', display: 'block', textTransform: 'none', fontSize: '15px', marginLeft: 'auto' }}
                        component={Link}
                        to='/'>
                        Home
                    </Button>
                    <Button
                        sx={{ my: 3, color: 'white', display: `${token ? 'none' : 'block'}`, textTransform: 'none', fontSize: '15px', marginLeft: 'auto' }}
                        component={Link}
                        to='/login'>
                        Login
                    </Button>
                    <Button
                        sx={{ my: 3, color: 'white', display: `${token ? 'block' : 'none'}`, textTransform: 'none', fontSize: '15px', marginLeft: 'auto' }}
                        component={Link}
                        to='/'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <Button
                        sx={{ my: 3, color: 'white', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none', fontSize: '15px', marginLeft: 'auto' }}
                        component={Link}
                        to='/create-product'>
                        Create New Product
                    </Button>
                    <Button
                        sx={{ my: 3, color: 'white', display: `${token ? 'none' : 'block'}`, textTransform: 'none', fontSize: '15px', marginLeft: 'auto' }}
                        component={Link}
                        to='/register'>
                        Register
                    </Button>
                </Box>
            </Toolbar>
        </AppBarFooter>
    )
}

export default Footer
