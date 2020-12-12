const utils = require('../utils');

const fileContent = utils.readFile("day10.txt");

const adapters = fileContent.map((x) => parseInt(x, 10));

adapters.sort((a, b) => a - b);

let oneDifference = 0;
let threeDifference = 1;

let prev = 0;
for (let i = 0; i < adapters.length; i++) {
    const currentAdapter = adapters[i];
    let difference = currentAdapter - prev;
    if (difference === 1) {
        oneDifference++;;
    } else if (difference === 3) {
        threeDifference++;
    }
    prev = currentAdapter;
}


let dpArray = [1];
// Initially did not have this and because of this wasted a lot of time
// even though the code was correct.
adapters.unshift(0);

for (let i = 1; i < adapters.length; i++) {

    let numberOfWays = 0;
    let currentAdapter = adapters[i];
    let maxAllowableSum = currentAdapter - 3;
    let j = i - 1;

    while (j >= 0 && adapters[j] >= maxAllowableSum) {
        numberOfWays = numberOfWays + dpArray[j];
        j--;
    }
    dpArray[i] = numberOfWays;
}

console.log(dpArray[dpArray.length - 1]);