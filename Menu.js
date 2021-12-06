const { Markup } = require("telegraf");

var arraySemaines = [
  "semaine 1",
  "semaine 2",
  "semaine 3",
  "semaine 4",
  "semaine 5",
  "semaine 6",
  "semaine 7",
  "semaine 8",
  "semaine 9",
  "semaine 10",
  "semaine 11",
  "semaine 12",
  "semaine 13",
  "semaine 14",
  "semaine 15",
  // "semaine 16",
];


class Menu {
  constructor(txtMessage) {
    this.currentPage = 1;
    this.listeSemaines = arraySemaines;
    this.txtMessage = txtMessage;
  }

  sendMenu(ctx) {
    return ctx.reply(this.txtMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(this.getInlineWeekMenu(1)),
    });
  }

  updateMessage(ctx, noPage) {
    return ctx.editMessageText(this.txtMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(this.getInlineWeekMenu(noPage)),
    });
  }

  goToPage(noPage, ctx) {
    this.updateMessage(ctx, noPage);
  }


  getInlineWeekMenu(noPage) { 
    var finalArray = [];
    var nbentries = 4;
    var offset = (noPage - 1) * 4;

    if (this.isLastPage(noPage)) {
      if (Math.ceil(this.listeSemaines.length % 4) != 0) {
        nbentries = this.listeSemaines.length % 4;
      }
    }

    var weekArray = [];
    for (let index = 0; index < nbentries; index++) {
      weekArray = [];
      weekArray.push(
        Markup.button.callback(
          this.listeSemaines[index + offset],
          this.listeSemaines[index + offset]
        )
      );
      finalArray.push(weekArray);
    }

    var navbarArray = [];
    var previousData = this.serialize({
      action: "goToPage",
      data: { goToPage: noPage - 1 },
    });

    var nextData = this.serialize({
      action: "goToPage",
      data: { goToPage: noPage + 1 },
    });

    var previousButton = Markup.button.callback("Previous", previousData);
    var nextButton = Markup.button.callback("Next", nextData);
    if (this.isFirstPage(noPage)) {
      navbarArray.push(nextButton);
    } else if (this.isLastPage(noPage)) {
      navbarArray.push(previousButton);
    } else {
      navbarArray.push(previousButton);
      navbarArray.push(nextButton);
    }
    finalArray.push(navbarArray);
    return finalArray;
  }

  isLastPage(noPage) {
    if (noPage == Math.ceil(this.listeSemaines.length / 4)) {
      return true;
    } else {
      return false;
    }
  }

  isFirstPage(noPage) {
    if (noPage <= 1) {
      return true;
    } else {
      return false;
    }
  }

  serialize(object) {
    return JSON.stringify(object);
  }

  deSerialize(object) {
    return JSON.parse(object);
  }
}

module.exports = Menu
