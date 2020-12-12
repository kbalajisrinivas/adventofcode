
const util = require('./utils');
var all_elements = {};
let basic_composition = {};
function readInput() {
    const input = util.readFile('day14.txt');
    for (let i = 0; i < input.length; i++) {
        let input_line = input[i].split(" => ");
        let output_element = get_element_details(input_line[1]);
        let input_elements = get_composition_of_combination(input_line[0]);
        all_elements[output_element.elementName] = {
            quantity: parseInt(output_element.quantity, 10),
            composition: input_elements,
            reserves: 0
        }

    }
    console.log(input);
}

// right side
function get_element_details(element) {
    let result = element.split(" ");
    return {
        quantity: parseInt(result[0], 10),
        elementName: result[1],
        reserves: 0
    }
}


// left side
function get_composition_of_combination(element) {
    let allElements = element.split(", ");
    let result = [];
    for (let i = 0; i < allElements.length; i++) {
        result.push(get_element_details(allElements[i]));
    }
    return result;
}

function calculateRequiredOre() {
    let fuel_composition = all_elements["FUEL"].composition;
    let elements = [];
    for (let i = 0; i < fuel_composition.length; i++) {
        let composition = calculateComposition(fuel_composition[i], 1);
        // elements.push(...composition);
    }

    let total = 0;
    for (key in basic_composition) {
        let currentQuantity = Math.ceil(basic_composition[key]);
        let composition_quantity = all_elements[key].quantity
        let oreQuantity = all_elements[key].composition[0].quantity;
        total += Math.ceil(currentQuantity / composition_quantity) * oreQuantity;
    }
    console.log(total);
}

function calculateComposition(element, quantity) {
    let element_info = all_elements[element.elementName];
    for (let i = 0; i < element_info.composition.length; i++) {
        console.log(`element: ${element.elementName}, quantity: ${quantity}, elementInfoQuantity: ${element_info.quantity}`);
        let quant1 = (element.quantity * quantity) - element.reserves;
        const proportion = Math.ceil(quant1/ element_info.quantity);
        console.log(`quant1: ${quant1}, element: ${element.elementName}, proportion: ${proportion}`);
        let residual = proportion -(quant1/ element_info.quantity);
        element.reserves = (element.quantity * quantity) % element_info.quantity;
        let isBasic = checkIfItisBasicElement(element.elementName);
        if (isBasic) {
            console.log(`quant1: ${quant1}, element: ${element.elementName}, quantity: ${element.quantity * quantity}`)
            console.log("=================");
            if (basic_composition[element.elementName]) {
                basic_composition[element.elementName] += element.quantity * quantity;
            } else {
                basic_composition[element.elementName] = element.quantity * quantity;
            }
            return;
        } else {
            calculateComposition(element_info.composition[i], proportion);
        }
    }
    // return all_elements_info;
}


function checkIfItisBasicElement(element) {
    let current_element = all_elements[element];
    return current_element.composition.some(e => e.elementName === "ORE");
}

var input = readInput();
var result = calculateRequiredOre();





