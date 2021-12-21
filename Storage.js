const fs = require('fs')
class Storage {
  constructor(filePath) {
    this.filePath = filePath;
    this.obj = this.load()
  }

  update(year, week, day, period, value){
    this.obj[year][week][day][period] = value 
    this.save()
  }
  
  load() {
      if (this.fileExists()) {
          return JSON.parse(fs.readFileSync(this.filePath).toString())
      } else {
          fs.writeFileSync(this.filePath, "{}")
      }
  }
  save() {
      fs.writeFileSync(this.filePath, JSON.stringify(this.obj)); 
  }
  fileExists(){
    return fs.existsSync(this.filePath) ? true : false
  }


}
module.exports = Storage
