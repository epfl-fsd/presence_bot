const { Markup } = require("telegraf");
const fs = require("fs")

module.exports = class Commands {

    constructor(bot){
        var propertyNames = Object.getOwnPropertyNames(Commands.prototype);
        propertyNames.shift()
        propertyNames.forEach(element => {
            bot.command(element, async (ctx) => {
                if (!fs.existsSync("ChatId.txt") && element != "setgroupid") {
                    return ctx.reply('Chat undefined, please choose the chat using /setgroupid')
                }
                let args = ctx.update.message.text.split(" ")
                this[element](ctx, args)
            })
        });
    }

    start(ctx){
        ctx.reply("Welcome my lovely friend, please type /menu to get inline menu");
    }
    
    async menu(ctx){
        if (ctx.update.message.chat.id.toString()[0] === '-') {
            return ctx.reply(`You can't do this command in groups, please use /menu in private conversation to the bot: t.me/${(await ctx.telegram.getMe()).username}`)
        }
        (new (require("./Menu"))("")).sendMenu(ctx);
    }
    setgroupid(ctx, args){
        let argChatId = args[1]
        let ctxChatId = ctx.update.message.chat.id
        if (argChatId == undefined) {
            fs.writeFileSync("ChatId.txt", ctxChatId.toString())
            ctx.reply(`Group ID Successfully set to ${ctxChatId}`)
        } else {
            fs.writeFileSync("ChatId.txt", argChatId.toString())
            ctx.reply(`Successfully set to ${argChatId}`)
        }
    }
}
