let input_array = [0,1,2,3,4]
let counter = 0;

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

let resultsAfterPermutation = getPermutations(input_array);
console.log(resultsAfterPermutation);

let day7_input = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 42, 67, 84, 97, 118, 199, 280, 361, 442, 99999, 3, 9, 101, 4, 9, 9, 102, 5, 9, 9, 101, 2, 9, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 102, 5, 9, 9, 1001, 9, 5, 9, 102, 3, 9, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 5, 9, 1002, 9, 2, 9, 1001, 9, 5, 9, 4, 9, 99, 3, 9, 1001, 9, 5, 9, 1002, 9, 3, 9, 4, 9, 99, 3, 9, 102, 4, 9, 9, 101, 4, 9, 9, 102, 2, 9, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99];

let dummy_counter = 0;
let answer = 0;
for (let i = 0; i < resultsAfterPermutation.length; i++) {

    let finalResult = 0;
    let input_elements = resultsAfterPermutation[i];
    let inputs = [input_elements[0], 0];
    finalResult = computeResult(day7_input, inputs);
    if (answer < finalResult) {
        answer = finalResult
    }
    for (let j = 1; j < input_elements.length; j++) {
        dummy_counter++;
        console.log(dummy_counter);
        inputs = [input_elements[j], finalResult];
        finalResult = computeResult(day7_input, inputs);
        if (answer < finalResult) {
            answer = finalResult
        }
    }

}


// part 2

for (let i = 0; i < resultsAfterPermutation.length; i++) {

    let finalResult = 0;
    let input_elements = resultsAfterPermutation[i];
    let inputs = [input_elements[0], 0];
    finalResult = computeResult(day7_input, inputs);
    if (answer < finalResult) {
        answer = finalResult
    }
    for (let j = 1; j < input_elements.length; j++) {
        dummy_counter++;
        console.log(dummy_counter);
        inputs = [input_elements[j], finalResult];
        finalResult = computeResult(day7_input, inputs);
        if (answer < finalResult) {
            answer = finalResult
        }
    }

}

console.log(answer);


function computeResult(input_array, inputs) {
    let first_param_value, second_param_value, input_counter = 0;
    let answer = 0;
    for (let i = 0; i < input_array.length;) {
        // get the first string
        let num = input_array[i];
        const first_operation = num % 100;
        num = Math.floor(num / 100);
        const first_parameter_mode = num === 0 ? 0 : num % 10;
        num = Math.floor(num / 10);
        const second_parameter_mode = num === 0 ? 0 : num % 10;
        const third_paramter_mode = 0; //always going to be relative
        let operation = first_operation;
        first_param_value = first_parameter_mode == 0 ? input_array[input_array[i + 1]] : input_array[i + 1];
        second_param_value = second_parameter_mode == 0 ? input_array[input_array[i + 2]] : input_array[i + 2];
        switch (operation) {
            case 1:
                input_array[input_array[i + 3]] = first_param_value + second_param_value;
                i = i + 4;
                break;
            case 2:
                input_array[input_array[i + 3]] = first_param_value * second_param_value;
                i = i + 4
                break;
            case 3:
                // input
                input_array[input_array[i + 1]] = inputs[input_counter];
                input_counter++;
                i = i + 2;
                break;
            case 4:
                // output
                // console.log(first_param_value);
                answer = first_param_value;
                i = i + 2;
                break;
            case 5:
                if (first_param_value !== 0) {
                    i = second_param_value;
                } else {
                    i = i + 3;
                }
                break;
            case 6:
                if (first_param_value === 0) {
                    i = second_param_value;
                } else {
                    i = i + 3;
                }
                break;
            case 7:
                if (first_param_value < second_param_value) {
                    input_array[input_array[i + 3]] = 1;
                } else {
                    input_array[input_array[i + 3]] = 0;
                }
                i = i + 4;
                break;
            case 8:
                if (first_param_value === second_param_value) {
                    input_array[input_array[i + 3]] = 1;
                } else {
                    input_array[input_array[i + 3]] = 0;
                }
                i = i + 4;
                break;
            case 99:
                i = i + 1;
                return answer;
                break;
            default:
                throw new Error('invalid operation');
                break;

        }
    }
    return input_array;
}