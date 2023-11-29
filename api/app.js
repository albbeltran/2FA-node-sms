const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const app = express()
const port = process.env.PORT

// SMS provider
const client = require('./config/provider')

// Data
const users = require('./data')


// Middleware
app.use(cors());                     // for cors
app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded


// Routes
app.post('/signup', (req, res) => {
    const user = req.body
    const usersExists = users.filter(userArr => user.number === userArr.number)[0]

    if(!usersExists) {
        users.push(user)
        console.log('USERS: ', users)
        res.sendStatus(200)
    } else res.sendStatus(400)
})

let code = 0;

app.post('/signin', async (req, res) => {
    const user = req.body

    const userToCheck = users.filter(userArr => user.number === userArr.number)[0]

    if (userToCheck) {
        if (userToCheck.password === user.password) {
            try {
                code = generateCode()
                console.log(code)

                await sendMessage(userToCheck.number)

                res.sendStatus(200)
            } catch {
                res.sendStatus(401)
            }

        } else res.sendStatus(401)
    } else res.sendStatus(400)
})

app.post('/verify', (req, res) => {
    if (Number(req.body.code) === code) res.sendStatus(200)
    else res.sendStatus(401)
})


// Functions
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000)
}

async function sendMessage(number) {
    const from = "2FA Test"
    const to = number
    const text = `Your code is: ${code}`

    await client.sms.send({ to, from, text })
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); })
}


// Server setup
app.listen(port, () => {
    console.log(`=> App is running in port ${port}`)
})