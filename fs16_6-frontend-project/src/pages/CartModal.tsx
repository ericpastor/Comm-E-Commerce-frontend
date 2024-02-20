import { Box, Button, Divider, Typography } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { decreaseQuantity, emptyCart, increaseQuantity, removeFromCart } from '../redux/reducers/cartReducer'
import { CartItem } from '../types/CartItem'
import { transformPrice } from '../utils/transFormPrice'
import DividerCart from '../custom-components/cart/DividerCart'
import { CreateOrder } from '../types/Order'
import { useCurrentProfile } from '../hooks/useCurrentProfile'
import { createOrderAsync } from '../redux/reducers/orderReducer'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

function CartModal() {
    const cart = useAppSelector(state => state.cart)
    const { currentProfile } = useCurrentProfile()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const getSumPrices = (cart: CartItem[]) => {
        return cart?.reduce((acc, item) => item.price * item.Quantity + acc, 0)
    }

    const onIncreaseQuantity = (product: CartItem) => {
        if (product.id) {
            dispatch(increaseQuantity(product.id));
        }
    }

    const onDecreaseQuantity = (product: CartItem) => {
        if (product.id) {
            dispatch(decreaseQuantity(product.id));
        }
    }

    const onCheckout = async () => {
        try {
            if (cart && cart.length > 0) {
                if (currentProfile) {
                    const orderProducts = cart
                        .filter(item => item)
                        .map((item) => ({
                            quantity: item.Quantity,
                            productId: item.id,

                        }));

                    const order: CreateOrder = {
                        userId: currentProfile.id,
                        orderProducts: orderProducts,
                    };

                    await dispatch(createOrderAsync(order));
                    dispatch(emptyCart());

                    toast.success('Order received!');
                }
            }
        } catch (error) {
            toast.error('Something went wrong with your order');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '350px' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: 'GrayText' }}>
                    Items in cart:
                </Typography>
                <Typography sx={{ fontWeight: 'bold', marginLeft: '10px' }}>{cart?.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginRight: '30px', color: 'red' }}>
                <strong style={{ color: 'black' }}>Total:</strong>
                <Typography sx={{ marginLeft: '10px', fontFamily: 'Lobster, cursive' }}>{transformPrice(getSumPrices(cart))}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', padding: '10px', width: '300px' }}>
                {cart && cart.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', marginBottom: '10px', width: '100%' }}>
                        <p style={{ fontSize: '12px' }}>{item.title} x {item.Quantity}</p>
                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-center', }}>
                            <img src={`${item.images[0].imageUrl}`} alt='product' style={{ maxWidth: '80px', maxHeight: '80px' }} />
                            <Button onClick={() => dispatch(removeFromCart(item))} style={{ fontSize: '10px' }}>
                                <RemoveShoppingCartIcon sx={{ color: 'red' }} />
                            </Button>
                        </Box>
                        <Typography sx={{ fontSize: '10px', backgroundColor: '#1c2235', color: '#fff', padding: '5px', borderRadius: '4px', marginTop: '10px' }}>
                            UPDATE QUANTITY:
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <Button onClick={() => onDecreaseQuantity(item)}>
                                <RemoveIcon />
                            </Button>
                            {item.Quantity}
                            <Button onClick={() => onIncreaseQuantity(item)}>
                                <AddIcon />
                            </Button>
                        </Box>
                        <DividerCart></DividerCart>
                    </Box>
                ))}
                <ButtonSort onClick={onCheckout}>CHECKOUT</ButtonSort>
            </Box>
        </Box>
    )
}

export default CartModal
