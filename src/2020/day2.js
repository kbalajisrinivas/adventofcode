const utils = require('../utils');

const fileContents = utils.readFile("day2.txt");

const allPasswordInfo = fileContents.map((x) => {
    let lineInfo = x.split(":");
    let firstPart = lineInfo[0].split(" ");
    let minMax = firstPart[0].split("-");
    let min = parseInt(minMax[0], 10);
    let max = parseInt(minMax[1], 10);
    let passwordInfo = {
        min: min,
        max: max,
        character: firstPart[1],
        password: lineInfo[1].trim()
    };
    return passwordInfo;
});

console.log(allPasswordInfo);
let validPasswordCount = getValidPasswords(allPasswordInfo);
console.log(validPasswordCount);
validPasswordCount = validPasswordPartTwo(allPasswordInfo);
console.log(validPasswordCount);

function getValidPasswords(passwords) {
    let validPasswordCount = 0;
    for (let i = 0; i < passwords.length; i++) {
        const currentPassword = passwords[i];
        const passwordCharacter = currentPassword.character;
        let passwordCharacterCount = 0;
        for (let j = 0; j < currentPassword.password.length; j++) {
            if (currentPassword.password[j] === passwordCharacter) {
                passwordCharacterCount++;
            }
        }
        if (passwordCharacterCount >= currentPassword.min && passwordCharacterCount <= currentPassword.max) {
            validPasswordCount++;
        }
    }
    return validPasswordCount;
}


function validPasswordPartTwo(passwords) {
    let validPasswordCount = 0;
    for (let i = 0; i < passwords.length; i++) {
        const currentPasswordInfo = passwords[i];
        const passwordCharacter = currentPasswordInfo.character;
        const currentPassword = currentPasswordInfo.password;
        const isMin = currentPassword[currentPasswordInfo.min - 1] === passwordCharacter;
        const isMax = currentPassword[currentPasswordInfo.max - 1] === passwordCharacter;
        if (isMin ^ isMax) {
            validPasswordCount++;
        }
    }
    return validPasswordCount;
}