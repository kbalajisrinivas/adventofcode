const utils = require('../utils');

const fileContents = utils.readFile("day3.txt");

let inputArray = fileContents.map((x) => {
    return x.split("");
});
console.log(inputArray);

let columnCount = inputArray[0].length;
let treeCount = 0;
let j = 0;
// for (let i = 0; i < inputArray.length; i++) {
//     if (inputArray[i][j] === ".") {
//         inputArray[i][j] = "0";
//     } else if (inputArray[i][j] === "#") {
//         inputArray[i][j] = "X";
//         treeCount++;
//     }
//     j = (j + 3) % columnCount;
// }
console.log(treeCount);

let positions = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

let result = 1;

for(let i=0;i<positions.length;i++){
    const right = positions[i][0];
    const down = positions[i][1];
    let treeCount = getTreeCount(right, down, inputArray);
    result = result*treeCount;
}
console.log(result);
//part 2
function getTreeCount(rightPosition, downPosition, inputArray) {
    let columnCount = inputArray[0].length;
    let treeCount = 0;
    let j = 0;
    for (let i = 0; i < inputArray.length; i=i+downPosition) {
        if (inputArray[i][j] === ".") {
            // inputArray[i][j] = "0";
        } else if (inputArray[i][j] === "#") {
            // inputArray[i][j] = "X";
            treeCount++;
        }
        j = (j + rightPosition) % columnCount;
    }
    return treeCount;
}