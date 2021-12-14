const { Markup } = require("telegraf");

// var arraySemaines = [
//   "semaine 1",
//   "semaine 2",
//   "semaine 3",
//   "semaine 4",
//   "semaine 5",
//   "semaine 6",
//   "semaine 7",
//   "semaine 8",
//   "semaine 9",
//   "semaine 10",
//   "semaine 11",
//   "semaine 12",
//   "semaine 13",
//   "semaine 14",
//   "semaine 15",
//   // "semaine 16",
// ];




class Menu {
  constructor(txtMessage) {
    this.currentPage = 1;
    // this.listeSemaines = arraySemaines;
    this.txtMessage = txtMessage;
  }

  sendMenu(ctx) {
    var weekNumber = this.currentWeekNumber(0);

    return ctx.reply(this.txtMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(this.getInlineWeekMenu(weekNumber)),
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

  getInlineWeekMenu(refWeekNumber) {
    console.log("-----aaaaaaaaaaaaaaa-----------------");
    var finalArray = [];
    var nbentries = 4;
    // var offset = (noPage - 1) * 4;

    // if (this.isLastPage(noPage)) {
    //   if (Math.ceil(this.listeSemaines.length % 4) != 0) {
    //     nbentries = this.listeSemaines.length % 4;
    //   }
    // }

    var weekArray = [];
    for (let i = 0; i < nbentries; i++) {
      let weekNumber = this.offsetWeek(refWeekNumber, i);
      weekArray = [];
      weekArray.push(
        Markup.button.callback(
          `Semaine : ${weekNumber}`,
          this.serialize({
            action: "goToWeek",
            data: { weekNumber: weekNumber },
          })
        )
      );
      finalArray.push(weekArray);
    }

    var navbarArray = [];
    var previousData = this.serialize({
      action: "goToPage",
      data: { goToPage: this.offsetWeek(refWeekNumber, -4) },
    });

    var nextData = this.serialize({
      action: "goToPage",
      data: { goToPage: this.offsetWeek(refWeekNumber, 4) },
    });

    var previousButton = Markup.button.callback("Previous", previousData);
    var nextButton = Markup.button.callback("Next", nextData);
    // if (this.isFirstPage(refWeekNumber)) {
    //   navbarArray.push(nextButton);
    // } else if (this.isLastPage(refWeekNumber)) {
    //   navbarArray.push(previousButton);
    // } else {
      navbarArray.push(previousButton);
      navbarArray.push(nextButton);
    // }
    finalArray.push(navbarArray);
    return finalArray;
  }

  isLastPage(noPage) {
    // if (noPage == Math.ceil(this.listeSemaines.length / 4)) {
    //   return true;
    // } else {
    //   return false;
    // }
    return false;
  }

  isFirstPage(noPage) {
    // if (noPage <= 1) {
    //   return true;
    // } else {
    //   return false;
    // }
    return false;
  }

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
    return resultWeek;
  }
}

module.exports = Menu
