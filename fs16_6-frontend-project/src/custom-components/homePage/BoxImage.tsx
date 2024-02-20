import { Box, styled } from '@mui/material';

const BoxImage = styled(Box)(
    ({ theme }) => ({
        backgroundImage: 'url("https://res.cloudinary.com/deghpnzo2/image/upload/v1705646545/DSC_1240_ndckrm.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
        width: '90%',
        margin: '20px auto 20px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'left',
        fontSize: '24px',
    })
);

export default BoxImage;
