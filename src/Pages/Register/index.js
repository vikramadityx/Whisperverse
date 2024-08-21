import React, { useState } from 'react'
import { Typography } from '@mui/material'
import TXTInput from '../../Components/TXTInput'
import BTN from '../../Components/BTN'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'

function Register({ name, phone, setPhone, setName }) {

    // const [name, setName] = useState('')
    // const [phone, setPhone] = useState('')

    if (localStorage.getItem('isLogin') === 'true') {
        return <Redirect to={`/home/${localStorage.getItem('user_id')}`} />
    }

    const signUp = () => {

        console.log(name, phone)

        Axios.post('http://localhost:3001/signup', {
            phone: phone,
            name: name
        }).then((res) => [
            console.log(res.data[0].otp)
        ])
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                padding: '1rem'
            }}>
                <TXTInput setState={setPhone} label="Phone Number" phone={true} />
            </div>
            <div style={{
                padding: '1rem'
            }}>
                <TXTInput setState={setName} label="Name" phone={false} />
            </div>
            <div style={{
                padding: '2rem',
                width: '23rem'
            }}>
                <BTN linkTo="/otp" label="Sign Up" passedFunction={signUp} />
            </div>
        </div>
    )
}

export default Register
