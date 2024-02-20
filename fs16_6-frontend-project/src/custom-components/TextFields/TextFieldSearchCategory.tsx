import { TextField, styled } from '@mui/material'

const TextFieldSearchCategory = styled(TextField)(
    ({ theme }) => ({
        backgroundColor: '#333',
        borderRadius: '4px',
        '& label': {
            color: '#fff',
        },
        '& input': {
            color: '#fff',
            border: '0'
        },
        '&:hover': {
            border: '1px solid #09f',
        }
    })
)

export default TextFieldSearchCategory