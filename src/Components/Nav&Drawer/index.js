import * as React from 'react';
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material'
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { Redirect, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { Link } from 'react-router-dom'


const drawerWidth = 240;

function NavDrawer({ name, isLogin, url }) {

    const history = useHistory()

    const [index1, setIndex1] = useState(0)

    const listItemClick = (index) => {
        setIndex1(index);
    }

    const [loading, setLoading] = useState(true)

    const [allUsers, setAllUsers] = React.useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const logout = () => {
        localStorage.removeItem('user_id')
        localStorage.setItem('isLogin', 'false')
        history.push('/register')
    }

    const [inputValue, setInputValue] = useState("")

    useEffect(async () => {
        const response = await Axios.get('http://localhost:3001/allUsers').then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
        setAllUsers(response)
        console.log(response)
        setLoading(false)
    }, [])

    const search = (data) => {
        return data.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
    }

    const redirect = (id) => {
        history.push(`${url}/${id}`)

        window.location.reload()
    }


    return (
        <div>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <AppBar
                    position="fixed"
                    sx={{
                        width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
                        boxShadow: 'none'
                    }}
                >
                    <Toolbar style={{
                        backgroundColor: '#fff',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        height: '5rem'
                    }}>
                        <div style={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Typography style={{
                                color: '#000',
                                fontFamily: 'poppins',
                                fontWeight: 700,
                                alignItems: 'center',
                                justifyContent: 'center',
                                lineHeight: '1rem'
                            }}>
                                ANJAAN
                            </Typography>
                            <div style={{
                                borderStyle: 'solid',
                                borderWidth: 1,
                                width: '25rem',
                                borderColor: '#000',
                                borderRadius: 24,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5rem',
                                marginLeft: '1rem',
                                position: 'relative'
                            }}>
                                <SearchIcon style={{
                                    color: '#000'
                                }} />
                                <input style={{
                                    border: 'none',
                                    outline: "none",
                                    padding: '0.5rem',
                                    marginLeft: '0.5rem',
                                    width: '90%'
                                }} value={inputValue} onChange={e => { setSearchTerm(e.target.value); setInputValue(e.target.value) }} placeholder="SEARCH" />
                                {loading ?
                                    <div style={{
                                        width: '90%',
                                        top: '49px',
                                        position: 'absolute',
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        padding: '0.5rem'
                                    }}>
                                        <Typography>Loading...</Typography>
                                    </div>
                                    :
                                    (searchTerm == "" ?
                                        null
                                        :
                                        <div style={{
                                            width: '90%',
                                            top: '49px',
                                            position: 'absolute',
                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                            padding: '0.5rem',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            {search(allUsers).map((val, index) => (
                                                /* <Link to={`${url}/${val.user_id}`}> */
                                                <button style={{
                                                    backgroundColor: 'rgba(0,0,0,0)',
                                                    outline: 'none',
                                                    border: 'none'
                                                }} onClick={() => {
                                                    setSearchTerm("");
                                                    setInputValue("");
                                                    redirect(val.user_id)
                                                }} key={index}>{val.name}
                                                </button>
                                                /* </Link> */
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                            {localStorage.getItem('isLogin') === 'true' ?
                                <button style={{
                                    color: '#000',
                                    fontFamily: 'poppins',
                                    fontWeight: 700,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    lineHeight: '1rem',
                                    backgroundColor: '#fff',
                                    borderStyle: 'solid',
                                    borderColor: '#000',
                                    borderWidth: 1,
                                    width: '10rem',
                                    fontSize: '1.2rem',
                                    borderRadius: '1rem'

                                }} onClick={logout}>
                                    LOGOUT
                                </button>
                                :
                                null}
                            <Avatar sx={{
                                backgroundColor: '#fff',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: '#000',
                                color: '#000',
                                marginLeft: '1rem'
                            }}>{name.slice(0, 2).toUpperCase()}</Avatar>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        borderStyle: 'solid',
                        borderColor: '#000',
                        borderWidth: 1
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar style={{
                        height: '5rem'
                    }}>
                    </Toolbar>
                    <Divider />
                    <List style={{
                        borderStyle: 'solid',
                        borderColor: '#000',
                        borderWidth: 1
                    }}>
                        {(isLogin === 'true' ? ['All Messages', 'My Account'] : ['All Messages']).map((text, index) => (
                            <ListItem style={{
                                backgroundColor: index1 === index ? '#efefef' : '#fff'
                            }} button onClick={() => {
                                listItemClick(index)
                            }} key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </div >
    )
}

export default NavDrawer
