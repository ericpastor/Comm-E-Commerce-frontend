import { ReactNode, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, List, TextField } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useAppSelector } from '../hooks/useAppSelector'
import { ProductId } from '../types/Product'
import { deleteProductAsync, getAllProductsAsync, sortByPrice } from '../redux/reducers/productsReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'
import BoxCards from '../custom-components/homePage/BoxCards'
import { transformPrice } from '../utils/transFormPrice'
import { useCurrentProfile } from '../hooks/useCurrentProfile'
import BoxImage from '../custom-components/homePage/BoxImage'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue'
import ButtonImage from '../custom-components/homePage/buttons/ButtonImage'
import { getAllCategoriesAsync } from '../redux/reducers/categoryReducer'
import BoxCategories from '../custom-components/homePage/BoxCategories'
import TypoTitle from '../custom-components/homePage/Typographies/TypoTitle'
import ButtonIcon from '../custom-components/homePage/buttons/ButtonIcon'
import BoxCategory from '../custom-components/homePage/BoxCategory'
import { addToCart, removeFromCart } from '../redux/reducers/cartReducer'

function HomeProductsPage() {
    const { products, loading, error } = useAppSelector(state => state.products)
    const { categories } = useAppSelector(state => state.categories)
    const cart = useAppSelector(state => state.cart)
    const { currentProfile, token } = useCurrentProfile()
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
    const [searchTitle, setSearchTitle] = useState<string | undefined>(undefined)

    const filteredProducts = products.filter((product) =>
        (!selectedCategory || product.category === selectedCategory)
        &&
        (!searchTitle || product.title.toLowerCase().includes(searchTitle.toLowerCase()))
    )

    const [offset, setOffset] = useState(0)
    const limit = 10

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const uniqueProducts = filteredProducts.filter((obj, index) => {
        return obj && index === filteredProducts.findIndex(o => obj.id === o.id);
    });


    const isProductsInCart = (product: string | undefined) => {
        return cart.some(item => item.id === product)
    }

    useEffect(() => {
        dispatch(getAllProductsAsync({ offset, limit }))
        dispatch(getAllCategoriesAsync())
    }, [dispatch, offset])

    if (!products && !loading) {
        return (
            <Box>
                <Typography>
                    Sorry, but there are no products matching your criteria at the moment!
                </Typography>
            </Box>
        )
    }

    const onSortAsc = () => {
        dispatch(sortByPrice('asc'))
    }

    const onSortDesc = () => {
        dispatch(sortByPrice('desc'))
    }

    const handleSearchTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value);
    };

    const handleDelete = (id: ProductId) => {
        try {
            dispatch(deleteProductAsync(id))
            toast.success(`Deleted!`)
        } catch (error) {
            toast.error('Something went wrong, product not deleted')
        } finally {
            return uniqueProducts
        }
    }

    const loadMoreProducts = () => {
        setOffset(prevOffset => prevOffset + limit)
    }

    return (
        <Box sx={{ height: '100%' }}>
            <BoxImage>
                <Box sx={{ marginLeft: '10%', marginRight: '10%' }}>
                    <BoxLineBlue />
                    <Typography variant='h6'>Products</Typography>
                    <Typography variant='h4'>Are you looking for products? COMM is the easiest way to buy goods.</Typography>
                    <ButtonImage onClick={() => navigate('/register')}>
                        Register now!
                    </ButtonImage>
                </Box>
            </BoxImage>
            <BoxLineBlue sx={{ width: '10%', margin: '80px auto 80px auto' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 5% 15px 5%', width: '90%', borderBottom: '4px solid #dbdadb' }}>
                <TypoTitle variant='h1' sx={{ color: '#1c2235' }}>About us</TypoTitle>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 5% 15px 5%', width: '90%' }}>
                <Typography variant='h4' sx={{ color: '#1c2235' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nostrum placeat facere reiciendis unde doloribus officiis sunt consequuntur quod illum fuga esse, accusamus quae commodi, laboriosam repellat impedit exercitationem magni.</Typography>
            </Box>
            <BoxLineBlue sx={{ width: '10%', margin: '80px auto 80px auto' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 5% 15px 5%', width: '90%', borderBottom: '4px solid #dbdadb' }}>
                <TypoTitle>Catergories</TypoTitle>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BoxCategories>
                    {categories && (
                        <BoxCategory
                            sx={{ backgroundColor: '#dbdadb' }}
                            onClick={() => setSelectedCategory(undefined)}
                        >
                            <Typography sx={{ padding: '16px 0 16px 0', marginLeft: '10px', marginRight: '10px' }}>All Categories</Typography>
                        </BoxCategory>
                    )}
                    {categories && Array.isArray(categories) && categories.map((category) => (
                        <BoxCategory
                            key={category.id}
                            sx={{
                                backgroundImage: `url(${category.categoryImage?.categoryImageUrl})`,
                            }}
                            onClick={() => setSelectedCategory(category.name)}
                        >
                            <Typography sx={{ padding: '16px' }}>{category.name}</Typography>
                        </BoxCategory>
                    ))}
                </BoxCategories>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '50px auto 25px auto' }}>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '25px 5% 15px 5%', width: '90%' }}>
                <Box flexGrow={1}></Box>
                <Typography sx={{
                    fontSize: '10px',
                    color: '#1c2235',
                    marginRight: '20px'
                }}>SEARCH A PRODUCT:</Typography>
                <TextField
                    variant="filled"
                    placeholder="shoes, bike, jacket..."
                    value={searchTitle || ''}
                    size="small"
                    InputProps={{ className: 'texfield' }}
                    onChange={handleSearchTitleChange}

                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 5% 15px 5%', width: '90%', borderBottom: '4px solid #dbdadb' }}>
                <TypoTitle>Products</TypoTitle>
                <Box flexGrow={1}></Box>
                <ButtonSort onClick={onSortAsc}>Price Asc</ButtonSort>
                <ButtonSort onClick={onSortDesc}>Price Desc</ButtonSort>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BoxCards>
                    {loading && (<p>Loading...</p>)}
                    {error && (<p>Sorry, something went wrong!</p>)}
                    {!error && !loading && uniqueProducts &&
                        uniqueProducts.map((p) => (
                            <Box sx={{ width: '100%' }} key={p.id}>
                                <List sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px' }}>
                                    <Card sx={{ maxWidth: '300px', width: '100%' }} >
                                        <Link to={`/${p.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image={`${p.images && p.images[1].imageUrl}`}
                                                title='product'
                                            />
                                            <CardContent>
                                                <Typography sx={{ fontSize: '15px', color: '#1c2235' }} >
                                                    {p.title}
                                                </Typography>
                                                <hr />
                                                <Box sx={{ display: 'flex', alignItems: 'baseline', fontSize: '14px', marginRight: '30px' }}>
                                                    <strong style={{ color: 'black' }
                                                    } > Price:</strong> <Typography color='text.secondary' sx={{ marginLeft: '10px', fontFamily: 'Lobster, cursive' }}>
                                                        {transformPrice(p.price)}</Typography>
                                                </Box>
                                                <Typography variant='subtitle1' color='text.secondary' component='div' sx={{ fontSize: '14px' }}>
                                                    <strong style={{ color: 'black' }}>Category: </strong> {(p.category as unknown) as ReactNode}
                                                </Typography>
                                            </CardContent>
                                        </Link>
                                        <CardActions>
                                            <ButtonIcon
                                                sx={{ display: `${token && currentProfile?.role ? 'block' : 'none'}` }}
                                                onClick={() =>
                                                    isProductsInCart(p.id)
                                                        ? dispatch(removeFromCart(p))
                                                        : dispatch(addToCart(p))
                                                }
                                            >
                                                {
                                                    isProductsInCart(p.id)
                                                        ? <RemoveShoppingCartIcon sx={{ color: 'red' }} />
                                                        : <AddShoppingCartIcon />
                                                }

                                            </ButtonIcon>
                                            <ButtonIcon sx={{ display: `${token && currentProfile?.role === 'Admin' ? 'block' : 'none'}` }} onClick={() => { handleDelete(p.id) }}>
                                                <DeleteForeverIcon />
                                            </ButtonIcon>
                                        </CardActions>
                                    </Card >
                                </List>
                            </Box>
                        ))
                    }
                </BoxCards >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 5% 55px 5%', width: '90%', borderTop: '4px solid #dbdadb' }}>
                    <ButtonSort sx={{ padding: '15px' }} onClick={loadMoreProducts}>Load more</ButtonSort>
                </Box>
            </Box>
        </Box>
    )
}

export default HomeProductsPage
