import * as React from 'react';
import NavDrawer from '../../Components/Nav&Drawer';
import Messages from '../Messages';
import { Route, useParams } from 'react-router-dom';
import Axios from 'axios'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import { withRouter, Link, useHistory, Router, useRouteMatch, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Main from '../Main';
import { useSelector, useDispatch } from 'react-redux'
import { addName, addUserId } from '../../Redux/user';

function Home() {

    const { userId } = useSelector((state) => state.user)
    const { name } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const history = useHistory()

    const redirect = (id) => {
        history.push(`/home/${id}`)
    }

    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }


    let { id } = useParams();

    const [userData, setUserData] = React.useState({
        name: 'sauhard'
    })

    let { path, url } = useRouteMatch();


    const [isUser, setIsUser] = React.useState(false)

    const [messages, setMessages] = React.useState(null)

    const [fromId, setFromId] = React.useState('')

    const [apiMessages, setApiMessages] = React.useState([])



    // async function fetchData() {
    //     const response = await Axios.get(`http://localhost:3001/getInfo/${id}`).then(res => {
    //         console.log(res.data[0], 'response')
    //         return res.data[0]
    //     }).catch(err => {
    //         console.log(err)
    //     })
    //     dispatch(addUserId(response.user_id))
    //     dispatch(addName(response.name))
    // }

    // async function fetchMessages() {
    //     const response = await Axios.get(`http://localhost:3001/allMessages/${id}`).then(res => {
    //         return res.data
    //     }).catch(err => {
    //         console.log(err)
    //     })
    //     setApiMessages(response)
    //     console.log(response)
    // }

    const [allUsers, setAllUsers] = React.useState([])

    async function fetchUsers() {
        const response = await Axios.get('http://localhost:3001/allUsers').then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
        setAllUsers(response)
        console.log(response)
    }

    React.useEffect(() => {
        // fetchData();
        console.log(userId, name, path, url)
        fetchUsers()
        let isMounted = true;

        if (localStorage.getItem('isLogin') === 'true') {
            setIsUser(true)
            localStorage.setItem('user_id', userId)
        }
        else {
            if (localStorage.getItem('user_id') === null) {
                localStorage.setItem('user_id', getRandomString(10))
                setFromId(localStorage.getItem('user_id'))
            }
            else if (localStorage.getItem('user_id') !== null) {
                setFromId(localStorage.getItem('user_id'))
            }
            localStorage.setItem('isLogin', 'false')
        }

        return () => { isMounted = false };
    }, [userId])



    return (
        <div>
            <NavDrawer url={url} isLogin={localStorage.getItem('isLogin')} name={name} />
            <Switch>
                <Route path={`${path}/:id`}>
                    <Main fromId={fromId} />
                </Route>
            </Switch>
        </div>
    )
}

export default Home;
