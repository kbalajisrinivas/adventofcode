
var fs = require('fs');
// this returns the filelines an array
function readFile(fileName) {
    console.log(process.cwd());
    const result = fs.readFileSync(`src/Input/${fileName}`,'UTF-8').toString().split("\n");
    return result;
}

module.exports = { readFile };