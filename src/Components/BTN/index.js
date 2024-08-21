import React from 'react'
import { Link } from 'react-router-dom'

function BTN({ passedFunction, label, linkTo }) {
    return (
        <div>
            <Link to={linkTo}>
                <button style={{
                    width: '100%',
                    height: '3rem',
                    backgroundColor: '#fff',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    borderWidth: 1,
                    cursor: 'pointer',
                    borderRadius: 24,
                    fontSize: '1.2rem',
                    fontFamily: 'poppins'
                }} onClick={passedFunction}>
                    {label}
                </button>
            </Link>
        </div>
    )
}

export default BTN
