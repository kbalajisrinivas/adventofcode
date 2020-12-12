const utils = require("../utils");

let input = [2, 0, 1, 7, 4, 14, 18];

let inputDictionary = {};

let lastWordSpoken = null;
for (let i = 0; i < input.length; i++) {
    inputDictionary[input[i]] = {
        position: i,
        difference: 0,
        num: input[i]
    };

    lastWordSpoken = inputDictionary[input[i]];
}

let counter = input.length;



while (counter < 30000000) {
    let newNumber = lastWordSpoken['difference'];
    if (counter === 30000000-1) {
        console.log(newNumber);
    }
    //first time he has spoken that word
    if (inputDictionary[newNumber] === undefined) {
        inputDictionary[newNumber] = {
            position: counter,
            difference: 0,
            num: counter
        }
    } else {
        inputDictionary[newNumber]['difference'] = counter - inputDictionary[newNumber]['position'];
        inputDictionary[newNumber]['position'] = counter;
    }
    lastWordSpoken = inputDictionary[newNumber];
    counter++;
}

console.log("sdf");