import { Box, styled } from '@mui/material';

const BoxCategory = styled(Box)(
    ({ theme }) => ({
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        color: 'white',
        textAlign: 'left',
        fontSize: '16px',
        filter: 'brightness(0.8)',
        ':hover': {
            filter: 'none',
        },

    })
);

export default BoxCategory