import React from 'react'
import {Typography} from '@mui/material'

function TXTInput({phone, label, setState}) {
    return (
        <div style={{
            width: '23rem',
            // height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography style={{
                textAlign: 'left',
                fontSize: '2rem',
                fontFamily: 'poppins',
                fontWeight: 800
            }}>
                {label}
            </Typography>
            <div style={{
                width: '23rem',
                borderStyle: 'solid',
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '0.5rem',
                height: '3rem'
            }}>
                {phone ? <Typography>
                    +91
                </Typography> : null}
                <input style={{
                    border:"none",
                    outline: 'none',
                    width: phone ? '18rem' : '22rem',
                    marginLeft: '0.5rem',
                    height: '2.5rem'
                }} onChange={(e) => {
                    setState(e.target.value)
                }}/>
            </div>
        </div>
    )
}

export default TXTInput
