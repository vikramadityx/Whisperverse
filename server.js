const express = require('express');
const app = express();

const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'cheeku0610',
    database: 'anonymous'
})

function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

app.post('/signup', (req, res) => {
    const name = req.body.name
    const phone = req.body.phone
    const otp = Math.floor(Math.random() * 90000) + 10000;
    const user_id = generateUID()
    db.query('INSERT INTO user (name,phone,otp,user_id) VALUES (?,?, ?, ?)', [name, phone, otp, user_id], (err, result) => {
        if (err) {
            console.log(err)
        }
        db.query('SELECT otp FROM user WHERE phone = ?', [phone], (err, result) => {
            res.send(result)
        })
    })
})

app.post('/verifyotp', (req, res) => {
    const otp = req.body.otp
    const phone = req.body.phone
    sqlQuery = "SELECT otp, user_id from user WHERE otp = ?"
    const otp2 = otp.toString()
    db.query(sqlQuery, [otp], (err, result) => {
        // const otp1 = result[0].otp.toString()
        // if (otp1 === otp2) {
        //     res.send(true)
        // }
        // else {
        //     res.send(false)
        // }
        res.send(result)
    })
})

app.post('/updateOtp', (req, res) => {
    const phone = req.body.phone
    const otp = Math.floor(Math.random() * 90000) + 10000;
    db.query('UPDATE user SET otp = ? WHERE phone = ?', [otp, phone], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        db.query('SELECT otp FROM user WHERE phone = ?', [phone], (err, result) => {
            res.send(result)
        })
    })
})

app.get('/getInfo/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM user WHERE user_id = ?', [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.post('/addMessage/:id', (req, res) => {
    const to_id = req.params.id
    const from_id = req.body.from_id
    const message = req.body.message
    const message_id = generateUID()
    db.query('INSERT INTO messages (message ,from_id, to_id, message_id) VALUES (?,?,?, ?)', [message, from_id, to_id, message_id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    })
})

app.get('/allMessages/:id', (req, res) => {
    id = req.params.id
    db.query('SELECT * FROM messages where to_id = ?', [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.get('/allUsers', (req, res) => {
    db.query('SELECT * FROM user', (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.post('/addComment/:message_id', (req, res) => {

    message_id = req.params.message_id
    comment = req.body.comment
    comment_from = req.body.comment_from
    name = req.body.name

    db.query('INSERT INTO comments (comment, comment_from, message_id, name) VALUES (? , ? ,?, ?)', [comment, comment_from, message_id, name], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.get('/getCommentFromMessageId/:id', (req, res) => {
    id = req.params.id

    db.query('SELECT comment, name FROM comments where message_id = ?', [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})


app.listen(3001, () => {
    console.log('running on port 3001')
})