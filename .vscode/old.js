require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

var hp_max = 10
var hp_min = 1
var hp_current = Math.floor(Math.random() * (hp_max - hp_min + 1)) + hp_min;

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Benvenuto nel bellissimo bot di Luca", {
    "reply_markup": {
        "keyboard": [["HP"]]
        }
    });
    
    });

bot.on('message', (msg) => {
    var hp = "hp";
    if (msg.text.toString().toLowerCase().includes(hp)) {
        let hp_current = Math.floor(Math.random() * (hp_max - hp_min + 1)) + hp_min;
        bot.sendMessage(msg.chat.id, "Al momento hai " + hp_current.toString() + " hp.");
        if(hp_current < 4) {
            bot.sendMessage(msg.chat.id, "Stai per morire!");
        }
        else if(hp_current <= 7){
            bot.sendMessage(msg.chat.id, "Stai abbastanza bene.");
        }
        else{
            bot.sendMessage(msg.chat.id, "Stai benone!");
        }
    }
    
    });