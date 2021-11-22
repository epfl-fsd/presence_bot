const { Telegraf } = require('telegraf');
const { Markup } = require("telegraf");

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) =>{
    ctx.reply('Welcome my lovely friend')
});

bot.command("inline", (ctx) => {
  return ctx.reply("<b>Coke</b> or <i>Pepsi?</i>", {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      Markup.button.callback("Coke", "coke"),
      Markup.button.callback("Pepsi", "pepsi"),
    ]),
  });
});

bot.on("callback_query", async (ctx) => {
  console.log(ctx.update.callback_query.id);
  switch (ctx.update.callback_query.data) {
    case "coke":
      ctx.reply("Good choice !");
      break;

    case "pepsi":
      bot.telegram.answerCbQuery(
        ctx.update.callback_query.id,
        "Please make the good choice, otherwise you would loose..."
      );
      break;

    default:
      break;
  }
});


//lunch
bot.launch()
