const botly = require('botly')
const conversation = require('./conversation')

const { WEBHOOK, VERIFY_TOKEN, ACCESS_TOKEN } = require('configs').FBBOT

const bot = new Botly({
    verifyToken: VERIFY_TOKEN,
    accessToken: ACCESS_TOKEN
})

const sendFB = requrie('./sendFB')(bot)

bot.on('message', (sender, message, data) => {
    bot.sendText({
        id: sender,
        text: 'hi!'
    }, (err, data) => {
        if (err) console.log('greet err:',err)
        else console.log('greet success:', data)
    })
})

module.exports = app =>
    app.use(WEBHOOK, bot.router())
