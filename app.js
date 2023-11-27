const express = require('express')
const { Vonage } = require('@vonage/server-sdk')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const app = express()

const port = process.env.PORT

app.use(cors());

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})


const users = [];

app.post('/signup', (req, res) => {
    const user = req.body
    users.push(user)

    console.log('USERS: ', users)

    res.sendStatus(200)
})

let code = 0;

app.post('/signin', (req, res) => {
    const user = req.body

    const userToCheck = users.filter(userArr => user.number === userArr.number)[0]

    if (userToCheck) {

        if (userToCheck.password === user.password) {
            code = generateCode();

            console.log(code)

            const from = "Vonage APIs"
            const to = userToCheck.number
            const text = `Your code is: ${code}`

            async function sendSMS() {
                await vonage.sms.send({ to, from, text })
                    .then(resp => { console.log('Message sent successfully'); console.log(resp); })
                    .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
            }

            sendSMS();

            res.sendStatus(200)

        } else res.sendStatus(401)
    } else res.sendStatus(400)
})

app.post('/verify', (req, res) => {
    if (req.body.code === code) res.sendStatus(200)
    else res.sendStatus(401)
})
app.listen(port, () => {
    console.log(`=> App is running in port ${port}`)
})

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000)
}