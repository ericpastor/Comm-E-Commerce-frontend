import { Typography, styled } from '@mui/material'

const TypographyFooter = styled(Typography)(
    ({ theme }) => (
        {
            color: 'white',
            fontSize: '15px',
            marginLeft: '30px',
            bottom: '0',
            marginBottom: '15px',

        }
    )
)

export default TypographyFooter