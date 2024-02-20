import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import Typography from '@mui/material/Typography';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteUserAsync, getAllUsersAsync } from '../redux/reducers/userReducer';
import { useEffect, useState } from 'react';
import { UserId } from '../types/User';
import { toast } from 'sonner';
import { Box, Divider, TextField } from '@mui/material';
import TypoTitle from '../custom-components/homePage/Typographies/TypoTitle';
import ButtonIcon from '../custom-components/homePage/buttons/ButtonIcon';
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort';

function CustomersListPage() {
    const { users, loading, error } = useAppSelector(state => state.users)
    const [searchName, setSearchName] = useState<string | undefined>(undefined)

    const filteredUsers = users.filter((user) =>
        (!searchName || (user.firstName && user.firstName.toLowerCase().includes(searchName.toLowerCase())))
    );

    const [offset, setOffset] = React.useState(0)
    const limit = 50

    const dispatch = useAppDispatch()

    const uniqueUsers = filteredUsers.filter((obj, index) => {
        return index === filteredUsers.findIndex(o => obj.id === o.id);
    })


    useEffect(() => {
        dispatch(getAllUsersAsync({ offset, limit }))
    }, [dispatch, offset])

    const handleDelete = (id: UserId) => {
        try {
            dispatch(deleteUserAsync(id))
            toast.success(`Deleted!`)
        } catch (error) {
            toast.error('Something went wrong, user not deleted')
        } finally {
            return users
        }
    }
    const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    };

    const loadMoreUsers = () => {
        setOffset(prevOffset => prevOffset + limit)
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 5% 15px 5%', width: '90%', borderBottom: '4px solid #dbdadb' }}>
                <TypoTitle>Users</TypoTitle>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '25px 5% 15px 5%', width: '90%' }}>
                <Box flexGrow={1}></Box>
                <Typography sx={{
                    fontSize: '10px',
                    color: '#1c2235',
                    marginRight: '20px'
                }}>SEARCH A USER:</Typography>
                <TextField
                    variant="filled"
                    placeholder="user firstname"
                    value={searchName || ''}
                    size="small"
                    InputProps={{ className: 'texfield' }}
                    onChange={handleSearchNameChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <List sx={{ width: '100%', maxWidth: '90%', bgcolor: 'background.paper' }}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Sorry, something went wrong!</p>}
                    {!error && !loading && uniqueUsers &&
                        uniqueUsers.filter(uniqueUsers => uniqueUsers && uniqueUsers.firstName).map((u) => (
                            <ListItem alignItems="flex-start" key={u.id}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={`${u.avatar?.avatarUrl && u.avatar.avatarUrl}`} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${u.firstName && u.firstName} ${u.lastName && u.lastName}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Email: {`${u.email && u.email}`}
                                            </Typography>
                                            {`   -   Phone: ${u.phone && u.phone}   -  Role:  ${u.role && u.role}`}
                                            {<Divider sx={{ marginTop: '20px' }} variant="inset" component="li" />}
                                        </React.Fragment>
                                    }
                                />
                                <ButtonIcon sx={{ display: 'block' }} onClick={() => { handleDelete(u.id) }}>
                                    <DeleteForeverIcon />
                                </ButtonIcon>
                            </ListItem>
                        ))}
                </List>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 5% 55px 5%', width: '90%', borderTop: '4px solid #dbdadb' }}>
                <ButtonSort sx={{ padding: '15px' }} onClick={loadMoreUsers}>Load more</ButtonSort>
            </Box>
        </Box>
    );
}

export default CustomersListPage