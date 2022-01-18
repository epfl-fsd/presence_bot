class DateSemaines {
  static nextPage(weekObj) {
    return this.changeWeek(weekObj, weekObj.perPage);
  }

  static previousPage(weekObj) {
    return this.changeWeek(weekObj, weekObj.perPage * -1);
  }

  static getNew(perPage) {
    return {
      year: Number(new Date().toISOString().substring(0, 4)),
      week: this.currentWeekNumber(),
      perPage: perPage,
    };
  }

  static changeWeek(weekObj, offset) {
    var tmpYear = weekObj.year;
    var tmpWeek = weekObj.week;
    var weekSum = tmpWeek + offset;
    if (weekSum > 52) {
      tmpWeek = weekSum - 52;
    } else if (weekSum < 0) {
      tmpWeek = 52 + offset;
    } else if (weekSum == 0) {
      tmpWeek = 52;
    } else if (weekSum > 0 && weekSum <= 52) {
      tmpWeek = tmpWeek + offset;
    }
    if (!(weekSum > 0 && weekSum <= 52)) {
      if (Math.sign(offset) == 1) {
        tmpYear++;
      } else {
        tmpYear--;
      }
    }
    return {
      year: tmpYear,
      week: tmpWeek,
      perPage: weekObj.perPage,
    };
  }

  static currentWeekNumber() {
    let startDate = new Date();
    let onejan = new Date(startDate.getFullYear(), 0, 1);
    let week = Math.ceil(
      ((startDate.getTime() - onejan.getTime()) / 86400000 +
        onejan.getDay() +
        1) /
        7
    );
    if (week > 52) {
      week = week - 52;
    }
    return week;
  }
}

module.exports = DateSemaines
