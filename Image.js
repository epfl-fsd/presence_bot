
const storage = new (require("./Storage"))("./data.json");
const xml2js = require("xml2js");
var parseString = xml2js.parseString
var builder = new xml2js.Builder();
const fs = require("fs");
var randomstring = require("randomstring");

class Image{
    constructor(input, output){
        this.input = input
        this.output = output
        this.defaultTxt = JSON.parse(fs.readFileSync("./image/userSample.json").toString()).arr
        this.readyToInsertValues = {}
    }

    insertValuesFromModel(values, ctx){
        let output = this.output
        let insertValues = this.readyToInsertValues
        let randomID = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
        })
        let imagePath = `./image/generated/${randomID}.svg`
        parseString(fs.readFileSync(this.input).toString(), function (err, result) {
            result.svg.g[0].text = values
            fs.writeFileSync(imagePath, builder.buildObject(result))
        })
        return imagePath
    }

    replaceIntermetiate(svgUserId, day, period){
        let fieldId = svgUserId
        this.replaceText()
    }

    get(year, week, ctx){
        let imgPath = this.replaceIteration(year, week, ctx)
        
        return imgPath;
    }

    replaceIteration(year, week, ctx){
        let weekArr = storage.getWeekData(year, week)
        let txtValuesArray = []
        var i = 0
        // for every user of the week
        for (const [key, value] of Object.entries(weekArr)) {
            var tmpArr = JSON.parse(fs.readFileSync("./image/userSample.json").toString()).arr
           tmpArr[0]._ = key
           tmpArr[1]._ = value[0].am ? "✅" : "❌"
           tmpArr[2]._ = value[0].pm ? "✅" : "❌"
           tmpArr[3]._ = value[1].am ? "✅" : "❌"
           tmpArr[4]._ = value[1].pm ? "✅" : "❌"
           tmpArr[5]._ = value[2].am ? "✅" : "❌"
           tmpArr[6]._ = value[2].pm ? "✅" : "❌"
           tmpArr[7]._ = value[3].am ? "✅" : "❌"
           tmpArr[8]._ = value[3].pm ? "✅" : "❌"
           tmpArr[9]._ = value[4].am ? "✅" : "❌"
           tmpArr[10]._ = value[4].pm ? "✅" : "❌"

           tmpArr.map(e => {
               e.$.y = parseInt(e.$.y) + 200 * i
           })
           tmpArr.forEach((element,h) => {
               txtValuesArray.push(element)
           });
           i++
        }

        return this.insertValuesFromModel(txtValuesArray, ctx)
    }
}    

module.exports = Image
