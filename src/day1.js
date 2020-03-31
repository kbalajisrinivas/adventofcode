
const util = require('./utils');

function getFuel(mass) {
    let result = 0;
    while (mass > 5) {
        mass = Math.floor(mass / 3) - 2;
        result = result + mass;
    }
    return result;
}

function getFuelRequired() {
    const input = util.readFile('day1Input.txt');
    let totalFuelRequired = 0;
    input.forEach((module) => {
        totalFuelRequired = totalFuelRequired + getFuel(parseInt(module, 10));
    });
    return totalFuelRequired;
}

// let response = getFuelRequired();
// console.log(response);

module.exports = { getFuelRequired }