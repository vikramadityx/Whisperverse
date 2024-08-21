import React, { useState } from 'react'
import TXTInput from '../../Components/TXTInput'
import BTN from '../../Components/BTN'
import Axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'

function Otp({ phone }) {

    const [otp, setOtp] = useState('')

    const history = useHistory()

    const verifyOtp = () => {
        Axios.post('http://localhost:3001/verifyotp', {
            phone: phone,
            otp: otp
        }).then(res => {
            console.log(res.data)
            if (res.data.length !== 0) {
                localStorage.setItem('isLogin', 'true')
                history.push(`/home/${res.data[0].user_id}`)
            }
            else{
                alert("Please enter corret otp")
            }
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
                <TXTInput setState={setOtp} label="Enter Otp" phone={false} />
            </div>
            <div style={{
                padding: '2rem',
                width: '23rem'
            }}>
                <BTN passedFunction={verifyOtp} label="Confirm Otp" />
            </div>
        </div>
    )
}

export default Otp
