const { Markup } = require("telegraf");
const fs = require("fs")

module.exports = class Commands {

    constructor(bot){
        var propertyNames = Object.getOwnPropertyNames(Commands.prototype);
        propertyNames.shift()
        propertyNames.forEach(element => {
            bot.command(element, (ctx) => {
                let args = ctx.update.message.text.split(" ")
                this[element](ctx, args)
            })
        });
    }

    start(ctx){
        ctx.reply("Welcome my lovely friend, please type /menu to get inline menu");
    }
    
    menu(ctx){
        (new (require("./Menu"))("")).sendMenu(ctx);
    }
}
