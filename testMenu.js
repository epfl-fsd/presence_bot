const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");
const Menu = require("./Menu");
const storage = new (require("./Storage"))("./data.json");

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
    case "togglePresence":
      var userId = ctx.update.callback_query.from.id;
      var data = callback_queryData.data
      // console.log("-------", data, "--------");
      // console.log("-------", userId, "--------");
      // var valueToChange = storage.obj[data[0]][data[1]][userId][data[2]][data[3]];
      // console.log(storage.obj);
      storage.obj[data[0]] = typeof storage.obj[data[0]] === 'undefined' ? {} : storage.obj[data[0]];
      // console.log(storage.obj[data[0]]);
      storage.obj[data[0]][data[1]] = typeof storage.obj[data[0]][data[1]] === 'undefined' ? {} : storage.obj[data[0]][data[1]];
      storage.obj[data[0]][data[1]][userId] = typeof storage.obj[data[0]][data[1]][userId] === 'undefined' ? {} : storage.obj[data[0]][data[1]][userId];
      // console.log("data1", storage.obj[data[0]][data[1]]); 
      // console.log("data1,5 user", storage.obj[data[0]][data[1]][userId]); 
      storage.obj[data[0]][data[1]][userId][data[2]] = typeof storage.obj[data[0]][data[1]][userId][data[2]] === 'undefined' ? {} : storage.obj[data[0]][data[1]][userId][data[2]];
      
      // storage.obj[data[0]][data[1]][userId][data[2]][data[3]] = typeof storage.obj[data[0]][data[1]][userId][data[2]][data[3]] === 'undefined' ? {} : storage.obj[data[0]][data[1]][userId][data[2]][data[3]];
      // console.log(storage.obj);
      console.log("test", storage.obj[data[0]][data[1]][userId]);
      
      // storage.obj[data[0]][data[1]][userId][data[2]][data[3]] == undefined ? {} : storage.obj[data[0]][data[1]][data[2]][data[3]];
      if (typeof storage.obj[data[0]][data[1]][userId][data[2]][data[3]] === 'undefined') {
        storage.obj[data[0]][data[1]][userId][data[2]][data[3]] = true
      } else if (storage.obj[data[0]][data[1]][userId][data[2]][data[3]] === true) {
        storage.obj[data[0]][data[1]][userId][data[2]][data[3]] = false;
      } else if (storage.obj[data[0]][data[1]][userId][data[2]][data[3]] === false) {
        storage.obj[data[0]][data[1]][userId][data[2]][data[3]] = undefined;
      }
      
      console.log("data2", storage.obj[data[0]][data[1]][userId][data[2]]); 
      
      storage.save()
      break;
    default:
      break;
  }
});

// console.log(3/2);
// console.log(Math.ceil(13/4));

//lunch


bot.launch();
