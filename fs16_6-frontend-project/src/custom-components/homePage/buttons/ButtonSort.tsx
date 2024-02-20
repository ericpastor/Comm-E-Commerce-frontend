import { Button, styled } from '@mui/material'

const ButtonSort = styled(Button)(
    ({ theme }) => (
        {
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: 'rgba(219, 218, 219, 0.4)',
            transition: '.1s ease',
            textSizeAdjust: 'auto',
            fontSize: '10px',
            color: '#1c2235',
            borderRadius: '0',
            '&:hover': {
                borderBottom: '3px solid #1c2235',
                backgroundColor: 'rgba(219, 218, 219, 0.8)',
            }
        }
    )
)

export default ButtonSort