import { useNavigate, useParams } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { toast } from 'sonner'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Box, Card, CardActions, CardContent, Container, Grid, ImageList, ImageListItem, MenuItem, TextField, Typography } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { deleteProductAsync, getProductByIdAsync, updateProductAsync } from '../redux/reducers/productsReducer'
import { Product, ProductId, UpdateProduct } from '../types/Product'
import BoxCards from '../custom-components/homePage/BoxCards'
import { transformPrice } from '../utils/transFormPrice'
import ButtonIcon from '../custom-components/homePage/buttons/ButtonIcon'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'
import { getAllCategoriesAsync } from '../redux/reducers/categoryReducer'
import { addToCart, removeFromCart } from '../redux/reducers/cartReducer'
import { useCurrentProfile } from '../hooks/useCurrentProfile'

function ProductPage() {
    const [productUpdated, setProductUpdated] = useState<Product>()
    const { products } = useAppSelector(state => state.products)
    const cart = useAppSelector(state => state.cart)
    const { currentProfile, token } = useCurrentProfile()
    const { categories } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const id = String(useParams().id)

    const infoProduct = products.find((p) => p.id === id)

    const isProductsInCart = (product: string | undefined) => {
        return cart.some(item => item.id === product)
    }

    useEffect(() => {
        if (!infoProduct || productUpdated?.id !== id) {
            dispatch(getProductByIdAsync({ id }));
        }
        setProductUpdated(infoProduct);
        dispatch(getAllCategoriesAsync());
    }, [id, infoProduct, productUpdated, dispatch]);

    if (!infoProduct) {
        return (
            <Box>
                <Typography>
                    Sorry, but we didn't find this product at this moment! Try again!
                </Typography>
            </Box>
        )
    }

    const validationSchema = yup.object().shape({
        title: yup.string().notRequired().optional(),
        price: yup.number().min(1).notRequired(),
        description: yup.string().notRequired()
    })

    const handleDelete = (id: ProductId) => {
        try {
            dispatch(deleteProductAsync(id))
            toast.success(`Deleted!`)
        } catch (error) {
            toast.error('Something went wrong, product not deleted')
        } finally {
            return products
        }
    }

    const visibleCategories = categories.slice(0, 10);

    return (
        <Box sx={{ backgroundColor: 'rgba(219, 218, 221 )', minHeight: '100vh', padding: '50px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto auto 0px -8px' }}>
                <BoxCards >
                    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px auto' }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', padding: '16px', width: '370px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                {productUpdated &&
                                    <CardContent sx={{ flex: '1 0 auto', width: '90%', height: '60px', alignItems: 'center', marginBottom: '12px' }}>
                                        <Typography component='div' variant='h5' sx={{ borderBottom: '1px solid', marginBottom: '20px', width: '80%' }}>
                                            {productUpdated.title}
                                        </Typography>
                                    </CardContent>}
                                {productUpdated && productUpdated.images && (
                                    <ImageList
                                        sx={{ width: 445, height: 122 }}
                                        variant='quilted'
                                        cols={4}
                                        rowHeight={121}
                                    >
                                        {productUpdated.images.map((image, index) => (
                                            <ImageListItem key={index} cols={1} rows={1} >
                                                <img
                                                    src={image.imageUrl || ''}
                                                    alt={`Image ${index}`}
                                                    loading='lazy'
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                )}

                                {productUpdated &&
                                    <CardContent sx={{ flex: '1 0 auto', width: '90%', alignItems: 'center', marginTop: '0' }}>
                                        <Typography variant='subtitle1' color='text.secondary' component='div' sx={{ fontSize: '14px' }}>
                                            <div style={{ width: '80%' }}>
                                                <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Description:</Typography> {productUpdated.description}
                                            </div>
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'end', borderTop: '1px solid', marginTop: '20px', width: '80%' }}>
                                            <Typography variant='subtitle1' component='div' sx={{ display: 'flex', fontSize: '14px', marginRight: '40px' }}>
                                                <strong style={{ color: 'black' }}>Price:</strong>  <Typography color='text.secondary' sx={{ marginLeft: '5px', fontFamily: 'Lobster, cursive' }}>{transformPrice(productUpdated.price)}</Typography>
                                            </Typography>
                                            <Typography variant='subtitle1' color='text.secondary' component='div' sx={{ fontSize: '14px' }}>
                                                <strong style={{ color: 'black' }}>Category:</strong> {(productUpdated.category as unknown) as ReactNode}

                                            </Typography>
                                        </Box>
                                    </CardContent>
                                }
                                <CardActions>
                                    <ButtonIcon
                                        sx={{ display: `${token && currentProfile?.role ? 'block' : 'none'}` }}
                                        onClick={() =>
                                            isProductsInCart(infoProduct?.id)
                                                ? dispatch(removeFromCart(infoProduct))
                                                : dispatch(addToCart(infoProduct))
                                        }
                                    >
                                        {
                                            isProductsInCart(infoProduct?.id)
                                                ? <RemoveShoppingCartIcon sx={{ color: 'red' }} />
                                                : <AddShoppingCartIcon />
                                        }

                                    </ButtonIcon>
                                    <ButtonIcon sx={{ display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}` }} onClick={() => { handleDelete(infoProduct?.id) }}>
                                        <DeleteForeverIcon />
                                    </ButtonIcon>
                                </CardActions>
                            </Box>
                        </Card>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto 60px auto' }}>
                        <Card sx={{ display: `${token && currentProfile?.role === 'Admin' ? 'flex' : 'none'}`, alignItems: 'center', border: '1px solid #e0e0e0', padding: '16px', width: '420px' }}>
                            <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <BoxLineBlue />
                                <Typography sx={{ marginBottom: '20px' }}>UPDATE PRODUCT</Typography>

                                <Formik
                                    validateOnChange={false}
                                    initialValues={{
                                        update: {
                                            title: infoProduct?.title,
                                            price: infoProduct?.price,
                                            description: infoProduct?.description,
                                            categoryId: visibleCategories[0].id || '',
                                            images: infoProduct?.images
                                        },
                                        id: infoProduct?.id
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values: UpdateProduct, { setSubmitting }) => {
                                        try {
                                            const categoryId = values.update.categoryId || '';
                                            const updatedProduct = await dispatch(updateProductAsync(({
                                                update: {
                                                    title: values.update.title,
                                                    price: values.update.price,
                                                    description: values.update.description,
                                                    categoryId: categoryId,
                                                    images: values.update.images
                                                },
                                                id: id
                                            })))
                                            if ('payload' in updatedProduct && updateProductAsync.fulfilled.match(updatedProduct)) {
                                                setProductUpdated(updatedProduct.payload)
                                            }
                                            navigate(`/${id}`);
                                            toast.success(`Updated!`);

                                        } catch (error) {
                                            toast.error('Something went wrong, product not updated')
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
                                                        name='update.title'
                                                        label='Title'
                                                        size='small'
                                                        value={values.update.title}
                                                        onChange={handleChange}
                                                        helperText={errors.update?.title}
                                                        sx={{ width: '100%', '& input': { color: 'rgb(160, 159, 159)', ':hover': { color: 'black' }, '&:focus': { color: 'black' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        name='update.price'
                                                        label='Price'
                                                        size='small'
                                                        value={values.update.price}
                                                        onChange={handleChange}
                                                        helperText={<span className='error-helper-text'>{errors.update?.price}</span>}
                                                        sx={{ width: '100%', '& input': { color: 'rgb(160, 159, 159)', ':hover': { color: 'black' }, '&:focus': { color: 'black' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        name='update.description'
                                                        label='description'
                                                        size='small'
                                                        value={values.update.description}
                                                        onChange={handleChange}
                                                        helperText={errors.update?.description}
                                                        sx={{ width: '100%', '& input': { color: 'rgb(160, 159, 159)', ':hover': { color: 'black' }, '&:focus': { color: 'black' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="category"
                                                        name='update.categoryId'
                                                        select
                                                        label="Category"
                                                        value={values.update.categoryId || ''}
                                                        onChange={(e) => {
                                                            const newValue: string = e.target.value
                                                            handleChange({
                                                                target: { name: 'update.categoryId', value: newValue }
                                                            });
                                                        }}
                                                        helperText="Choose your category"
                                                        sx={{ width: '100%' }}

                                                    >
                                                        <MenuItem value=''>None</MenuItem>
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
                                                            name='update.images[0].imageUrl'
                                                            label='Image 1'
                                                            size='small'
                                                            value={values.update.images?.[0].imageUrl}
                                                            onChange={handleChange}
                                                            sx={{ marginBottom: '6px', width: '100%' }}
                                                        />

                                                        <TextField
                                                            name='update.images[1].imageUrl'
                                                            label='Image 2'
                                                            size='small'
                                                            value={values.update.images?.[1].imageUrl}
                                                            onChange={handleChange}
                                                            sx={{ marginBottom: '6px', width: '100%' }}
                                                        />

                                                        <TextField
                                                            name='update.images[2].imageUrl'
                                                            label='Image 3'
                                                            size='small'
                                                            value={values.update.images?.[2].imageUrl}
                                                            onChange={handleChange}
                                                            sx={{ marginBottom: '6px', width: '100%' }}
                                                        />
                                                    </div>
                                                </Grid>

                                                {/* values.update.images?.map(i => i[0]) */}
                                                <Grid item xs={12}>
                                                    <ButtonSort
                                                        type='submit'
                                                        size='large'
                                                        color='primary'
                                                        disabled={isSubmitting}
                                                        sx={{
                                                            width: '100%',
                                                            marginTop: 2, // Espacio entre campos y el botón
                                                        }}
                                                    >
                                                        UPDATE
                                                    </ButtonSort>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </Container>
                        </Card>
                    </Box>
                </BoxCards>
            </Box>
        </Box>
    )
}

export default ProductPage