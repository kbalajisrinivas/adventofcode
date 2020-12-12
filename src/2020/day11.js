const utils = require("../utils");

const fileContent = utils.readFile("day11.txt");

let matrix = [];

fileContent.map((x) => {
    let rows = x.split("");
    matrix.push(rows);
});

console.log(matrix);


function isSeatOccupied(i, j, matrix) {
    if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length) {
        if (matrix[i][j] === "#") {
            return 1;
        } else {
            return 0;
        }
    }
}

function isWithinBounds(i, j, matrix) {
    if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length) {
        return true;
    }
    return false;
}

// 8 positions
function getCellInformation(i, j, matrix) {
    let maxOccupiedSeats = 0;
    if (isSeatOccupied(i - 1, j - 1, matrix)) {
        maxOccupiedSeats++;
    }
    if (isSeatOccupied(i - 1, j, matrix)) {
        maxOccupiedSeats++;
    }
    if (isSeatOccupied(i - 1, j + 1, matrix)) {
        maxOccupiedSeats++;
    }
    if (isSeatOccupied(i, j - 1, matrix)) {
        maxOccupiedSeats++;
    }

    if (isSeatOccupied(i, j + 1, matrix)) {
        maxOccupiedSeats++;
    }
    if (isSeatOccupied(i + 1, j - 1, matrix)) {
        maxOccupiedSeats++;
    }

    if (isSeatOccupied(i + 1, j, matrix)) {
        maxOccupiedSeats++;
    }

    if (isSeatOccupied(i + 1, j + 1, matrix)) {
        maxOccupiedSeats++;
    }
    return maxOccupiedSeats;
}


function getVisibleCellInformation(i, j, matrix) {
    let maxOccupiedSeats = 0;
    if (isVisibleSeatOccupied(i - 1, j - 1, "NW", matrix)) {
        maxOccupiedSeats++;
    }
    if (isVisibleSeatOccupied(i - 1, j, "N", matrix)) {
        maxOccupiedSeats++;
    }
    if (isVisibleSeatOccupied(i - 1, j + 1, "NE", matrix)) {
        maxOccupiedSeats++;
    }
    if (isVisibleSeatOccupied(i, j - 1, "W", matrix)) {
        maxOccupiedSeats++;
    }

    if (isVisibleSeatOccupied(i, j + 1, "E", matrix)) {
        maxOccupiedSeats++;
    }
    if (isVisibleSeatOccupied(i + 1, j - 1, "SW", matrix)) {
        maxOccupiedSeats++;
    }

    if (isVisibleSeatOccupied(i + 1, j, "S", matrix)) {
        maxOccupiedSeats++;
    }

    if (isVisibleSeatOccupied(i + 1, j + 1, "SE", matrix)) {
        maxOccupiedSeats++;
    }
    return maxOccupiedSeats;
}


function isVisibleSeatOccupied(i, j, direction, matrix) {
    if (direction === "NW") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            i--;
            j--;
        }
        return false;
    } else if (direction === "N") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            i--;
        }
        return false;
    } else if (direction === "NE") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            i--;
            j++;
        }
        return false;
    } else if (direction === "SW") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            i++;
            j--;
        }
        return false;
    } else if (direction === "S") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            i++;
        }
        return false;
    } else if (direction === "SE") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            i++;
            j++;
        }
        return false;
    } else if (direction === "W") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            j--;
        }
        return false;
    } else if (direction === "E") {
        while (isWithinBounds(i, j, matrix) && matrix[i][j] !== 'L') {
            if (matrix[i][j] === "#") {
                return true;
            }
            j++;
        }
        return false;
    }
    throw new Error("asdfasdf");
}

function createEmptyMatrix() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        let tempRow = (new Array(matrix[0].length)).fill('.');
        tempMatrix.push(tempRow);
    }
    return tempMatrix;
}

let tempMatrix = createEmptyMatrix();

let counter = 0;
// while (true) {
//     counter++;
//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix[0].length; j++) {
//             let currentCell = matrix[i][j];
//             let occupiedSeatsCount = getCellInformation(i, j, matrix);
//             //rule 1
//             if (currentCell === "L" && occupiedSeatsCount === 0) {
//                 tempMatrix[i][j] = "#";
//             } else if (currentCell === "#" && occupiedSeatsCount >= 4) {
//                 // rule 2
//                 tempMatrix[i][j] = "L";
//             } else {
//                 tempMatrix[i][j] = matrix[i][j];
//             }
//         }
//     }

//     let result = compareMatrix(matrix, tempMatrix);
//     if (result) {
//         console.log(counter);
//         let result = countOccupiedSeats(tempMatrix);
//         console.log(result);
//         return true;
//     } else {
//         matrix = tempMatrix;
//         tempMatrix = createEmptyMatrix();
//     }
// }

// part - II
// trying a brute force approach for visible seats
while (true) {
    counter++;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            let currentCell = matrix[i][j];
            let occupiedSeatsCount = getVisibleCellInformation(i, j, matrix);
            //rule 1
            if (currentCell === "L" && occupiedSeatsCount === 0) {
                tempMatrix[i][j] = "#";
            } else if (currentCell === "#" && occupiedSeatsCount >= 5) {
                // rule 2
                tempMatrix[i][j] = "L";
            } else {
                tempMatrix[i][j] = matrix[i][j];
            }
        }
    }
    printMatrix(tempMatrix);
    let result = compareMatrix(matrix, tempMatrix);
    if (result) {
        console.log(counter);
        let result = countOccupiedSeats(tempMatrix);
        console.log(result);
        return true;
    } else {
        matrix = tempMatrix;
        tempMatrix = createEmptyMatrix();
    }
}

function printMatrix(matrix) {
    let str = "";
    for (let i = 0; i < matrix.length; i++) {
        let row = matrix[i].join("");
        str = str + row + "\n";
    }
    console.log(str);
}

function countOccupiedSeats(matrix) {
    let occupiedSeatCount = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === "#") {
                occupiedSeatCount++;
            }
        }
    }
    return occupiedSeatCount;
}

function compareMatrix(matrix1, matrix2) {
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1[0].length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) {
                return false;
            }
        }
    }
    return true;
}
console.log(fileContent);