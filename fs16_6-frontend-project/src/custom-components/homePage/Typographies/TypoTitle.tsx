import { Typography, styled } from '@mui/material'

const TypoTitle = styled(Typography)(
    ({ theme }) => ({
        padding: '20px',
        transition: '0.5',
        borderBottom: '3px solid #1c2235',
        backgroundColor: 'rgba(219, 218, 219, 0.2)',
    })
)

export default TypoTitle