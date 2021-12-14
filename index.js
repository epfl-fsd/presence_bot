const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

//Starting the bot
bot.start((ctx) => {
  ctx.reply("Welcome my lovely computer scientist");
});

//GENERATE WEEK NUMBER
function currentWeekNumber(increment) {
  let startDate = new Date();
  let onejan = new Date(startDate.getFullYear(), 0, 1);
  let week = Math.ceil(((startDate.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  week += increment;
  if (week > 52) {
    week = week - 52;
  }
  return week;
}

//GENERATE DATE
function currentDay(week) {
  var year = new Date().getFullYear();
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

//FORMATTING DATE AND GENERATE THE RIGHT DATE ACCORDING TO THE WEEK NUMBER
function nextDay(dayOfTheWeek, week) {
  date = new Date(currentDay(week));
  date.setDate(date.getDate() + dayOfTheWeek);
  var date =
    date.getFullYear() + "-" + date.getDate() + "-" + (date.getMonth() + 1);
  return date;
}

//INLINE QUERY //MAIN MENU
bot.command("test", (ctx) => {
  ctx.deleteMessage();
  let startMainMenu = "Bienvenue, veuillez indiquer votre présence physique de l'epfl";
  bot.telegram.sendMessage(ctx.chat.id, startMainMenu, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Semaine : ${currentWeekNumber(0)}`,
            callback_data: `week-${currentWeekNumber(0)}`,
          },
        ],
        [
          {
            text: `Semaine : ${currentWeekNumber(1)}`,
            callback_data: `week-${currentWeekNumber(1)}`,
          },
        ],
        [
          {
            text: `Semaine : ${currentWeekNumber(2)}`,
            callback_data: `week-${currentWeekNumber(2)}`,
          },
        ],
        [
          {
            text: `Semaine : ${currentWeekNumber(3)}`,
            callback_data: `week-${currentWeekNumber(3)}`,
          },
        ],
        [
          { text: "<--", callback_data: "back" },
          { text: "-->", callback_data: "next" },
        ],
      ],
    },
  });
});

//TRIGGERING THE DISPLAY OF THE SECOND MENU
bot.action(/^week-(.*)/, async (ctx) => {
  selectedWeekNumber = ctx.match[1];
  let startMainMenu = "Veuillez selectionner les jours souhaité";
  bot.telegram.sendMessage(ctx.chat.id, startMainMenu, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Lundi : ${nextDay(0, selectedWeekNumber)}`,
            callback_data: "date1",
          },
        ],
        [
          { text: "AM", callback_data: "date1_AM" },
          { text: "PM", callback_data: "date1_PM" },
        ],
        [
          {
            text: `Mardi : ${nextDay(1, selectedWeekNumber)}`,
            callback_data: "date2",
          },
        ],
        [
          { text: "AM", callback_data: "date2_AM" },
          { text: "PM", callback_data: "date2_PM" },
        ],
        [
          {
            text: `Mercredi : ${nextDay(2, selectedWeekNumber)}`,
            callback_data: "date3",
          },
        ],
        [
          { text: "AM", callback_data: "date3_AM" },
          { text: "PM", callback_data: "date3_PM" },
        ],
        [
          {
            text: `Jeudi : ${nextDay(3, selectedWeekNumber)}`,
            callback_data: "date4",
          },
        ],
        [
          { text: "AM", callback_data: "date4_AM" },
          { text: "PM", callback_data: "date4_PM" },
        ],
        [
          {
            text: `Vendredi : ${nextDay(4, selectedWeekNumber)}`,
            callback_data: "date5",
          },
        ],
        [
          { text: "AM", callback_data: "date5_AM" },
          { text: "PM", callback_data: "date5_PM" },
        ],
        [{ text: "<--", callback_data: "back" }],
      ],
    },
  });
});

bot.launch();
