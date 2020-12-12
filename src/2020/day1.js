
const utils = require("../utils");

const fileContent = utils.readFile("day1part1.txt");

let entries = fileContent.map(x => parseInt(x, 10));

entries.sort((a, b) => a - b);

let twoNumbers = findNumbers(entries, 2020);

let threeNumbers = find3Numbers(entries, 2020);

console.log(fileContent);

// part 1
function findNumbers(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
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

//part 2

function find3Numbers(entries, target) {
    for (let i = 0; i < entries.length; i++) {
         const currentNumber = entries[i];
         const reminder = target - currentNumber;
         let subArray = entries.slice(i+1, entries.length);
         let result = findNumbers(subArray, reminder);
         if(result !== null){
             return [currentNumber, ...result];
         }
    }
}

