import { Box, Card, CardMedia, Container, Typography } from '@mui/material';
import { useCurrentProfile } from '../hooks/useCurrentProfile'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue';

function ProfilePage() {
    const { currentProfile, loading, error } = useCurrentProfile()

    return (
        <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(219, 218, 221 )' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '70px' }}>
                <Card sx={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #e0e0e0', width: '320px' }}>
                    {loading && (<p>Loading...</p>)}
                    {error && (<p>Sorry, something went wrong!</p>)}
                    {!error && !loading && currentProfile && (
                        <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <BoxLineBlue />
                            <Typography sx={{ marginBottom: '15px' }}>
                                YOUR PROFILE
                            </Typography>
                            <CardMedia
                                sx={{ height: 100, width: 100, borderRadius: '1000px', margin: '10px 25% 10px 25%', marginBottom: '15px' }}
                                image={`${currentProfile.avatar?.avatarUrl}`}
                                title='profile-image'
                            />
                            <Typography sx={{ color: 'GrayText', marginBottom: '15px' }}>Name: <span style={{ color: 'black' }}>{currentProfile.firstName}</span></Typography>
                            <Typography sx={{ color: 'GrayText', marginBottom: '15px' }}>Email: <span style={{ color: 'black' }}>{currentProfile.email}</span></Typography>
                            <Typography sx={{ color: 'GrayText', marginBottom: '15px' }}>Role: <span style={{ color: 'black' }}>{currentProfile.role}</span></Typography>
                        </Container>
                    )}
                </Card>
            </Box>
        </Box>
    )
}

export default ProfilePage;
