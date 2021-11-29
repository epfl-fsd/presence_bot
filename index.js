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



//DATE
function nextweek(){
  return nextweek = new Date(today.getDate() +7);
}
function lastweek(){
  return nextweek = new Date(today.getDate() -7);
}
function currentDate(){
  return today = new Date();
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
                  { text: "Semaine1", callback_data : "week1"}
                ],
                [
                  { text: "Semaine2", callback_data : "week2"}
                ],
                [
                  { text: "Semaine3", callback_data : "week3"}
                ],
                [
                  { text: "Semaine4", callback_data : "week4"}
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
                { text: "Date1", callback_data : "date1"}
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
