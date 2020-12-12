const utils = require("../utils");

const fileContents = utils.readFile("day12.txt");

let initialPosition = {
    Coordinates: {
        x: 0,
        y: 0
    },
    Direction: "E"
}

//if it's east 0 is incremented
//if it's west 0 is decremented
// north 1 is incremented
// south 1 is decremented

let allDirections = ["N", "E", "S", "W"];

function getNextDirection(direction, degrees) {
    let coordinates = {
        "N": 0,
        "E": 1,
        "S": 2,
        "W": 3,
    };

    let degreeCount = degrees / 90;
    let directionIndex = coordinates[direction];
    let nextIndex = directionIndex + degreeCount;
    let nextDirectionIndex = nextIndex > 3 ? nextIndex % 4 : nextIndex;
    return allDirections[nextDirectionIndex];
}


function coordinatesByDirection(direction, positionx, positiony, x, y) {
    // let currentCoordinate = coordinates;
    if (direction === "N") {
        y += positiony;
    } else if (direction === "S") {
        y -= positiony;
    } else if (direction === "W") {
        x -= positionx;
    } else if (direction === "E") {
        x += positionx;
    }
    return {
        x: x,
        y: y
    };
}


function multiplyCoordinates(position, x, y) {
    y = y * position;
    x = x * position;
    return { x: x, y: y };
}


// for (let i = 0; i < fileContents.length; i++) {
//     const currentRow = fileContents[i];
//     const currentDirection = currentRow[0];
//     const currentPosition = parseInt(currentRow.substring(1, currentRow.length));
//     const initialDirection = initialPosition['Direction'];
//     initialPosition['Coordinates'] = coordinatesByDirection(currentDirection, currentPosition, initialPosition['Coordinates']);

//     if (currentDirection === 'R') {
//         let nextDirection = getNextDirection(initialDirection, currentPosition);
//         initialPosition['Direction'] = nextDirection;
//     } else if (currentDirection === 'L') {
//         let rightDirection = 360 - currentPosition;
//         let nextDirection = getNextDirection(initialDirection, rightDirection);
//         initialPosition['Direction'] = nextDirection;
//     } else if(currentDirection === 'F'){
//         initialPosition['Coordinates'] = coordinatesByDirection(initialDirection, currentPosition, initialPosition['Coordinates']);
//     }
// }

let xCoordinate = Math.abs(initialPosition['Coordinates']['x']);
let yCoordinate = Math.abs(initialPosition['Coordinates']['y']);

console.log(xCoordinate + yCoordinate);


// part - II

initialPosition = {
    Coordinates: {
        x: 10,
        y: 1
    },
    Direction: "E"
};

let ship = {
    Coordinates: {
        x: 0,
        y: 0
    },
    Direction: "E"
};

for (let i = 0; i < fileContents.length; i++) {
    const currentRow = fileContents[i];
    const currentDirection = currentRow[0];
    const currentPosition = parseInt(currentRow.substring(1, currentRow.length));
    const initialDirection = initialPosition['Direction'];
    initialPosition['Coordinates'] = coordinatesByDirection(currentDirection, currentPosition, currentPosition, initialPosition['Coordinates']['x'], initialPosition['Coordinates']['y']);

    if (currentDirection === 'R') {
        let nextDirection = getNextDirection(initialDirection, currentPosition);
        initialPosition['Direction'] = nextDirection;
    } else if (currentDirection === 'L') {
        let rightDirection = 360 - currentPosition;
        let nextDirection = getNextDirection(initialDirection, rightDirection);
        initialPosition['Direction'] = nextDirection;
    } else if (currentDirection === 'F') {
        // initialPosition['Coordinates'] = coordinatesByDirection(initialDirection, currentPosition, initialPosition['Coordinates']);

        let coordinates = multiplyCoordinates(currentPosition, initialPosition['Coordinates']['x'], initialPosition['Coordinates']['y']);
        // ship['Coordinates'] = coordinatesByDirection(initialDirection, coordinates['x'], coordinates['y'],  ship['Coordinates']['x'], ship['Coordinates']['y']);
        ship['Coordinates']['x'] += coordinates['x'];
        ship['Coordinates']['y'] += coordinates['y'];
    }
}
