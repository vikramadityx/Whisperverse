import * as React from 'react';
import NavDrawer from '../../Components/Nav&Drawer';
import Messages from '../Messages';
import { Route, useParams } from 'react-router-dom';
import Axios from 'axios'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { addName, addUserId } from '../../Redux/user';


function Main({ fromId }) {

    const { id } = useParams()

    const dispatch = useDispatch()

    const [apiMessages, setApiMessages] = React.useState([])

    const [messages, setMessages] = React.useState(null)

    async function fetchMessages() {
        const response = await Axios.get(`http://localhost:3001/allMessages/${id}`).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
        setApiMessages(response)
        // console.log(response)
    }

    async function fetchData() {
        const response = await Axios.get(`http://localhost:3001/getInfo/${id}`).then(res => {
            // console.log(res.data[0], 'response')
            return res.data[0]
        }).catch(err => {
            console.log(err)
        })
        dispatch(addUserId(response.user_id))
        dispatch(addName(response.name))
    }

    React.useEffect(() => {
        fetchData();
        fetchMessages();
    }, [apiMessages])

    const sendMessage = () => {
        console.log(fromId)
        Axios.post(`http://localhost:3001/addMessage/${id}`, {
            from_id: fromId,
            message: messages
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
        // setApiMessages([...apiMessages, { from_id: localStorage.getItem('user_id'), message: messages }])
    }

    return <div>
        <div style={{
            marginTop: '5rem',
            marginLeft: '240px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'row'
        }}>
            {localStorage.getItem('isLogin') === 'false' ?
                <div style={{
                    // width: '25vw',
                    marginRight: "1rem"
                }}>
                    <div style={{
                        // width: '20vw',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 24,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '10rem',
                        padding: '0.5rem',
                        marginTop: '1rem'
                    }}>
                        <textarea cols="40" rows="5" style={{
                            border: 'none',
                            outline: "none",
                            marginLeft: '1rem',
                            width: '90%',
                            height: '10rem'
                        }} onChange={(e) => {
                            setMessages(e.target.value)
                        }} placeholder="ADD COMMENT" />
                        <IconButton style={{
                            marginRight: '1rem'
                        }} onClick={sendMessage}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </div>
                </div> :
                null
            }

            <div style={{
                width: localStorage.getItem('isLogin') === 'true' ? '100%' : '75vw'
            }}>
                <Messages label={localStorage.getItem('user_id')} messages={apiMessages} />
            </div>
        </div>
    </div>
}

export default Main;
