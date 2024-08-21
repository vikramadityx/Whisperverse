import React from 'react'
import MSGCard from '../../Components/MSGCard'
import { Grid } from '@mui/material'
import Masonry from 'react-masonry-css'
import Axios from 'axios'

function Messages({ messages, label }) {







    const [height, setHeight] = React.useState(null)

    return (
        <Grid container style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',

        }}>
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {messages.map((item, index) => (
                    <MSGCard /* comment={comment} setComment={setComment} */ setHeight={setHeight} key={index} label={item.from_id} id={item.message_id} msg={item.message} />
                ))
                }
            </Masonry>
        </Grid>
    )
}

export default Messages
