let input_array = ['10 ORE => 10 A',
    '1 ORE => 1 B',
    '7 A, 1 B => 1 C',
    '7 A, 1 C => 1 D',
    '7 A, 1 D => 1 E',
    '7 A, 1 E => 1 FUEL']

// for each of the components, it will have base composition
// for example E, {"qty": 4, "Ore": 10}
// when someone uses E, they can just get amount of ORE instead of doing the whole calculation
let base_composition = {};
let result_and_elements = {};

for (let i = 0; i < input_array.length; i++) {
    let row = input_array[i];
    let result_element = row.split(" => ");
    let result = result_element[1].split(" ");
    let result_quantity = result[0];
    let result_name = result[1];

    let composition_elements = result_element[0].split(", ");
    let compositions = [];
    for (let j = 0; j < composition_elements.length; j++) {
        let element = composition_elements[j].split(" ");
        compositions.push({
            element: element[1],
            quantity: element[0]
        })
    }
    let is_ore_composition = compositions.filter(x => x.element === "ORE");
    if (is_ore_composition.length > 0) {
        base_composition[result_name] = {
            oreCount: compositions[0].quantity,
            elementCount: result_quantity
        }
    }
    result_and_elements[result_name] = {
        quantity: result_quantity,
        compositions: compositions
    }
}

console.log(result_and_elements);
let result = getTotalNumberOfORE('FUEL');
console.log(base_composition['FUEL']);


//start with fuel and do a dfs until we reach an element which has ORE.

function getTotalNumberOfORE(element) {
    //end condition
    //if we already have an entry in base_composition, return the quantity and ORECount
    if (base_composition[element]) {
        return base_composition[element];
    }

    //once you receive the base quantity
    //for example, you might have 7 B, base might be 4 B = 10 ORE
    // you need to do (current_quantity/quantity) * ORE is the ORE count
    let compositions = result_and_elements[element].compositions;
    let element_quantity = result_and_elements[element].quantity;

    let totalOre = 0;
    for (let i = 0; i < compositions.length; i++) {
        let current_composition = compositions[i];
        let composition_and_quantity = getTotalNumberOfORE(current_composition.element);
        let ore_count = composition_and_quantity['oreCount'];
        let ore_qty = composition_and_quantity['elementCount'];
        totalOre = totalOre + (Math.ceil(element_quantity/ore_qty)*ore_count);
    }
    base_composition[element] = {
        oreCount: totalOre,
        elementCount: element_quantity
    }

    return {
        oreCount: totalOre,
        elementCount: element_quantity
    }
}