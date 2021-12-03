const { Telegraf } = require('telegraf');
const { Markup } = require("telegraf");

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) =>{
    ctx.reply('Welcome my lovely computer scientist')
});

//DATE
function nextweek(){
  date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}
function lastweek(){
  date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}
function nextMonday() {
  date=new Date();
  date.setDate(date.getDate() + 1 + (7-date.getDay())%7);
  return date;
}

//GET WEEK AND NEXT WEEK
function currentWeekNumber(increment){
  let startDate = new Date();
  let onejan = new Date(startDate.getFullYear(), 0, 1);
  let week = Math.ceil((((startDate.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 );
  week += increment 
  if(week > 52){
    week = week -52;
  }
 return week
}

//INLINE QUERY //MAIN MENU
bot.command("test", ctx =>{
    ctx.deleteMessage();
    let startMainMenu = "Bienvenue, veuillez indiquer votre présence physique de l'epfl";
    bot.telegram.sendMessage(ctx.chat.id, startMainMenu, 
    {
        reply_markup:{
            inline_keyboard: [  
                [
                  { text: `Semaine : ${currentWeekNumber(0)}`, callback_data : "week1"}
                ],
                [
                  { text: `Semaine : ${currentWeekNumber(1)}`, callback_data : "week2"}
                ],
                [
                  { text: `Semaine : ${currentWeekNumber(2)}`, callback_data : "week3"}
                ],
                [
                  { text: `Semaine : ${currentWeekNumber(3)}`, callback_data : "week4"}
                ],
                [
                  { text: "<--", callback_data : "back"},
                  { text: "-->", callback_data : "next"}
                ]
            ]
        }
    }
    )
})

//DATEMENU
bot.command("test2", ctx =>{
  ctx.deleteMessage();
  let startMainMenu = "Veuillez selectionner les jours souhaité";
  bot.telegram.sendMessage(ctx.chat.id, startMainMenu, 
  {
    reply_markup:{
        inline_keyboard: [
            [
              { text: "Lundi : ${date}", callback_data : "date1"}
            ],
            [
              { text: "AM", callback_data : "date1_AM"},
              { text: "PM", callback_data : "date1_PM"}
            ],
            [
              { text: "Date2", callback_data : "date2"}
            ],
            [
              { text: "AM", callback_data : "date2_AM"},
              { text: "PM", callback_data : "date2_PM"}
            ],
            [
              { text: "Date3", callback_data : "date3"}
            ],
            [
              { text: "AM", callback_data : "date3_AM"},
              { text: "PM", callback_data : "date3_PM"}
            ],
            [
              { text: "Date4", callback_data : "date4"}
            ],
            [
              { text: "AM", callback_data : "date4_AM"},
              { text: "PM", callback_data : "date4_PM"}
            ],
            [
              { text: "Date5", callback_data : "date5"}
            ],
            [
              { text: "AM", callback_data : "date5_AM"},
              { text: "PM", callback_data : "date5_PM"}
            ],
            [
              { text: "<--", callback_data : "back"},
            ]
        ]
    }
  }
  )
})

bot.action("week1", async (ctx) => {
  console.log("toto")
})

// bot.on("callback_query", async (ctx) => {
//   console.log(ctx.update.callback_query.id);
//   console.log(ctx.update.callback_query.data);
//   switch (ctx.update.callback_query.data) {
//     case "Semaine 1":
//       ctx.reply("Good choice !");
//       break;

//     case "Semaine 2":
//       bot.telegram.answerCbQuery(
//         ctx.update.callback_query.id,
//         "Please make the good choice, otherwise you would loose..."
//       );
//       break;

//     default:
//       break;
//   }
// });
//lunch
bot.launch()
