import { useNavigate } from 'react-router-dom'
import { FieldArray, Form, Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'sonner'
import { Container, Typography, Grid, Box, TextField, Card } from '@mui/material'

import { CreateUser, Address } from '../types/User'
import { createUserAsync } from '../redux/reducers/userReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ButtonIcon from '../custom-components/homePage/buttons/ButtonIcon'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddHomeIcon from '@mui/icons-material/AddHome';


const initialValues: CreateUser = {
    firstName: '', lastName: '', email: '', phone: '', addresses: [{ houseNumber: 0, street: '', postCode: '' }], avatar: { avatarUrl: '' }, password: ''
}

const validationSchema = yup.object().shape({
    firstName: yup.string().min(3).max(12).required(),
    lastName: yup.string().min(3).max(12).required(),
    phone: yup.string().min(6).max(30).required(),
    email: yup.string().email().required(),
    addresses: yup.array().of(
        yup.object().shape({
            houseNumber: yup.mixed().required('House number is required'),
            street: yup.string().required('Street is required'),
            postCode: yup.string().required('Post code is required'),
        })
    ),
    password: yup.string().min(5, 'At least 5 charaters, please!').max(200, 'No more than 200 characters, please!').required(),
});


function RegisterPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    return (
        <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(219, 218, 221 )' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '70px' }}>
                <Card sx={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #e0e0e0', width: '500px' }}>
                    <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
                        <BoxLineBlue />
                        <Typography
                            align='center'
                            variant='h6'
                            style={{ lineHeight: 1.25, marginBottom: 16 }}
                        >
                            REGISTER
                        </Typography>
                        <Formik
                            validateOnChange={false}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values: CreateUser, { setSubmitting }) => {
                                try {
                                    const result = await dispatch(createUserAsync({
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        phone: values.phone,
                                        email: values.email,
                                        addresses: values.addresses,
                                        password: values.password,
                                        avatar: { avatarUrl: values.avatar.avatarUrl },
                                    }))
                                    if (createUserAsync.fulfilled.match(result)) {
                                        toast.success(`You have been registered, ${values.firstName}. Login!`)
                                        setTimeout(() => {
                                            navigate('/login');
                                        }, 2000)
                                    }

                                } catch (error) {
                                    toast.error(`Hey ${values.firstName}! Something went wrong, User not registered`)
                                } finally {
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='firstName'
                                                label='FirstName'
                                                size='small'
                                                value={values.firstName}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.firstName}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='lastName'
                                                label='LastName'
                                                size='small'
                                                value={values.lastName}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.lastName}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='phone'
                                                label='Phone'
                                                size='small'
                                                value={values.phone}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.phone}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FieldArray name='addresses'>
                                                {({ push, remove, form }) => (
                                                    <div>
                                                        {form.values.addresses?.map((address: Address, index: number) => (
                                                            <div key={index}>
                                                                <Typography variant="subtitle1" gutterBottom>
                                                                    Address {index + 1}
                                                                </Typography>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            name={`addresses[${index}].houseNumber`}
                                                                            label="House Number"
                                                                            size="small"
                                                                            value={address.houseNumber.toString()}
                                                                            onChange={form.handleChange}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            name={`addresses[${index}].street`}
                                                                            label="Street"
                                                                            size="small"
                                                                            value={address.street}
                                                                            onChange={form.handleChange}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            name={`addresses[${index}].postCode`}
                                                                            label="Post Code"
                                                                            size="small"
                                                                            value={address.postCode}
                                                                            onChange={form.handleChange}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <ButtonIcon
                                                                    type='button'
                                                                    onClick={() => remove(index)}
                                                                    sx={{ padding: '2px' }}
                                                                >
                                                                    <DeleteForeverIcon />
                                                                </ButtonIcon>
                                                            </div>
                                                        ))}
                                                        <ButtonIcon
                                                            type='button'
                                                            onClick={() => push({ houseNumber: 0, street: '', postCode: '' })}
                                                        >
                                                            <AddHomeIcon />
                                                        </ButtonIcon>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </Grid>


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
                                            <TextField
                                                name='avatar.avatarUrl'
                                                label='Avatar'
                                                size='small'
                                                value={values.avatar.avatarUrl}
                                                onChange={handleChange}
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
                                                REGISTER
                                            </ButtonSort>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Container>
                </Card>
            </Box>
        </Box>
    )
}

export default RegisterPage