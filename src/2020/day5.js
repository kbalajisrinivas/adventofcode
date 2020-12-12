const utils = require("../utils");

let fileContent = utils.readFile("day5.txt");


// fileContent = ["BBFBFFBRLL", "FFFBBBFRRR", "BBFFBBFRLL"];
console.log(fileContent);

let seatNumbers = [];

for (let i = 0; i < fileContent.length; i++) {
    const currentPassengerInfo = fileContent[i];
    const firstSevenCharacters = currentPassengerInfo.substring(0, 7);
    const lastThreeCharacters = currentPassengerInfo.substring(7, 11);

    let rowNumber = 0;
    let columnNumber = 0;
    let left = 0;
    let right = 127;
    let counter = 0;

    while (left < right) {
        let mid = Math.ceil((left + right) / 2);
        if (firstSevenCharacters[counter] === 'F') {
            right = mid - 1;
        } else {
            left = mid;
        }
        counter++;
    }
    rowNumber = left;

    left = 0;
    right = 7;
    counter = 0;

    while (left < right) {
        let mid = Math.ceil((left + right) / 2);
        if (lastThreeCharacters[counter] === 'L') {
            right = mid - 1;
        } else {
            left = mid;
        }
        counter++;
    }
    columnNumber = left;

    let seatNumber = (rowNumber * 8) + columnNumber;
    seatNumbers.push(seatNumber);
}

let minSeatNumber = Math.min(...seatNumbers);
let maxSeatNumber = Math.max(...seatNumbers);

seatNumbers.sort((a, b) => a - b);

let counter = minSeatNumber;

for (let i = 0; i <= seatNumbers.length; i++) {
    if (seatNumbers[i] !== counter){
        return counter;
    }
        counter++;
}


console.log(maxSeatNumber);
