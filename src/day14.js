
const util = require('./utils');
var all_elements = {};
function readInput() {
    const input = util.readFile('day14.txt');
    for (let i = 0; i < input.length; i++) {
        let input_line = input[i].split(" => ");
        let output_element = get_element_details(input_line[1]);
        let input_elements = get_composition_of_combination(input_line[0]);
        all_elements[output_element.elementName] = {
            quantity: parseInt(output_element.quantity, 10),
            composition: input_elements
        }
    }
    console.log(input);
}

// right side
function get_element_details(element) {
    let result = element.split(" ");
    return {
        quantity: parseInt(result[0], 10),
        elementName: result[1]
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
        let composition = calculateComposition(fuel_composition[i]);
        elements.push(...composition);
    }
    // now group over all the elements and see how much ORE is needed
    let basic_composition = {};
    for (let i = 0; i < elements.length; i++) {
        if (basic_composition[elements[i].elementName]) {
            basic_composition[elements[i].elementName] += elements[i].quantity;
        } else {
            basic_composition[elements[i].elementName] = elements[i].quantity;
        }
    }

    let total = 0;
    for (key in basic_composition) {
        let currentQuantity = basic_composition[key];
        let composition_quantity = all_elements[key].quantity;
        let oreQuantity = all_elements[key].composition[0].quantity;
        total += (Math.ceil(currentQuantity / composition_quantity)) * oreQuantity;
    }
    console.log(total);
}

function calculateComposition(element) {
    let element_info = all_elements[element.elementName];
    let isBasic = checkIfItisBasicElement(element.elementName);
    let all_elements_info = [];
    if (isBasic) {
        all_elements_info.push({
            quantity: element.quantity,
            elementName: element.elementName
        });
        return all_elements_info;
    }

    for (let i = 0; i < element_info.composition.length; i++) {
        let calculated_composition = calculateComposition(element_info.composition[i]);
        const proportion = Math.ceil(parseInt(element.quantity) / parseInt(element_info.quantity));
        element.basic = multiplier(proportion, calculated_composition);
        all_elements_info.push(...element.basic);
    }
    return all_elements_info;
}


function checkIfItisBasicElement(element) {
    let current_element = all_elements[element];
    return current_element.composition.some(e => e.elementName === "ORE");
}

function multiplier(quantity, composition) {
    let composition_sum = [];
    for (let i = 0; i < composition.length; i++) {
        composition[i].quantity = parseInt(composition[i].quantity, 10) * parseInt(quantity, 10);
    }
    return composition;
}
var input = readInput();
var result = calculateRequiredOre();





