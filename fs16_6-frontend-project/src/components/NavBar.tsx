import { AppBar, Badge, Box, Button, Container, IconButton, Menu, Toolbar, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import StoreIcon from '@mui/icons-material/Store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import { useState } from 'react'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import CartModal from '../pages/CartModal'
import { logout } from '../redux/reducers/loginReducer'
import { useCurrentProfile } from '../hooks/useCurrentProfile'

const pages = ['Home', 'Login', 'Register', 'Create New Product', 'Profile', 'Create a Category', 'Customers List', 'Orders List', 'Logout']

function NavBar() {
    const cart = useAppSelector(state => state.cart)
    const { currentProfile, token } = useCurrentProfile()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
        toast.success(`Bye! See you soon!`)
    }

    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: '#fff', height: '4em' }}>
                <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Toolbar disableGutters>
                        <Typography
                            variant='h6'
                            noWrap
                            component={Link}
                            to='/'
                            sx={{
                                mr: 1,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                fontFamily: 'Black Ops One',
                                color: ' #1c2235',
                                textDecoration: 'none',
                            }}
                        >
                            COMM
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleOpenNavMenu}
                                color='info'
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <Button
                                    key={pages[0]}
                                    component={Link}
                                    to='/'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: 'block', textTransform: 'none' }}
                                >
                                    {pages[0]}
                                </Button>

                                {token ? (
                                    <Button
                                        key={pages[8]}
                                        component={Link}
                                        to='/'
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            handleLogout();
                                        }}
                                        sx={{
                                            my: 2,
                                            color: '#0f0f0f',
                                            display: `${token ? 'block' : 'none'}`,
                                            textTransform: 'none',
                                        }}
                                    >
                                        {pages[8]}
                                    </Button>
                                ) : (
                                    <Button
                                        key={pages[1]}
                                        component={Link}
                                        to='/login'
                                        onClick={() => {
                                            handleCloseNavMenu();
                                        }}
                                        sx={{ my: 2, color: '#0f0f0f', textTransform: 'none' }}
                                    >
                                        {pages[1]}
                                    </Button>
                                )}

                                <Button
                                    key={pages[2]}
                                    component={Link}
                                    to='/register'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token ? 'none' : 'block'}`, textTransform: 'none' }}
                                >
                                    {pages[2]}
                                </Button>

                                <Button
                                    key={pages[4]}
                                    component={Link}
                                    to='/profile'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[4]}
                                </Button>

                                <Button
                                    key={pages[3]}
                                    component={Link}
                                    to='/create-product'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[3]}
                                </Button>
                                <Button
                                    key={pages[5]}
                                    component={Link}
                                    to='/create-category'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[5]}
                                </Button>
                                <Button
                                    key={pages[6]}
                                    component={Link}
                                    to='/customers-list'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[6]}
                                </Button>
                                <Button
                                    key={pages[7]}
                                    component={Link}
                                    to='/orders-list'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[7]}
                                </Button>
                            </Menu>

                        </Box>
                        <StoreIcon sx={{ display: { xs: 'flex', md: 'none', color: 'rgb(228, 135, 29)' }, mr: 1 }} />
                        <Typography
                            variant='h6'
                            noWrap
                            component={Link}
                            to='/'
                            sx={{
                                mr: 1,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                fontFamily: 'Black Ops One',
                                color: ' #1c2235',
                                textDecoration: 'none',
                            }}
                        >
                            COMM
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <>
                                <Button
                                    key={pages[0]}
                                    component={Link}
                                    to='/'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: 'block', textTransform: 'none', textDecorationThickness: '3em' }}
                                >
                                    {pages[0]}
                                </Button>
                                {token
                                    ? <Button
                                        key={pages[8]}
                                        component={Link}
                                        to='/'
                                        onClick={() => { handleCloseNavMenu(); handleLogout() }}
                                        sx={{ my: 2, color: '#0f0f0f', display: `${token ? 'block' : 'none'}`, textTransform: 'none' }}
                                    >
                                        {pages[8]}
                                    </Button>
                                    : <Button
                                        key={pages[1]}
                                        component={Link}
                                        to='/login'
                                        onClick={() => { handleCloseNavMenu() }}
                                        sx={{ my: 2, color: '#0f0f0f', textTransform: 'none' }}
                                    >
                                        {pages[1]}
                                    </Button>
                                }
                                <Button
                                    key={pages[2]}
                                    component={Link}
                                    to='/register'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token ? 'none' : 'block'}`, textTransform: 'none' }}
                                >
                                    {pages[2]}
                                </Button>
                                <Button
                                    key={pages[4]}
                                    component={Link}
                                    to='/profile'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[4]}
                                </Button>

                                <Button
                                    key={pages[3]}
                                    component={Link}
                                    to='/create-product'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[3]}
                                </Button>
                                <Button
                                    key={pages[5]}
                                    component={Link}
                                    to='/create-category'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[5]}
                                </Button>
                                <Button
                                    key={pages[6]}
                                    component={Link}
                                    to='/customers-list'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[6]}
                                </Button>
                                <Button
                                    key={pages[7]}
                                    component={Link}
                                    to='/orders-list'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#0f0f0f', display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}`, textTransform: 'none' }}
                                >
                                    {pages[7]}
                                </Button>
                            </>
                        </Box>
                    </Toolbar>

                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Typography sx={{ color: '#1c2235', marginRight: '30px', display: `${token && currentProfile?.firstName ? `block` : 'none'}` }}>Hello, {token && currentProfile?.firstName}! </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginBottom: '10px', display: `${token && currentProfile?.firstName ? `block` : 'none'}` }}>
                                <Badge badgeContent={cart?.length} color='warning'>
                                    <ShoppingCartIcon sx={{ color: '#1c2235', height: '1.2em', width: '1.2em', zIndex: 9999 }} />
                                </Badge>
                            </IconButton>

                        </Tooltip>
                        <Menu
                            sx={{
                                mt: '45px', padding: '10px',
                            }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <CartModal />
                        </Menu>
                    </Box>

                </Container >
            </AppBar >
            <Toaster richColors />
        </>
    )
}

export default NavBar