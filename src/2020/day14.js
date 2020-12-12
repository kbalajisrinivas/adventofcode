const utils = require("../utils");

const fileContents = utils.readFile("day14.txt");


let result = solvePart1(fileContents);
console.log(result);

function solvePart1(fileContent) {

    let counter = 0;
    let allMemory = {};
    let allMemoryResult = {};
    while (counter < fileContent.length) {

        let maskRow = fileContent[counter];
        let maskString = maskRow.split("=")[1].trim();
        counter = counter + 1;

        while (counter < fileContent.length && !fileContent[counter].includes("mask")) {
            //process each row
            const memoryRow = fileContent[counter].split("=");
            const keyPart = memoryRow[0].trim();
            const valuePart = memoryRow[1].trim();
            const memoryIndex = parseInt(keyPart.substring(keyPart.indexOf("[") + 1, keyPart.indexOf("]")), 10);
            allMemory[memoryIndex] = valuePart;
            let maskedNumber = maskNumber(valuePart, maskString);
            allMemoryResult[memoryIndex] = maskedNumber;
            console.log(maskedNumber);
            counter++;
        }
        console.log(allMemory);
    }

    let sum = 0;
    for(const [key,value] of Object.entries(allMemoryResult)){
        sum = sum + value;
    }

    return sum;
    
}


function maskNumber(input, mask) {
    let decimalNumber = parseInt(input,10).toString(2);

    input = decimalNumber.toString().split("");

    //mask length 10

    //input length  2 (need to add 8 zeros)

    let difference = mask.length - input.length;
    let inputArray = new Array(difference).fill(0);

    for (let i = 0; i < input.length; i++) {
        inputArray.push(input[i]);
    }
    let j = mask.length - 1;
    while (j >= 0) {

        if (mask[j] !== "X") {
            inputArray[j] = mask[j]
        }
        j--;
    }
    let decimal = parseInt(inputArray.join(""),2);
    return decimal;
}
console.log(fileContents);