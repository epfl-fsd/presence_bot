const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");
const Menu = require("./Menu");
var menu = new Menu(
  "Bienvenue, veuillez indiquer votre présence physique de l'epfl"
);

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

//Starting the bot
bot.start((ctx) => {
  ctx.reply("Welcome my lovely computer scientist");
});



//INLINE QUERY //MAIN MENU
bot.command("test", (ctx) => {
  // ctx.deleteMessage();
  let startMainMenu = "Bienvenue, veuillez indiquer votre présence physique de l'epfl";
  var previousData = menu.serialize({
    action: "goToPage",
    data: { goToPage: currentWeekNumber(-1) },
  });

  var nextData = menu.serialize({
    action: "goToPage",
    data: { goToPage: currentWeekNumber(1) },
  });
  console.log("----------------------------");
  console.log("Nextdata", nextData);
  console.log("----------------------------");
  
});


bot.on("callback_query", async (ctx) => {
  var callback_queryData = JSON.parse(ctx.update.callback_query.data);
  // console.log("---------", callback_queryData.data.goToPage);
  switch (callback_queryData.action) {
    case "goToPage":
      menu.goToPage(callback_queryData.data.goToPage, ctx);
      break;
    case "goToWeek":
      console.log(callback_queryData.data.weekNumber);
      break;
    default:
      break;
  }
});

bot.launch();
