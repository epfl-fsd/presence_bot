const fs = require('fs')
class Storage {
  constructor(filePath) {
    this.filePath = filePath;
    this.obj = this.load();
  }

  //   update(year, week, day, period, value){
  //     this.obj[year][week][day][period] = value
  //     this.save()
  //   }
  getPresence(year, week, user, day, period) {
    // !storage.obj[weekObj.year][weekObj.week][ctx.update.callback_query.from.id][i]

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
