const util = require("../utils");

const fileContents = util.readFile("day6.txt");

console.log(fileContents);
const groupData = {};

let counter = 0;
let uniqueQuestions = 0;
let everyoneAnsweredYes = 0;

let currentGroupInfo = {};
let prevGroup = 0;
for (let i = 0; i < fileContents.length; i++) {
    const fileContent = fileContents[i];
    if (fileContent === "") {
        groupData[counter] = currentGroupInfo;

        const numberOfGroups = i - prevGroup;
        for(const [key,value] of Object.entries(currentGroupInfo)){
            if(value === numberOfGroups){
                everyoneAnsweredYes++;
            }
        }
        currentGroupInfo = {};
        counter++;
        prevGroup = i+1;
    } else {
        for (let j = 0; j < fileContent.length; j++) {
            const currentCharacter = fileContent[j];
            if (currentGroupInfo[currentCharacter] === undefined) {
                currentGroupInfo[currentCharacter] = 0
            }
            currentGroupInfo[currentCharacter]++;
        }
    }
}
console.log(uniqueQuestions);
