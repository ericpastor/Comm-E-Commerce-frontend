import { Button, styled } from '@mui/material'

const ButtonLoad = styled(Button)(
    ({ theme }) => (
        {
            display: 'flex',
            padding: '1em 0',
            width: '98%',
            color: '#fff',
            backgroundColor: '#1c2235',
            transition: ' 0.5s ease',
            marginBottom: '60px',
            marginTop: '15px',
            '&:hover': {
                backgroundColor: 'rgb(228, 135, 29)',
                width: '90%',
                color: '#1c2235'
            }

        }
    )
)

export default ButtonLoad


















