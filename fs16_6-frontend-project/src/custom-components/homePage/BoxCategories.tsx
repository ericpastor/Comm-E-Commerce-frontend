import { Box, styled } from '@mui/material'

const BoxCategories = styled(Box)(
    ({ theme }) => (
        {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            alignItems: 'center',
            gap: '4px',
            margin: '0 auto',
            width: '90%'

        }
    )
)

export default BoxCategories