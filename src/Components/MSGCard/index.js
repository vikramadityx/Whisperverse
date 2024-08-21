import { IconButton, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Axios from 'axios'
import { useSelector } from 'react-redux'



function MSGCard({ msg, label, id/* , setComment, comment */ }) {

    const [tempCommment, setTempComment] = React.useState('')
    const [comment, setComment] = React.useState([])

    const randomColor = () => {
        const colors = ['#B8405E', '#F76E11', '#54BAB9', '#FA58B6', '#FBF46D', '#FFAFAF', '#F0BB62']
        const random = Math.floor(Math.random() * colors.length);
        const colorID = id % 7
        return colors[colorID]
    }

    async function fetchComments() {
        const response = await Axios.get(`http://localhost:3001/getCommentFromMessageId/${id}`).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
        setComment(response)
        // console.log(response)
    }

    const { name } = useSelector((state) => state.user)

    React.useEffect(() => {
        fetchComments();
        // console.log(bgColor)
    }, [comment])


    const addComment = (message_id, comment_from) => {


        Axios.post(`http://localhost:3001/addComment/${message_id}`, {
            comment: tempCommment,
            comment_from: comment_from,
            name: localStorage.getItem('isLogin') === 'true' ? name : localStorage.getItem('user_id')
        }).then(res => {
            console.log(res, '2')
        }).catch(err => console.log(err))
    }

    return (
        <div style={{
            padding: '1.2rem',
            width: '20rem',
            boxShadow: '0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)',
            borderRadius: '32px',
            borderStyle: 'solid',
            borderColor: '#000',
            borderWidth: 1,
            margin: '1rem',
            marginBottom: 'auto',
            height: 'auto',
            backgroundColor: randomColor()
        }}>
            <Typography style={{
                fontFamily: 'poppins',
                fontSize: '2rem'
            }}>
                {label}
            </Typography>
            <Typography style={{
                fontSize: '0.9rem',
                width: '20rem',
                wordWrap: 'break-word'
            }}>
                {msg}
            </Typography>

            <div style={{
                marginTop: '1rem'
            }}>
                <Typography style={{
                    fontFamily: 'poppins',
                    fontWeight: '700',
                    fontSize: '1.2rem'
                }}>
                    Comments
                </Typography>

                <div style={{
                    marginTop: '0.8rem'
                }}>
                    {comment.map((item, index) => (
                        <div style={{
                            marginTop: '0.5rem'
                        }} key={index}>
                            <Typography style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                lineHeight: '1rem',
                                wordWrap: 'break-word'
                            }}>
                                {item.name}
                            </Typography>
                            <Typography style={{
                                fontFamily: 'montserrat',
                                fontWeight: '300',
                                fontSize: '0.8rem',
                                wordWrap: 'break-word'
                            }}>
                                {item.comment}
                            </Typography>
                        </div>
                    ))}
                </div>

            </div>

            <div style={{
                width: '100%',
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '2rem'
            }}>
                <input style={{
                    border: 'none',
                    outline: "none",
                    padding: '0.5rem',
                    marginLeft: '1rem',
                    width: '90%',
                    backgroundColor: randomColor()
                }} onChange={(e) => { setTempComment(e.target.value) }} placeholder="ADD COMMENT" />
                <IconButton style={{
                    marginRight: '1rem'
                }} onClick={() => { addComment(id, localStorage.getItem('user_id')); setComment([...comment, tempCommment]) }} >
                    <ArrowForwardIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default MSGCard
