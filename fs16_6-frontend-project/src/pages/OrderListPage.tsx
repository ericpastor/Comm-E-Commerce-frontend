import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import Typography from '@mui/material/Typography';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Box, Divider, TextField } from '@mui/material';
import TypoTitle from '../custom-components/homePage/Typographies/TypoTitle';
import ButtonIcon from '../custom-components/homePage/buttons/ButtonIcon';
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort';
import { OrderId } from '../types/Order';
import { deleteOrderAsync, getAllOrdersAsync } from '../redux/reducers/orderReducer';

function OrderListPage() {
    const { orders, loading, error } = useAppSelector(state => state.orders)
    const [searchOrder, setSearchOrder] = useState<string | undefined>(undefined)

    const filteredOrders = orders.filter((order) =>
        (!searchOrder || (order.Id && order.Id.toLowerCase().includes(searchOrder.toLowerCase())))
    );

    const [offset, setOffset] = React.useState(0)
    const limit = 50

    const dispatch = useAppDispatch()

    const uniqueOrders = filteredOrders.filter((order, index, array) => {
        const orderId = order.Id?.toString();

        const firstIndex = array.findIndex(o => o.Id?.toString() === orderId);

        return index === firstIndex;
    });

    useEffect(() => {
        dispatch(getAllOrdersAsync({ offset, limit }))
    }, [dispatch, offset])

    const handleDelete = (id: OrderId) => {
        try {
            dispatch(deleteOrderAsync(id))
            toast.success(`Deleted!`)
        } catch (error) {
            toast.error('Something went wrong, user not deleted')
        } finally {
            return orders
        }
    }

    const handleSearchOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOrder(e.target.value);
    };

    if (!orders && !filteredOrders && !loading) {
        return (
            <Box>
                <Typography>
                    Sorry, but there are no orders matching your criteria at the moment!
                </Typography>
            </Box>
        )
    }

    const loadMoreOrders = () => {
        setOffset(prevOffset => prevOffset + limit)
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 5% 15px 5%', width: '90%', borderBottom: '4px solid #dbdadb' }}>
                <TypoTitle>Orders</TypoTitle>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '25px 5% 15px 5%', width: '90%' }}>
                <Box flexGrow={1}></Box>
                <Typography sx={{
                    fontSize: '10px',
                    color: '#1c2235',
                    marginRight: '20px'
                }}>SEARCH AN ORDER:</Typography>
                <TextField
                    variant="filled"
                    placeholder="Order ID"
                    value={searchOrder || ''}
                    size="small"
                    InputProps={{ className: 'texfield' }}
                    onChange={handleSearchOrderChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <List sx={{ width: '100%', maxWidth: '90%', bgcolor: 'background.paper' }}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Sorry, something went wrong!</p>}
                    {!error && !loading && uniqueOrders &&
                        uniqueOrders.map((o, index) => (
                            o.OrderProducts.map(op =>
                                <ListItem alignItems="flex-start" key={index}>
                                    <ListItemText
                                        primary={`Order Id: ${o.Id?.toString()}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Product: {`${op.Product.Title && op.Product.Title}`} -
                                                    Price: {`${op.Product.Price && op.Product.Price}`} -
                                                    Quantity: {`${op.Quantity && op.Quantity}`}
                                                </Typography>
                                                <br />
                                                {`User Id: ${o.UserId}`}
                                                {<Divider sx={{ marginTop: '20px' }} variant="inset" component="li" />}
                                            </React.Fragment>
                                        }
                                    />
                                    <ButtonIcon sx={{ display: 'block' }} onClick={() => { handleDelete(o.Id) }}>
                                        <DeleteForeverIcon />
                                    </ButtonIcon>
                                </ListItem>
                            )))}
                </List>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 5% 55px 5%', width: '90%', borderTop: '4px solid #dbdadb' }}>
                <ButtonSort sx={{ padding: '15px' }} onClick={loadMoreOrders}>Load more</ButtonSort>
            </Box>
        </Box>
    );
}

export default OrderListPage