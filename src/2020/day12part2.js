const utils = require("../utils");

const fileContents = utils.readFile("day12.txt");

let input = fileContents.map((x) => {
    const direction = x[0];
    const position = parseInt(x.substring(1, x.length), 10);
    return {
        position, direction
    }
});

console.log(input);

let shipPosition = {
    x: 0,
    y: 0,
    direction: "E"
};

let waypoint = {
    x: 10,
    y: 1,
    direction: "E"
}

let allDirections = ["N", "E", "S", "W"];

function coordinatesByDirection(direction, position, x, y) {
    // let currentCoordinate = coordinates;
    if (direction === "N") {
        y += position;
    } else if (direction === "S") {
        y -= position;
    } else if (direction === "W") {
        x -= position;
    } else if (direction === "E") {
        x += position;
    }
    return {
        x: x,
        y: y
    };
}

function calculateFCoordinates(multiplier, x, y) {
    x = x * multiplier;
    y = y * multiplier;
    return {
        x, y
    }
}

let leftRightMappings = {
    '90': 270,
    '180': 180,
    '270': 90,
    '0': 0
}

// Learnings: Used this to plot a point https://www.desmos.com/calculator/mhq4hsncnh
// rotating 90 degrees forms a pattern.
// Spent Waaaay too much time to find the coordinates when the waypoint is rotated at origin
// it was simple once you watched a video on how he calculates the positions
// Got so much confused between the coordinates. Actually when plotting the coordinates in hand
// did not do it correctly. So trying to come up with a pattern did not work.
// having a better knowledge about coordinates would have helped.

for (let i = 0; i < input.length; i++) {
    let currentPosition = input[i];

    if (currentPosition.direction === 'F') {
        // move the ship to the waypoint
        let shipCoordinates = calculateFCoordinates(currentPosition.position, waypoint.x, waypoint.y);
        shipPosition.x += shipCoordinates.x;
        shipPosition.y += shipCoordinates.y;
    }

    if (allDirections.indexOf(currentPosition.direction) !== -1) {
        // explore the options and update the waypoint's coordinates
        let nextWayPointCoordinates = coordinatesByDirection(currentPosition.direction, currentPosition.position, waypoint.x, waypoint.y);
        console.log(nextWayPointCoordinates);
        waypoint.x = nextWayPointCoordinates.x;
        waypoint.y = nextWayPointCoordinates.y;
    }
    if (currentPosition.direction === 'L') {
        let rightCoordinate = leftRightMappings[currentPosition.position];
        let rotations = rightCoordinate / 90;
        for (let j = 0; j < rotations; j++) {
            let temp = waypoint.y;
            waypoint.y = waypoint.x * -1;
            waypoint.x = temp;
        }
    } else if (currentPosition.direction === 'R') {
        // little complicated because we need to update the waypoint's coordinates based on that
        let numberOfRotations = currentPosition.position / 90;
        for (let j = 0; j < numberOfRotations; j++) {
            let temp = waypoint.y;
            waypoint.y = waypoint.x * -1;
            waypoint.x = temp;
        }
    }
}


console.log(waypoint);
console.log(shipPosition);