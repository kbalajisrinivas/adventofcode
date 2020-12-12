const utils = require("../utils");

let fileContent = utils.readFile("day9.txt");

let input = fileContent.map((x) => parseInt(x, 10));

let preambleLength = 25;

let result = 0;
for (let i = preambleLength; i < input.length; i++) {
    let currentNumber = input[i];
    let subArray = (input.slice(i - preambleLength, i)).sort((a, b) => a - b);
    let isValidSum = findNumbers(0, preambleLength-1, subArray, currentNumber);
    if (!isValidSum) {
        result = currentNumber;
        break;
    }
}


let counter = 0;
let left = 0;
let localSum = 0;
while(counter < input.length){
    localSum = localSum + input[counter];
    if(localSum === result){
        break;
    }
    if(localSum < result){
        //don't do anything
    }
    if(localSum > result){
        //keep the left moving until localSum is less than result
        while(localSum > result){
            localSum = localSum - input[left];
            left++;
        }
        if(localSum === result){
            break;
        }
    }
    counter++;
}

let subArray = input.slice(left, counter+1);
subArray.sort((a,b)=>a-b);
let weakness = subArray[0] + subArray[subArray.length-1];
console.log(weakness);

function findNumbers(left, right, numbers, target) {
    let sum = 0;
    while (left < right) {
        sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [numbers[left], numbers[right]];
        }
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return null;
}

console.log(fileContent);



function abcd(){
    return {
        a:1,
        b:2
    }
}

let x1 = new abcd();
console.log(x1);