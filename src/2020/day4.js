const utils = require("../utils");

const fileContent = utils.readFile("day4.txt");

console.log(fileContent);

let passportData = [];

let localData = "";
for (let i = 0; i < fileContent.length; i++) {
    const currentLine = fileContent[i];
    localData = localData + " " + currentLine;
    if (currentLine === "") {
        passportData.push(localData.trim());
        localData = "";
    }
}

console.log(passportData);
let allPassportInfo = [];

for (let i = 0; i < passportData.length; i++) {
    let allFields = passportData[i].split(" ");
    let passportInfo = {};
    for (let j = 0; j < allFields.length; j++) {
        const currentField = allFields[j].split(":");
        const key = currentField[0];
        const value = currentField[1];
        passportInfo[[key]] = value
    }
    allPassportInfo.push(passportInfo);
}

console.log(allPassportInfo);



let expectedFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let fieldValidation = {
    'byr': isValidBirthYear,
    'iyr': isValidIssueYear,
    'eyr': isValidExpirationYear,
    'hgt': isValidHeight,
    'hcl': isValidHairColour,
    'ecl': isValidEyeColour,
    'pid': isValidPassportNumber
}

const eyeColours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const validHairColours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const eyeColourSet = new Set(eyeColours);
const hairColourSet = new Set(validHairColours);
const validNumberSet = new Set(validNumbers);

let validPassportCount = 0;

for (let i = 0; i < allPassportInfo.length; i++) {
    const currentPassportInfo = allPassportInfo[i];
    let isValid = true;
    for (let j = 0; j < expectedFields.length; j++) {
        const currentField = expectedFields[j];
        if (!currentPassportInfo[[currentField]]) {
            isValid = false;
            console.log(`x: ${i}`);
            break;
        }
        const fieldValue = currentPassportInfo[[currentField]];
        const fieldValidationFunction = fieldValidation[[currentField]];
        if (!fieldValidationFunction(fieldValue)) {
            isValid = false;
            console.log(`y: ${i}`);
            break;
        }

    }
    if (isValid) {
        validPassportCount++;
    }
}

console.log(validPassportCount);


// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

function isValidBirthYear(birthYear) {
    let birthYearInt = parseInt(birthYear, 10);
    if (Number.isNaN(birthYearInt)) {
        return false;
    }
    return birthYearInt >= 1920 && birthYearInt <= 2002;
}

function isValidIssueYear(issueYear) {
    let birthYearInt = parseInt(issueYear, 10);
    if (Number.isNaN(birthYearInt)) {
        return false;
    }
    return birthYearInt >= 2010 && birthYearInt <= 2020;
}

function isValidExpirationYear(expirationYear) {
    let birthYearInt = parseInt(expirationYear, 10);
    if (Number.isNaN(birthYearInt)) {
        return false;
    }
    return birthYearInt >= 2020 && birthYearInt <= 2030;
}

function isValidHeight(height) {
    let cmIndex = height.indexOf("cm");
    let inIndex = height.indexOf("in");
    let only1IndexAvailable = (cmIndex !== -1) ^ (inIndex !== -1);
    if (!only1IndexAvailable) {
        return false;
    }
    if (cmIndex !== -1) {
        let cm = height.substring(0, cmIndex);
        let cmNumber = parseInt(cm, 10);
        if (Number.isNaN(cmNumber)) {
            return false;
        }
        return cmNumber >= 150 && cmNumber <= 193;
    }

    if (inIndex !== -1) {
        let inch = height.substring(0, inIndex);
        let inchNumber = parseInt(inch, 10);
        if (Number.isNaN(inchNumber)) {
            return false;
        }
        return inchNumber >= 59 && inchNumber <= 76;
    }
}

function isValidHairColour(hairColourInput) {
    if (hairColourInput.length !== 7) {
        return false;
    }
    let firstCharacter = hairColourInput[0];
    if (firstCharacter !== "#") {
        return false;
    }
    let remainingCharacters = hairColourInput.substring(1, hairColourInput.length);
    for (let i = 0; i < remainingCharacters.length; i++) {
        const currentCharacter = remainingCharacters[i];
        if (!hairColourSet.has(currentCharacter)) {
            return false;
        }
    }
    return true;
}

function isValidEyeColour(eyeColourInput) {
    return eyeColourSet.has(eyeColourInput);
}

function isValidPassportNumber(passportNumber) {

    if (passportNumber.length !== 9) {
        return false;
    }

    
    for(let i=0;i<passportNumber.length;i++){
        if(!validNumberSet.has(passportNumber[i])){
            return false;
        }
    }
    return true;
}