const xml2js = require("xml2js");
var parseString = xml2js.parseString;
var builder = new xml2js.Builder();
const fs = require("fs");
const { convertFile } = require("convert-svg-to-jpeg");
var randomstring = require("randomstring");

class Image {
  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.defaultTxt = JSON.parse(
      fs.readFileSync("./image/userSample.json").toString()
    ).arr;
    this.readyToInsertValues = {};
  }

  insertValuesFromModel(values, ctx) {
    let output = this.output;
    let insertValues = this.readyToInsertValues;
    let randomID = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });
    let imagePath = `./image/generated/${randomID}.svg`;
    parseString(fs.readFileSync(this.input).toString(), function (err, result) {
      result.svg.g[0].text = values;
      if (!fs.existsSync('./image/generated')) {
        fs.mkdirSync('./image/generated')
      }
      fs.writeFileSync(imagePath, builder.buildObject(result));
    });
    return imagePath;
  }

  async get(year, week, storage, ctx) {
    let imgPath = await this.replaceIteration(year, week, storage, ctx);
    const inputFilePath = imgPath;
    const outputFilePath = await convertFile(inputFilePath);
    fs.rm(inputFilePath, (err)=>console.log(err))
    return outputFilePath;
  }

  async replaceIteration(year, week, storage, ctx) {
    let weekArr = storage.getWeekData(year, week, ctx.update.callback_query.from.id);
    let txtValuesArray = [];
    var i = 0;
    // for every user of the week
    for (const [key, value] of Object.entries(weekArr)) {
      try {
        var tmpArr = JSON.parse(
          fs.readFileSync("./image/userSample.json").toString()
        ).arr;
        tmpArr[0]._ = (await ctx.telegram.getChatMember(fs.readFileSync("./ChatId.txt").toString(), key)).user.username
        tmpArr[1]._ = value[0].am ? "✅" : "❌";
        tmpArr[2]._ = value[0].pm ? "✅" : "❌";
        tmpArr[3]._ = value[1].am ? "✅" : "❌";
        tmpArr[4]._ = value[1].pm ? "✅" : "❌";
        tmpArr[5]._ = value[2].am ? "✅" : "❌";
        tmpArr[6]._ = value[2].pm ? "✅" : "❌";
        tmpArr[7]._ = value[3].am ? "✅" : "❌";
        tmpArr[8]._ = value[3].pm ? "✅" : "❌";
        tmpArr[9]._ = value[4].am ? "✅" : "❌";
        tmpArr[10]._ = value[4].pm ? "✅" : "❌";

        tmpArr.map((e) => {
          e.$.y = parseInt(e.$.y) + 200 * i;
        });
        tmpArr.forEach((element, h) => {
          txtValuesArray.push(element);
        });
        i++;  
      } catch (error) {
        console.log(error) 
      }
    }

    return this.insertValuesFromModel(txtValuesArray, ctx);
  }
}

module.exports = Image;
