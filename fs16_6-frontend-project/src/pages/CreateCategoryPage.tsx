import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'sonner'
import { Container, Typography, Grid, Box, TextField, Card } from '@mui/material'

import { CreateCategory, } from '../types/Product'
import { createCategoryAsync } from '../redux/reducers/categoryReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialValues: CreateCategory = {
    name: '', categoryImage: { categoryImageUrl: '' }
}

const validationSchema = yup.object().shape({
    name: yup.string().min(3).max(12).required(),

});


function CreateCategoryPage() {
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
                            CREATE A CATEGORY
                        </Typography>
                        <Formik
                            validateOnChange={false}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values: CreateCategory, { setSubmitting }) => {
                                try {
                                    const result = await dispatch(createCategoryAsync({
                                        name: values.name,
                                        categoryImage: { categoryImageUrl: values.categoryImage.categoryImageUrl }
                                    }))
                                    if (createCategoryAsync.fulfilled.match(result)) {
                                        toast.success(`You have been created, ${values.name} category!`)
                                        setTimeout(() => {
                                            navigate('/');
                                        }, 2000)
                                    }

                                } catch (error) {
                                    toast.error(`Hey ${values.name}! Something went wrong, category not created`)
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
                                                name='name'
                                                label='Name'
                                                size='small'
                                                value={values.name}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.name}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='categoryImage.categoryImageUrl'
                                                label='category image'
                                                size='small'
                                                value={values.categoryImage.categoryImageUrl}
                                                onChange={handleChange}
                                            // helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.avatar}</span>}
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
                                                Create
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

export default CreateCategoryPage