const fs = require('fs')
class Storage {
  constructor(filePath) {
    this.filePath = filePath;
    this.obj = this.load();
  }

  getWeekData(year, week){
    try {
      return this.obj[year][week]
    } catch (error) {
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
    console.log(this);
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
    fs.writeFileSync(this.filePath, JSON.stringify(this.obj));
  }
  fileExists() {
    return fs.existsSync(this.filePath) ? true : false;
  }
}
module.exports = Storage
