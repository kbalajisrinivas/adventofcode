const util = require('./utils');


all_states = {};
const BLACK = 0;
const WHITE = 1;
const LEFT = "<";
const RIGHT = ">";
const UP = "^";
const DOWN = "v";

let current_state = {
    axis: {
        "x": 0,
        "y": 0
    },
    color: WHITE,
    direction: UP,
    counter: 0
}
all_states[`x0y0`] = JSON.parse(JSON.stringify(current_state));

function updateStateInformation(state, value) {
    state.counter += 1;
    if (state.counter === 1) {
        // update the color of the current cell
        state.color = value;
    } else if (state.counter === 2) {
        // create new state
        let keyState = formKeyForState(state);
        all_states[keyState] = JSON.parse(JSON.stringify(state));
        let next_state;
        if (value === 0) {
            // it should move left
            next_state = getLeftState(state.direction, state.axis);
        } else if (value === 1) {
            // it should move right
            next_state = getRightState(state.direction, state.axis);
        } else {
            console.log(`Invalid value. ${state.counter}`);
        }
        let keyForNextState = formKeyForState(next_state);
        if (all_states[keyForNextState]) {
            // already visited 
            current_state = next_state;
            current_state.color = all_states[keyForNextState].color;
            current_state.counter = 0;
        } else {
            current_state = next_state;
            current_state.color = BLACK;
            current_state.counter = 0;
        }
    }
}

function formKeyForState(state) {
    return `x${state.axis.x}y${state.axis.y}`;
}

function getLeftState(currentState, axis) {
    let direction, xCoordinate = axis.x, yCoordinate = axis.y;
    switch (currentState) {
        case LEFT:
            direction = DOWN;
            yCoordinate = axis.y - 1;
            break;
        case RIGHT:
            direction = UP;
            yCoordinate = axis.y + 1;
            break;
        case DOWN:
            direction = RIGHT;
            xCoordinate = axis.x + 1;
            break;
        case UP:
            direction = LEFT;
            xCoordinate = axis.x - 1;
            break;
        default:
            throw Error("Invalid currentState for left")
    }
    return {
        direction: direction,
        axis: {
            x: xCoordinate,
            y: yCoordinate
        }
    }
}

function getRightState(currentState, axis) {
    let direction, xCoordinate = axis.x, yCoordinate = axis.y;
    switch (currentState) {
        case LEFT:
            direction = UP;
            yCoordinate = axis.y + 1;
            break;
        case RIGHT:
            direction = DOWN;
            yCoordinate = axis.y - 1;
            break;
        case DOWN:
            direction = LEFT;
            xCoordinate = axis.x - 1;
            break;
        case UP:
            direction = RIGHT;
            xCoordinate = axis.x + 1;
            break;
        default:
            throw Error("Invalid currentState for right");
    }
    return {
        direction: direction,
        axis: {
            x: xCoordinate,
            y: yCoordinate
        }
    }
}


