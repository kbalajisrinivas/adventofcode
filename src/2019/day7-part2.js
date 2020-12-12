let input_array = [5, 6, 7, 8, 9]
let counter = 0;

let resultsAfterPermutation = getPermutations(input_array);
console.log(resultsAfterPermutation);

let day7_input = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 42, 67, 84, 97, 118, 199, 280, 361, 442, 99999, 3, 9, 101, 4, 9, 9, 102, 5, 9, 9, 101, 2, 9, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 102, 5, 9, 9, 1001, 9, 5, 9, 102, 3, 9, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 5, 9, 1002, 9, 2, 9, 1001, 9, 5, 9, 4, 9, 99, 3, 9, 1001, 9, 5, 9, 1002, 9, 3, 9, 4, 9, 99, 3, 9, 102, 4, 9, 9, 101, 4, 9, 9, 102, 2, 9, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99];

let dummy_counter = 0;
let answer = 0;

class Amplifier {
    constructor(input_array, phase_setting) {
        this.input_array = input_array;
        this.phase_setting = phase_setting;
        this.inputs = [];
        this.inputs.push(phase_setting);
        this.status = "NotStarted";
        this.isRunning = false;
        this.counter = 0;
        this.answer = 0;
    }

    computeResult(special_input) {
        this.inputs.push(special_input);
        let first_param_value, second_param_value;
        this.isRunning = true;
        while (this.isRunning) {
            // get the first string
            let num = this.input_array[this.counter];
            const first_operation = num % 100;
            num = Math.floor(num / 100);
            const first_parameter_mode = num === 0 ? 0 : num % 10;
            num = Math.floor(num / 10);
            const second_parameter_mode = num === 0 ? 0 : num % 10;
            const third_paramter_mode = 0; //always going to be relative
            let operation = first_operation;
            first_param_value = first_parameter_mode == 0 ? this.input_array[this.input_array[this.counter + 1]] : this.input_array[this.counter + 1];
            second_param_value = second_parameter_mode == 0 ? this.input_array[this.input_array[this.counter + 2]] : this.input_array[this.counter + 2];
            switch (operation) {
                case 1:
                    this.input_array[this.input_array[this.counter + 3]] = first_param_value + second_param_value;
                    this.counter = this.counter + 4;
                    break;
                case 2:
                    this.input_array[this.input_array[this.counter + 3]] = first_param_value * second_param_value;
                    this.counter = this.counter + 4
                    break;
                case 3:
                    // input
                    this.input_array[this.input_array[this.counter + 1]] = this.inputs.shift();
                    this.counter = this.counter + 2;
                    break;
                case 4:
                    // output
                    // console.log(first_param_value);
                    this.answer = first_param_value;
                    this.counter = this.counter + 2;
                    this.isRunning = false;
                    this.status = "Paused";
                    return this.answer;
                case 5:
                    if (first_param_value !== 0) {
                        this.counter = second_param_value;
                    } else {
                        this.counter = this.counter + 3;
                    }
                    break;
                case 6:
                    if (first_param_value === 0) {
                        this.counter = second_param_value;
                    } else {
                        this.counter = this.counter + 3;
                    }
                    break;
                case 7:
                    if (first_param_value < second_param_value) {
                        this.input_array[this.input_array[this.counter + 3]] = 1;
                    } else {
                        this.input_array[this.input_array[this.counter + 3]] = 0;
                    }
                    this.counter = this.counter + 4;
                    break;
                case 8:
                    if (first_param_value === second_param_value) {
                        this.input_array[this.input_array[this.counter + 3]] = 1;
                    } else {
                        this.input_array[this.input_array[this.counter + 3]] = 0;
                    }
                    this.counter = this.counter + 4;
                    break;
                case 99:
                    this.counter = this.counter + 1;
                    this.isRunning = false;
                    this.status = "halted";
                    return this.answer;
                default:
                    throw new Error('invalid operation');
                    break;

            }
        }
    }
}


for (let i = 0; i < resultsAfterPermutation.length; i++) {
    let result = 0;
    let input_elements = resultsAfterPermutation[i];
    let allAmplifiers = [];

    for (let j = 0; j < input_elements.length; j++) {
        let amp = new Amplifier(day7_input, input_elements[j]);
        allAmplifiers.push(amp);
    }

    const last_amplifier = allAmplifiers[4];
    let next_amplifier_counter = 0;
    while (last_amplifier.status !== "halted") {

        result = allAmplifiers[next_amplifier_counter].computeResult(result);
        next_amplifier_counter = (next_amplifier_counter+1)%5;
    }

    if (answer < result) {
        answer = result;
    }
}

function getPermutations(array) {
    let result = [];
    if (array.length === 1) {
        return [array];
    }
    counter = counter + 1;
    let slicedArray = input_array.slice(counter, input_array.length)
    let perms = getPermutations(slicedArray);
    for (let j = 0; j < perms.length; j++) {
        let resultAfterInserting = insertNumberInPosition(array[0], perms[j]);
        result.push(...resultAfterInserting);
    }
    return result;
}

function insertNumberInPosition(num, array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        let arrayCopy = [...array];
        arrayCopy.splice(i, 0, num);
        result.push(arrayCopy);
    }
    // insert in final position
    array.splice(array.length, 0, num);
    result.push(array);
    return result;
}

console.log(answer);

