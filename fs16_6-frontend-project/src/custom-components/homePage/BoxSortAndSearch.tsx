import { Box, styled } from '@mui/material'

const BoxSortAndSearch = styled(Box)(
    ({ theme }) => (
        {
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '20px',
            marginBottom: '10px',
            alignItems: 'center',
            borderRadius: '4px',
            padding: '1em 0',
            width: '98%',
            backgroundColor: '#1c2235',
            transition: ' 0.5s ease',
        }
    )
)

export default BoxSortAndSearch