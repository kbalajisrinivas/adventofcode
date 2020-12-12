const util = require('../utils');

const fileContent = util.readFile("day8.txt");

let allInstructionsX = fileContent;
let visitedInstruction = new Set();

let instructionCounter = 0;

let accumulator = 0;

let x = canTerminate(allInstructionsX);
console.log(x);


for (let i = 0; i < allInstructionsX.length; i++) {

    const currentInstruction = allInstructionsX[i];
    let allInstructionCopy = [...allInstructionsX];
    if (currentInstruction.split(" ")[0] === "jmp") {
        allInstructionCopy[i] = allInstructionCopy[i].replace("jmp", "nop");
    } else if (currentInstruction.split(" ")[0] === "nop") {
        allInstructionCopy[i] = allInstructionCopy[i].replace("nop", "jmp");
    }
    let result = canTerminate(allInstructionCopy);
    if (result) {
        console.log(accumulator);
        break;
    }
}
function canTerminate(allInstructions) {
    instructionCounter = 0;

    accumulator = 0;
    visitedInstruction = new Set();
    while (!visitedInstruction.has(instructionCounter)) {
        visitedInstruction.add(instructionCounter);
        const currentInstruction = allInstructions[instructionCounter];
        const instructionParts = currentInstruction.split(" ");
        const instruction = instructionParts[0];
        const sign = instructionParts[1][0];
        const value = parseInt(instructionParts[1].substring(1, instructionParts[1].length), 10);
        if (instruction === 'nop') {
            //don't do anything
            instructionCounter++;
        } else if (instruction === 'acc') {
            if (sign === '+') {
                accumulator = accumulator + value;
            } else {
                accumulator = accumulator - value;
            }
            instructionCounter++;
        } else if (instruction === 'jmp') {
            if (sign === '+') {
                instructionCounter = instructionCounter + value;
            } else {
                instructionCounter = instructionCounter - value;
            }
        }
        if (instructionCounter === fileContent.length - 1) {
            //  accumulator;
            return true;
        }
    }
    console.log(instructionCounter);
    return false;
}
console.log(accumulator);