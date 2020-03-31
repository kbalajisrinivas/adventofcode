
const util = require('./utils');
let layers = [];

const input = util.readFile('day8.txt');
let input_array = input[0].split("");
input_array = input_array.map((x) => {
    return parseInt(x, 10);
});
const row_count = 6;
const column_count = 25;
const layer_count = input_array.length % (row_count * column_count);

class Layer {
    constructor() {
        this.zero_count = 0;
        this.one_count = 0;
        this.two_count = 0;
        this.array_representation = [];
    }

    calculate(input) {
        let i = 0;
        let input_values = [];
        for (let j = 0; j < row_count; j++) {
            input_values = [];
            for (let k = 0; k < column_count; k++) {
                input_values.push(input[i]);
                switch (input[i]) {
                    case 0:
                        this.zero_count++;
                        break;
                    case 1:
                        this.one_count++;
                        break;
                    case 2:
                        this.two_count++;
                        break;
                    default:
                        throw new Error("Invalid Count");
                        break;
                }
                i++;
            }
            this.array_representation.push(input_values);
        }
    }
}

for (let i = 0; i < input_array.length; i += 150) {
    let layer = new Layer();
    layer.calculate(input_array.slice(i, i + 150));
    layers.push(layer);
}

// part 1
let layer_with_min_zeroes = null;
layers.forEach(layer => {
    if (!layer_with_min_zeroes) {
        layer_with_min_zeroes = layer;
    }
    if (layer_with_min_zeroes.zero_count > layer.zero_count) {
        layer_with_min_zeroes = layer;
    }
});

console.log(layer_with_min_zeroes);

// part 2
// 0 is black, 1 is white, 2 is transparent

let result_array = [];
let str = ""
for (let i = 0; i < row_count; i++) {
    let column_values = [];
    for (let j = 0; j < column_count; j++) {
        let result = getResultFromLayers(i, j);
        column_values.push(result);
        str = str + result;
    }
    str = str + "\n";
    result_array.push(column_values);
}

console.log(str);

function getResultFromLayers(xpos, ypos) {
    let value_at_position;
    for (let i = 0; i < layers.length; i++) {
        value_at_position = layers[i].array_representation[xpos][ypos];
        if (value_at_position === 1 || value_at_position === 0) {
            break;
        }
    }

    return value_at_position;
}
