import { Box, styled } from '@mui/material'

const BoxCards = styled(Box)(
    ({ theme }) => (
        {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
            gap: '1px',
            margin: '0',
            width: '90%'

        }
    )
)

export default BoxCards