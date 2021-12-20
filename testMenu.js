const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");
const Menu = require("./Menu");
var menu = new Menu(
  "Bienvenue, veuillez indiquer votre présence physique de l'epfl"
);

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);



bot.start((ctx) => {
  ctx.reply("Welcome my lovely friend");
});

bot.command("inline", (ctx) => {
  return menu.sendMenu(ctx)
});

bot.on("callback_query", async (ctx) => {
  var callback_queryData = JSON.parse(ctx.update.callback_query.data)
  switch (callback_queryData.action) {
    case "goToPage":
      menu.goToPage(callback_queryData.data, ctx);
      break;
    case "goToWeek":
      menu.sendWeekDays(callback_queryData.data, ctx);
      break;
    default:
      break;
  }
});

// console.log(3/2);
// console.log(Math.ceil(13/4));

//lunch


bot.launch();
