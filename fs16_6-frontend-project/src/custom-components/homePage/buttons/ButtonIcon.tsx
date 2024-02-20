import { Button, styled } from '@mui/material'

const ButtonIcon = styled(Button)(
    ({ theme }) => (
        {
            cursor: 'pointer',
            padding: '8px 48px',
            backgroundColor: 'transparent',
            color: '#1c2235',
            borderRadius: '30px',
            border: '2px solid #fff',
            transition: '.6s ease',
            textSizeAdjust: 'auto',
            textTransform: 'none',
            fontSize: '15px',
            '&:hover': {
                backgroundColor: 'rgba(219, 218, 219, 0.5)'
            }
        }
    )
)

export default ButtonIcon