getProgramState();
function getProgramState() {
    // const input = util.readFile('day2.txt');
    input_array = [3, 8, 1005, 8, 330, 1106, 0, 11, 0, 0, 0, 104, 1, 104, 0, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 101, 0, 8, 29, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1001, 8, 0, 51, 1006, 0, 78, 2, 107, 9, 10, 1006, 0, 87, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1001, 8, 0, 82, 2, 1103, 5, 10, 1, 101, 8, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 101, 0, 8, 112, 1006, 0, 23, 1006, 0, 20, 1, 2, 11, 10, 1, 1007, 12, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 101, 0, 8, 148, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1002, 8, 1, 170, 2, 101, 12, 10, 2, 5, 7, 10, 1, 102, 10, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 1001, 8, 0, 205, 1, 1004, 10, 10, 2, 6, 13, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1001, 8, 0, 235, 2, 102, 4, 10, 1006, 0, 16, 1006, 0, 84, 1006, 0, 96, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1001, 8, 0, 269, 1006, 0, 49, 2, 1003, 6, 10, 2, 1104, 14, 10, 1006, 0, 66, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1002, 8, 1, 305, 2, 1, 11, 10, 101, 1, 9, 9, 1007, 9, 1020, 10, 1005, 10, 15, 99, 109, 652, 104, 0, 104, 1, 21102, 838479487744, 1, 1, 21102, 1, 347, 0, 1106, 0, 451, 21101, 666567967640, 0, 1, 21101, 358, 0, 0, 1106, 0, 451, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 21101, 28994219048, 0, 1, 21102, 405, 1, 0, 1105, 1, 451, 21102, 3375459559, 1, 1, 21101, 0, 416, 0, 1106, 0, 451, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 0, 21102, 838433665892, 1, 1, 21102, 1, 439, 0, 1106, 0, 451, 21102, 988669698816, 1, 1, 21102, 450, 1, 0, 1105, 1, 451, 99, 109, 2, 21201, -1, 0, 1, 21102, 1, 40, 2, 21101, 482, 0, 3, 21102, 472, 1, 0, 1105, 1, 515, 109, -2, 2105, 1, 0, 0, 1, 0, 0, 1, 109, 2, 3, 10, 204, -1, 1001, 477, 478, 493, 4, 0, 1001, 477, 1, 477, 108, 4, 477, 10, 1006, 10, 509, 1101, 0, 0, 477, 109, -2, 2105, 1, 0, 0, 109, 4, 1201, -1, 0, 514, 1207, -3, 0, 10, 1006, 10, 532, 21101, 0, 0, -3, 22102, 1, -3, 1, 21201, -2, 0, 2, 21102, 1, 1, 3, 21101, 551, 0, 0, 1106, 0, 556, 109, -4, 2105, 1, 0, 109, 5, 1207, -3, 1, 10, 1006, 10, 579, 2207, -4, -2, 10, 1006, 10, 579, 21201, -4, 0, -4, 1105, 1, 647, 21201, -4, 0, 1, 21201, -3, -1, 2, 21202, -2, 2, 3, 21101, 0, 598, 0, 1106, 0, 556, 21202, 1, 1, -4, 21102, 1, 1, -1, 2207, -4, -2, 10, 1006, 10, 617, 21102, 0, 1, -1, 22202, -2, -1, -2, 2107, 0, -3, 10, 1006, 10, 639, 22102, 1, -1, 1, 21101, 0, 639, 0, 106, 0, 514, 21202, -2, -1, -2, 22201, -4, -2, -4, 109, -5, 2105, 1, 0];

    let result = computeResult(input_array, 2);

    let minx = 0, miny = 0;
    for (let key in all_states) {
        if (minx > all_states[key].axis.x) {
            minx = all_states[key].axis.x;
        }
        if (miny > all_states[key].axis.y) {
            miny = all_states[key].axis.y;
        }
    }
    let resultArray = [];
    for (let i = 0; i < 50; i++) {
        let str = [];
        for (let i = 0; i < 10; i++) {
            str.push('');
        }
        resultArray.push(str);
    }
    let axisAdjustor = 0;
    if (miny < 0) {
        axisAdjustor = Math.abs(miny);
    }
    for (let key in all_states) {
        let xAxis = all_states[key].axis.x;
        let yAxis = all_states[key].axis.y + axisAdjustor;
        if(all_states[key].color === WHITE){
            resultArray[yAxis][xAxis] = "#";
        } else {
            resultArray[yAxis][xAxis] = '';
        }
    }

    console.log(resultArray);
    // console.log(JSON.stringify(input_array));
    return input_array[0];
}

function get_pos_by_parameter_mode(i, increment, offset, parameter_mode) {
    switch (parameter_mode) {
        case 0:
            return input_array[i + increment]
        case 1:
            return i + increment;
        case 2:
            return offset + input_array[i + increment]
        default:
            break;
    }
}

function computeResult(input_array, specialInput) {
    let first_param_value, second_param_value;
    let relative_offset = 0;
    for (let i = 0; i < input_array.length;) {
        // get the first string
        let num = input_array[i];
        const first_operation = num % 100;
        num = Math.floor(num / 100);
        const first_parameter_mode = num === 0 ? 0 : num % 10;
        num = Math.floor(num / 10);
        const second_parameter_mode = num === 0 ? 0 : num % 10;
        num = Math.floor(num / 10);
        const third_paramter_mode = num === 0 ? 0 : num % 10;
        let operation = first_operation;
        first_param_value = input_array[get_pos_by_parameter_mode(i, 1, relative_offset, first_parameter_mode)];
        second_param_value = input_array[get_pos_by_parameter_mode(i, 2, relative_offset, second_parameter_mode)];
        let third_param_value = get_pos_by_parameter_mode(i, 3, relative_offset, third_paramter_mode);
        switch (operation) {
            case 1:
                input_array[third_param_value] = first_param_value + second_param_value;
                i = i + 4;
                break;
            case 2:
                input_array[third_param_value] = first_param_value * second_param_value;
                i = i + 4
                break;
            case 3:
                // input
                let input_mode = get_pos_by_parameter_mode(i, 1, relative_offset, first_parameter_mode);
                // console.log(`current color: ${current_state.color}`);
                input_array[input_mode] = current_state.color;
                i = i + 2;
                break;
            case 4:
                // output
                // console.log(`${i}, ${first_param_value}`);
                // console.log(`x: ${current_state.axis.x}, y: ${current_state.axis.y}`)
                updateStateInformation(current_state, first_param_value);
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
                    input_array[third_param_value] = 1;
                } else {
                    input_array[third_param_value] = 0;
                }
                i = i + 4;
                break;
            case 8:
                if (first_param_value === second_param_value) {
                    input_array[third_param_value] = 1;
                } else {
                    input_array[third_param_value] = 0;
                }
                i = i + 4;
                break;
            case 9:
                relative_offset = relative_offset + first_param_value;
                i = i + 2;
                break;
            case 99:
                i = i + 1;
                return all_states;
                break;
            default:
                throw new Error('invalid operation');
                break;

        }
    }
    return input_array;
}

module.exports = { get1202ProgramState }