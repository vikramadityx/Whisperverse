import React, { useState } from 'react'
import BTN from '../../Components/BTN'
import TXTInput from '../../Components/TXTInput'
import Axios from 'axios'
import { Redirect, useHistory, Route } from 'react-router-dom'




function Login({ phone, setPhone }) {

    if(localStorage.getItem('isLogin') === 'true'){
        return <Redirect to={`/home/${localStorage.getItem('user_id')}`}/>
    }

    const login = () => {
        Axios.post('http://localhost:3001/updateOtp', {
            phone: phone
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
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
                <TXTInput setState={setPhone} label="Login" phone={true} />
            </div>
            <div style={{
                padding: '2rem',
                width: '23rem'
            }}>
                <BTN linkTo="/otp" passedFunction={login} label="Login" />
            </div>
        </div>
    )
}

export default Login 
