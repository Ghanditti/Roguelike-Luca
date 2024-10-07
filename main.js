require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Benvenuto nel roguelike di Luca!", {
        "reply_markup": {
            "keyboard": [["/move Nord"], ["/move Ovest", "/status", "/move Est"], ["/move Sud"]]
        }
    });
});

const min = 1;
const max = 10;

// Funzione per generare la salute del mob
function mobhp() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let player = {
    hp: 10,
    position: { x: 0, y: 0 }
};

let mob = {
    hp: mobhp(),
    position: { x: 1, y: 1 }
};

bot.onText(/\/move (.+)/, (msg, match) => {
    const direction = match[1].toLowerCase();

    if (direction === 'nord') player.position.y += 1;
    if (direction === 'sud') player.position.y -= 1;
    if (direction === 'ovest') player.position.x -= 1;
    if (direction === 'est') player.position.x += 1;

    // Controllo se la posizione del player coincide con quella del mob
    if (player.position.x === mob.position.x && player.position.y === mob.position.y) {
        mob.hp = mobhp();
        bot.sendMessage(msg.chat.id, `Ti sei mosso a ${direction}. Incontri un pericoloso Diddy selvatico con ` + mob.hp + " hp!");
    }
    else {
        bot.sendMessage(msg.chat.id, `Ti sei mosso a ${direction}. La tua nuova posizione è (${player.position.x}, ${player.position.y})`);
    }
    
});

// Comando per mostrare lo stato del giocatore
bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, `HP: ${player.hp}, Posizione: (${player.position.x}, ${player.position.y})`);
});

bot.onText(/\/attack/, (msg) => {
    mob.hp -= Math.floor(Math.random() * (max - min + 1)) + min
    if(mob.hp <= 0) {
        bot.sendMessage(msg.chat.id, "Attacchi Diddy, sconfiggendolo definitivamente!");
    }
    else {
        bot.sendMessage(msg.chat.id, `Attacchi il pericoloso Diddy. Ora ha `+ mob.hp + " hp!");
    }
    
});