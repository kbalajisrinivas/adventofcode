const util = require('./utils');


// input is 1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,19,6,23,2,23,6,27,2,6,27,31,2,13,31,35,1,9,35,39,2,10,39,43,1,6,43,47,1,13,47,51,2,6,51,55,2,55,6,59,1,59,5,63,2,9,63,67,1,5,67,71,2,10,71,75,1,6,75,79,1,79,5,83,2,83,10,87,1,9,87,91,1,5,91,95,1,95,6,99,2,10,99,103,1,5,103,107,1,107,6,111,1,5,111,115,2,115,6,119,1,119,6,123,1,123,10,127,1,127,13,131,1,131,2,135,1,135,5,0,99,2,14,0,0

// brute force approach 
/*
for each of the position in (1), loop over 0 to 99 positions for (2)

19690720

196907*100 + 20
19690*100 + 720
1969*100 + 19493820
196*100 + 19671120

*/

function get1202ProgramState() {
    const input = util.readFile('day2.txt');
    let input_array = input[0].split(",");
    input_array = input_array.map((x) => {
        return parseInt(x, 10);
    });

    for (let i = 0; i < 99; i++) {
        for (let j = 0; j <= 99; j++) {
            let input_array_copy = JSON.parse(JSON.stringify(input_array));
            input_array_copy[1] = i;
            input_array_copy[2] = j;
            let result = computeResult(input_array_copy);
            if (result[0] === 19690720) {
                console.log(result[0]);
                break;
            }
        }
    }

    input_array = computeResult(input_array);

    console.log(JSON.stringify(input_array));
    return input_array[0];
}

function computeResult(input_array) {
    for (let i = 0; i < input_array.length; i += 4) {
        let operation = input_array[i];
        if (operation === 1) {
            input_array[input_array[i + 3]] = input_array[input_array[i + 1]] + input_array[input_array[i + 2]];

        } else if (operation === 2) {
            input_array[input_array[i + 3]] = input_array[input_array[i + 1]] * input_array[input_array[i + 2]];

        } else if (operation === 99) {
            break;
        } else {
            // throw new Error("something went wrong");
            break;
        }
    }
    return input_array;
}

module.exports = { get1202ProgramState }