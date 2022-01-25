const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");
const fs = require("fs");
const Menu = require("./Menu");
const image = new (require("./Image"))("./image/template.svg", "");
const storage = new (require("./Storage"))("./data.json");

var menu = new Menu(
  "Bienvenue, veuillez indiquer votre présence physique de l'epfl"
);

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  ctx.reply("Welcome my lovely friend");
  return ctx.replyWithPhoto({
    source: fs.createReadStream(await image.get(2022, 5, storage, ctx)),
  });
});

bot.command("inline", (ctx) => {
  return menu.sendMenu(ctx);
});

bot.on("callback_query", async (ctx) => {
  var callback_queryData = JSON.parse(ctx.update.callback_query.data);
  switch (callback_queryData.action) {
    case "goToPage":
      menu.goToPage(callback_queryData.data, ctx);
      break;
    case "goToWeek":
      var userId = ctx.update.callback_query.from.id;
      var data = callback_queryData.data;
      // checkDays(storage, data, userId);
      console.log(storage.obj[data[0]]);

      menu.sendWeekDays(data, storage, ctx);
      break;
    case "togglePresence":
      var userId = ctx.update.callback_query.from.id;
      var data = callback_queryData.data;
      // checkDays(storage, data, userId)
      console.log(data);

      // console.log("data2", storage.obj[data[0]][data[1]][userId]);

      let tmpWeekObj = {
        year: data[0],
        week: data[1],
        perPage: 4,
      };
      let presenceState = storage.getPresence(
        data[0],
        data[1],
        userId,
        data[2],
        data[3]
      )
        ? false
        : true;
      storage.setPresence(
        data[0],
        data[1],
        userId,
        data[2],
        data[3],
        presenceState
      );
      menu.sendWeekDays(tmpWeekObj, storage, ctx);

      break;
    default:
      break;
  }
});

function checkDays(storage, data, userId) {
  storage.obj[data[0]] =
    typeof storage.obj[data[0]] === "undefined" ? {} : storage.obj[data[0]];
  storage.obj[data[0]][data[1]] =
    typeof storage.obj[data[0]][data[1]] === "undefined"
      ? {}
      : storage.obj[data[0]][data[1]];
  storage.obj[data[0]][data[1]][userId] =
    typeof storage.obj[data[0]][data[1]][userId] === "undefined"
      ? {}
      : storage.obj[data[0]][data[1]][userId];
  storage.obj[data[0]][data[1]][userId][data[2]] =
    typeof storage.obj[data[0]][data[1]][userId][data[2]] === "undefined"
      ? {}
      : storage.obj[data[0]][data[1]][userId][data[2]];
  if (
    typeof storage.obj[data[0]][data[1]][userId][data[2]][data[3]] ===
    "undefined"
  ) {
    storage.obj[data[0]][data[1]][userId][data[2]][data[3]] = true;
  } else if (storage.obj[data[0]][data[1]][userId][data[2]][data[3]] === true) {
    storage.obj[data[0]][data[1]][userId][data[2]][data[3]] = false;
  } else if (
    storage.obj[data[0]][data[1]][userId][data[2]][data[3]] === false
  ) {
    storage.obj[data[0]][data[1]][userId][data[2]][data[3]] = undefined;
  }
  storage.save();
}

// console.log(3/2);
// console.log(Math.ceil(13/4));

//lunch

bot.launch();
