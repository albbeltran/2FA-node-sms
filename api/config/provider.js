const { Vonage } = require('@vonage/server-sdk')

const client = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})

module.exports = client;