import { Button, styled } from '@mui/material'

const ButtonImage = styled(Button)(
    ({ theme }) => (
        {
            cursor: 'pointer',
            padding: '8px 24px',
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '30px',
            border: '2px solid #fff',
            transition: '.6s ease',
            textSizeAdjust: 'auto',
            textTransform: 'none',
            fontSize: '15px',
            marginTop: '35px',
            '&:hover': {
                backgroundColor: '#fff',
                color: '#1c2235'
            }
        }
    )
)

export default ButtonImage