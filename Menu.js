const { load } = require("nodemon/lib/config");
const { Markup } = require("telegraf");
const DateSemaines = require("./DateSemaines");
const fs = require("fs");
const storage = new (require("./Storage"))("./data.json");
const image = new (require("./Image"))("./image/template.svg", "");


class Menu {
  constructor(txtMessage) {
    this.currentPage = 1;
    this.txtMessage = txtMessage;
  }

  sendMenu(ctx) {
    var weekObj = DateSemaines.getNew(4);
    var weekObj = DateSemaines.getNew(4);
    return ctx.replyWithPhoto({
      source: fs.createReadStream("./image/banniereAccueil.png"),
    },
    {
      caption: this.txtMessage,
      parse_mode: "HTML",
        ...Markup.inlineKeyboard(this.getInlineWeekMenu(weekObj)),
    });
  }

  displayDays(ctx, weekNumber) {
    // return "toto"
    return ctx.reply(this.txtMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(this.getInlineWeekMenu(weekNumber)),
    });
  }

  async updateMessage(ctx, noPage) {
    // return "toto"
      let source = fs.createReadStream("./image/banniereAccueil.png")

     let startMainMenu = ""
    try {
      await ctx.editMessageMedia(
      {
      type: 'photo',
      media: {source},
      caption: startMainMenu,
      },
      {
      parse_mode: "HTML",
        ...Markup.inlineKeyboard(this.getInlineWeekMenu(noPage)),
    });
    } catch (error) {
      
    }
    

  }
  updateWeek(weekObj, storage, ctx) {
    // return "toto"
      var replyValue = this.getWeekDays(weekObj, storage, ctx);
    return ctx.editMessageText(this.txtMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(replyValue),
    });
  }

  updateJours() {}

  goToPage(weekObj, ctx) {
    // return "toto"
    this.updateMessage(ctx, weekObj);
  }

  getInlineWeekMenu(weekObj) {
    var finalArray = [];
    var nbentries = 4;
    var weekArray = [];
    for (let i = 0; i < weekObj.perPage; i++) {
      let weekNumber = this.offsetWeek(weekObj.week, i);
      weekArray = [];
      weekArray.push(
        Markup.button.callback(
          `Semaine : ${weekNumber}`,
          this.serialize({
            action: "goToWeek",
            data: DateSemaines.changeWeek(weekObj, i),
          })
        )
      );
      finalArray.push(weekArray);
    }

    var navbarArray = [];
    var previousData = this.serialize({
      action: "goToPage",
      data: DateSemaines.previousPage(weekObj),
    });

    var nextData = this.serialize({
      action: "goToPage",
      data: DateSemaines.nextPage(weekObj),
    });

    var previousButton = Markup.button.callback("Semaines précédentes", previousData);
    var nextButton = Markup.button.callback("Semaines suivantes", nextData);
    navbarArray.push(previousButton);
    navbarArray.push(nextButton);
    finalArray.push(navbarArray);
    return finalArray;
  }

  async sendWeekDays(weekObj, storage, ctx) {
    let source = fs.createReadStream(await image.get(weekObj.year, weekObj.week, storage, ctx))
    let startMainMenu = "";
    try {
      await ctx.editMessageMedia(
        {
        type: 'photo',
        media: {source},
        caption: startMainMenu,
        },
        {
        parse_mode: "HTML",
          ...Markup.inlineKeyboard(this.getWeekDays(weekObj, storage, ctx).reply_markup.inline_keyboard),
      });

    } catch (error) {
      
    }
    
  }
  getWeekDays(weekObj, storage, ctx) {

    // var weekDaysValues = this.getWeekDaysValues(weekObj, storage, ctx);
    let user = ctx.update.callback_query.from.id;
    return {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Lundi : ${this.nextDay(0, weekObj.week, weekObj.year)}`,
              callback_data: "[]",
            },
          ],
          [
            {
              text: `Matin ${storage.getPresence(weekObj.year, weekObj.week, user, 0, "am") ? "✅" : "❌"}`,
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 0, "am"],
              }),
            },
            {
              text: `Après-midi ${storage.getPresence(weekObj.year, weekObj.week, user, 0, "pm") ? "✅" : "❌"}`,
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 0, "pm"],
              }),
            },
          ],
          [
            {
              text: `Mardi : ${this.nextDay(1, weekObj.week, weekObj.year)}`,
              callback_data: "[]",
            },
          ],
          [
            {
              text: `Matin ${storage.getPresence(weekObj.year, weekObj.week, user, 1, "am") ? "✅" : "❌"}`,
              // year, week, day, period, value
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 1, "am"],
              }),
            },
            {
              text: `Après-midi ${storage.getPresence(weekObj.year, weekObj.week, user, 1, "pm") ? "✅" : "❌"}`,
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 1, "pm"],
              }),
            },
          ],
          [
            {
              text: `Mercredi : ${this.nextDay(2, weekObj.week, weekObj.year)}`,
              callback_data: "[]",
            },
          ],
          [
            {
              text: `Matin ${storage.getPresence(weekObj.year, weekObj.week, user, 2, "am") ? "✅" : "❌"}`,
              // year, week, day, period, value
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 2, "am"],
              }),
            },
            {
              text: `Après-midi ${storage.getPresence(weekObj.year, weekObj.week, user, 2, "pm") ? "✅" : "❌"}`,
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 2, "pm"],
              }),
            },
          ],
          [
            {
              text: `Jeudi : ${this.nextDay(3, weekObj.week, weekObj.year)}`,
              callback_data: "[]",
            },
          ],
          [
            {
              text: `Matin ${storage.getPresence(weekObj.year, weekObj.week, user, 3, "am") ? "✅" : "❌"}`,
              // year, week, day, period, value
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 3, "am"],
              }),
            },
            {
              text: `Après-midi ${storage.getPresence(weekObj.year, weekObj.week, user, 3, "pm") ? "✅" : "❌"}`,
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 3, "pm"],
              }),
            },
          ],
          [
            {
              text: `Vendredi : ${this.nextDay(4, weekObj.week, weekObj.year)}`,
              callback_data: "[]",
            },
          ],
          [
            {
              text: `Matin ${storage.getPresence(weekObj.year, weekObj.week, user, 4, "am") ? "✅" : "❌"}`,
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 4, "am"],
              }),
            },
            {
              text: `Après-midi ${storage.getPresence(weekObj.year, weekObj.week, user, 4, "pm") ? "✅" : "❌"}`,
              callback_data: this.serialize({
                action: "togglePresence",
                data: [weekObj.year, weekObj.week, 4, "pm"],
              }),
            },
          ],
          [
            {
              text: "← retour au menu",
              callback_data: this.serialize({
                action: "goToPage", 
                data: weekObj,
              }),
            },
          ],
        ],
      },
    };
  }

  getDayAmPm() {}

  serialize(object) {
    return JSON.stringify(object);
  }

  deSerialize(object) {
    return JSON.parse(object);
  }

  currentWeekNumber(increment, offset) {
    if (offset) {
      increment = increment + offset;
    }
    let startDate = new Date();
    let onejan = new Date(startDate.getFullYear(), 0, 1);
    let week = Math.ceil(
      ((startDate.getTime() - onejan.getTime()) / 86400000 +
        onejan.getDay() +
        1) /
        7
    );
    week += increment;
    // todo: manage the reverse operation (if week == 1 and negative offset)
    if (week > 52) {
      week = week - 52;
    }
    return week;
  }

  offsetWeek(currentWeek, offset) {
    var resultWeek = currentWeek + offset;
    if (resultWeek > 52) {
      resultWeek = resultWeek - 52;
    }
    if (resultWeek < 0) {
      resultWeek = 52 + offset;
    }
    if (resultWeek == 0) {
      resultWeek = 52;
    }
    return resultWeek;
  }

  nextDay(dayOfTheWeek, week, year) {
    date = new Date(this.currentDay(week, year));
    date.setDate(date.getDate() + dayOfTheWeek);
    var date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return date;
  }

  currentDay(week, year) {
    // var year = new Date().getFullYear();
    // Create a date for 1 Jan in required year
    var d = new Date(year, 0);
    // Get day of week number
    var dayNum = d.getDay();
    // Get days to add
    var requiredDate = (week - 2) * 7;
    // For ISO week numbering
    // If 1 Jan is Friday to Sunday, go to next week
    if (dayNum != 0 || dayNum > 4) {
      requiredDate += 7;
    }
    // Add required number of days
    d.setDate(1 - d.getDay() + ++requiredDate);
    return d;
  }
}

module.exports = Menu;
