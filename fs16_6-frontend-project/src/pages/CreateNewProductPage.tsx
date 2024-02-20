import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'sonner'
import { Container, Typography, Grid, Box, TextField, Card, MenuItem } from '@mui/material'

import { CreateProduct } from '../types/Product'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { createProductAsync } from '../redux/reducers/productsReducer'
import { useAppSelector } from '../hooks/useAppSelector'
import { getAllCategoriesAsync } from '../redux/reducers/categoryReducer'
import { useEffect } from 'react'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue'

const initialValues: CreateProduct = {
    title: '', price: 0, description: '', categoryId: '', images: [{ imageUrl: '' }, { imageUrl: '' }, { imageUrl: '' }]
}

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    price: yup.number().min(1).required(),
    description: yup.string().required(),
})

function CreateNewProductPage() {
    const { categories } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getAllCategoriesAsync())
    }, [dispatch])

    const visibleCategories = categories.slice(0, 10);


    return (
        <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(219, 218, 221 )' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
                <Card sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', padding: '16px', width: '420px' }}>
                    <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <BoxLineBlue />

                        <Typography sx={{ marginBottom: '20px' }}>CREATE A PRODUCT</Typography>
                        <Formik
                            validateOnChange={false}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values: CreateProduct, { setSubmitting }) => {
                                try {
                                    await dispatch(createProductAsync({
                                        title: values.title,
                                        price: values.price,
                                        description: values.description,
                                        categoryId: values.categoryId,
                                        images: [
                                            { imageUrl: values.images[0].imageUrl },
                                            { imageUrl: values.images[1].imageUrl },
                                            { imageUrl: values.images[2].imageUrl }
                                        ] || values.images
                                    }))
                                    toast.success(`Product: ${values.title} created`)
                                } catch (error) {
                                    toast.error(`Something went wrong! Product: ${values.title} not created`)
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
                                                name='title'
                                                label='Title'
                                                size='small'
                                                value={values.title}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.title}</span>}
                                                sx={{ width: '100%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='price'
                                                label='Price'
                                                size='small'
                                                value={values.price}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.price}</span>}
                                                sx={{ width: '100%' }}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='description'
                                                label='description'
                                                size='small'
                                                value={values.description}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.description}</span>}
                                                sx={{ width: '100%' }}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="category"
                                                select
                                                label="Category"
                                                value={values.categoryId}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    handleChange({ target: { name: 'categoryId', value: newValue } })
                                                }}
                                                helperText="Choose your category"
                                                sx={{ width: '100%' }}
                                            >
                                                {visibleCategories && visibleCategories.map((c) => (
                                                    <MenuItem key={c.id} value={c.id}>
                                                        {c.id.slice(0, 2)}: {c.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                <TextField
                                                    name='images[0].imageUrl'
                                                    label='Image 1'
                                                    size='small'
                                                    value={values.images[0].imageUrl}
                                                    onChange={(e) => handleChange({ target: { name: 'images[0].imageUrl', value: e.target.value } })}
                                                    sx={{ marginBottom: '6px', width: '100%' }}
                                                />

                                                <TextField
                                                    name='images[1].imageUrl'
                                                    label='Image 2'
                                                    size='small'
                                                    value={values.images[1].imageUrl}
                                                    onChange={(e) => handleChange({ target: { name: 'images[1].imageUrl', value: e.target.value } })}
                                                    sx={{ marginBottom: '6px', width: '100%' }}
                                                />

                                                <TextField
                                                    name='images[2].imageUrl'
                                                    label='Image 3'
                                                    size='small'
                                                    value={values.images[2].imageUrl}
                                                    onChange={(e) => handleChange({ target: { name: 'images[2].imageUrl', value: e.target.value } })}
                                                    sx={{ marginBottom: '6px', width: '100%' }}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>

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

                                </Form>
                            )}
                        </Formik>
                    </Container>
                </Card>
            </Box>
        </Box>
    )
}

export default CreateNewProductPage