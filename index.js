const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");
const fs = require("fs");
const Menu = require("./Menu");
const image = new (require("./Image"))("./image/template.svg", "");
const storage = new (require("./Storage"))("./data.json");

var menu = new Menu("");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
new(require('./Commands'))(bot)



bot.on("callback_query", async (ctx) => {
  var callback_queryData = JSON.parse(ctx.update.callback_query.data);
  switch (callback_queryData.action) {
    case "goToPage":
      try {
        menu.goToPage(callback_queryData.data, ctx);
      } catch (error) {
        
      }
      break;
    case "goToWeek":
      var userId = ctx.update.callback_query.from.id;
      var data = callback_queryData.data;
      try {
        menu.sendWeekDays(data, storage, ctx);
        
      } catch (error) {
        
      }
      break;
    case "togglePresence":
      var userId = ctx.update.callback_query.from.id;
      var data = callback_queryData.data;

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
      try {
        menu.sendWeekDays(tmpWeekObj, storage, ctx);
      } catch (error) {
      }

      break;
    default:
      break;
  }
});

bot.launch();
