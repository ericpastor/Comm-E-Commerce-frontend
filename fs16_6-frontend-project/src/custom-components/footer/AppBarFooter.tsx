import { AppBar, styled } from '@mui/material'

const AppBarFooter = styled(AppBar)(
    ({ theme }) => ({
        position: 'static',
        backgroundColor: '#8a9597',
        color: '#fff',
        bottom: '0',

    })
);

export default AppBarFooter