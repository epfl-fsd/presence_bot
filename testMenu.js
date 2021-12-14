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
  // console.log(ctx.update.callback_query);
  // console.log(ctx.update.callback_query.message.message_id);
  // console.log(ctx.update.callback_query.id);
  // console.log(ctx.update.callback_query.data);
  var callback_queryData = JSON.parse(ctx.update.callback_query.data)
  console.log(callback_queryData.data.goToPage);
  switch (callback_queryData.action) {
    case "goToPage":
      console.log("------------------",callback_queryData.data.weekNumber);
      menu.goToPage(callback_queryData.data.goToPage, ctx);
      break;
    case "goToWeek":
      console.log(callback_queryData.data.weekNumber);
      break;
    default:
      break;
  }
});

// console.log(3/2);
// console.log(Math.ceil(13/4));

//lunch


bot.launch();
