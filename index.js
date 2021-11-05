const {Telegraf} = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) =>{
    ctx.reply('Welcome my lovely friend')
});

//lunch
bot.launch()