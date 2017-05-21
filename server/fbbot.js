const botly = require('botly')

const { WEBHOOK, VERIFY_TOKEN, ACCESS_TOKEN } = require('../configs').FBBOT
const bot = new botly({
    verifyToken: VERIFY_TOKEN,
    accessToken: ACCESS_TOKEN
})

let users = {}
let msgs = {}

//const reply = (sender, message, data) => { console.log('reply function')}
const reply = require('./reply')(bot, users, msgs)


bot.on('message', (sender, message, data) => {
    console.log('sender:',sender)
    console.log('message:',message)
    console.log('data:',data)

    const fbMessage = new Promise( (resolve, reject) => {
        if ( !users[sender]) {
            bot.getUserProfile(sender, (err, info) => {
                if (err) reject(err)
                users[sender] = info;
                msgs[sender] = {}
                resolve([sender, message, data])
                bot.sendText({
                    id: sender,
                    text: 'Hello~'+users[sender].first_name
                }, (err, data) => {
                    console.log("send text cb:", err, data,"send text cb")
                });
            });
        } else resolve([sender, message, data])
    })
    fbMessage.then( params => {
        reply(params[0], params[1], params[2])
    }).catch( err => {
        console.log('profile promise err:', err)
    });


    bot.sendText({
        id: sender,
        text: 'hi!'
    }, (err, data) => {
        if (err) console.log('greet err:',err)
        else console.log('greet success:', data,"send text cb")
    })
})

module.exports = app =>
    app.use(WEBHOOK, bot.router())
