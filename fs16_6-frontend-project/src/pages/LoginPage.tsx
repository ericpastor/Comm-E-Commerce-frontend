import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { Container, Typography, Grid, Box, TextField, Card, Divider } from '@mui/material'
import * as yup from 'yup'
import { toast } from 'sonner'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { Login } from '../types/Login'
import { loginUserAsync } from '../redux/reducers/loginReducer'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue'


const initialValues: Login = {
    email: '', password: ''
}

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required('Password is required')
})

function LoginPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(219, 218, 221 )' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '70px' }}>
                <Card sx={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #e0e0e0', width: '320px' }}>
                    <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
                        <BoxLineBlue />
                        <Typography
                            align='center'
                            variant='h6'
                            style={{ lineHeight: 1.25, marginBottom: 16 }}
                        >
                            LOGIN
                        </Typography>
                        <Formik
                            validateOnChange={false}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values: Login, { setSubmitting }) => {
                                try {
                                    const result = await dispatch(loginUserAsync({
                                        email: values.email,
                                        password: values.password,
                                    }))
                                    if (loginUserAsync.fulfilled.match(result)) {
                                        const profile = result.payload
                                        toast.success(`Hi, ${profile.firstName}`)
                                    } else {
                                        toast.error('Something went wrong, credentials do not match');
                                    }
                                } catch (error) {
                                    toast.error('Something went wrong, please try again later')
                                } finally {
                                    navigate('/')
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='email'
                                                label='email'
                                                size='small'
                                                value={values.email}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.email}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='password'
                                                label='Password'
                                                size='small'
                                                value={values.password}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.password}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ButtonSort
                                                type='submit'
                                                size='large'
                                                color='primary'
                                                disabled={isSubmitting}
                                                sx={{
                                                    width: '100%',
                                                    marginTop: 2,
                                                }}
                                            >
                                                LOGIN
                                            </ButtonSort>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                        <Divider sx={{ width: '80%', margin: '20px 0 20px 0' }}></Divider>
                        <Typography sx={{ marginBottom: '10px', fontSize: '12px' }}>Not registered yet?</Typography>
                        <ButtonSort onClick={() => navigate('/register')}>Register</ButtonSort>
                    </Container>
                </Card>
            </Box>
        </Box>
    )
}

export default LoginPage