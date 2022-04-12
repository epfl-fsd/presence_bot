const fs = require('fs')
class Storage {
  constructor(filePath) {
    this.filePath = filePath;
    this.obj = this.load();
  }

  getWeekData(year, week, user){
    try {
      if (this.obj[year] == undefined || this.obj[year][week] == undefined) {
        for (let i = 0; i < 5; i++) {
          this.getPresence(year, week, user, i, "am")  
          this.getPresence(year, week, user, i, "pm")  
        }
      } 
      return this.obj[year][week]
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  getPresence(year, week, user, day, period) {
    if (!this.obj[year]) {
      this.obj[year] = {};
    }
    if (!this.obj[year][week]) {
      this.obj[year][week] = {};
    }
    if (!this.obj[year][week][user]) {
      this.obj[year][week][user] = {};
    }
    if (!this.obj[year][week][user][day]) {
      this.obj[year][week][user][day] = {};
    }
    if (!this.obj[year][week][user][day][period]) {
      this.obj[year][week][user][day][period] = false;
    }
    this.save();
    return this.obj[year][week][user][day][period];
  }

  setPresence(year, week, user, day, period, status) {
    if (!this.obj[year]) {
      this.obj[year] = {};
    }
    if (!this.obj[year][week]) {
      this.obj[year][week] = {};
    }
    if (!this.obj[year][week][user]) {
      this.obj[year][week][user] = {};
    }
    if (!this.obj[year][week][user][day]) {
      this.obj[year][week][user][day] = {};
    }
    this.obj[year][week][user][day][period] = status;
    this.save();
  }

  load() {
    if (this.fileExists()) {
      return JSON.parse(fs.readFileSync(this.filePath).toString());
    } else {
      this.obj = {};
      this.save();
      return this.obj
    }
  }
  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.obj, null, 2));
  }
  fileExists() {
    return fs.existsSync(this.filePath) ? true : false;
  }
}
module.exports = Storage
