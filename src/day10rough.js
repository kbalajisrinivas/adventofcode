const util = require('./utils');

const all_lines = util.readFile('day10Input.txt');

const input_array = [];
for (let i = 0; i < all_lines.length; i++) {
    let single_line = all_lines[i].split("");
    input_array.push(single_line)
}

const column_max = input_array[0].length;
const row_max = input_array.length;

const asteroid_array = [];

for (let i = 0; i < input_array.length; i++) {
    for (let j = 0; j < input_array[i].length; j++) {
        if (input_array[i][j] === "#") {
            let asteroid = {
                "x": i,
                "y": j,
                "reachableNodes": [],
                "unreachableNodes": []
            }
            asteroid_array.push(asteroid);
        }
    }
}

for (let i = 0; i < asteroid_array.length; i++) {
    for (let j = i + 1; j < asteroid_array.length; j++) {
        let nodeAlreadyVisited = checkForReachableOrUnReachableNodes(asteroid_array[i], asteroid_array[j]);
        // if we have already visited the node, don't do anything.
        // Otherwise we need to find the distance between them
        if (!nodeAlreadyVisited) {
            let distance = getDistanceBetweenNodes(asteroid_array[i], asteroid_array[j]);
            let distanceType = getDistanceType(asteroid_array[i], asteroid_array[j]);
            matchSourceDestination(asteroid_array[i], asteroid_array[j], true);
            switch (distanceType) {
                case "Diagonal":
                    // set false for all the other nodes in the diagonal
                    handleDiagonalDistance(asteroid_array[i], asteroid_array[j], distance);
                    break;
                case "Row":
                    // set false for all the other nodes in the same column (loop over the rows)
                    handleRowDistance(asteroid_array[i], asteroid_array[j], distance);
                    break;
                case "Column":
                    // set false for all the other nodes in the same row (loop over the columns)
                    handleColumnDistance(asteroid_array[i], asteroid_array[j], distance);
                    break;
                default:
                    // set false for all the other nodes in the same distance
                    checkWhetherNodeAvailable(asteroid_array[i], asteroid_array[j], distance, false);
                    break;
            }
        }
    }
}

console.log(asteroid_array);

function handleDiagonalDistance(source, referenceNode, distance) {
    // diagonal to the right bottom
    if (distance.x > 0 && distance.y > 0) {
        let i = referenceNode.x + 1;
        let j = referenceNode.y + 1;
        while (i < row_max && j < column_max) {
            let asteroid = getAsteroidsByCoordinates(i, j);
            if (asteroid) {
                matchSourceDestination(source, asteroid, false);
            }
            i++;
            j++;
        }
        // diaganol to the top left
    } else if (distance.x < 0 && distance.y < 0) {
        let i = referenceNode.x - 1;
        let j = referenceNode.y - 1;
        while (i > 0 && j > 0) {
            let asteroid = getAsteroidsByCoordinates(i, j);
            if (asteroid) {
                matchSourceDestination(source, asteroid, false);
            }
            i--;
            j--;
        }
        // bottom left
    } else if (distance.x > 0 && distance.y < 0) {
        //row increase, column decrease
        let i = referenceNode.x + 1;
        let j = referenceNode.y - 1;
        while (i < row_max && j > 0) {
            let asteroid = getAsteroidsByCoordinates(i, j);
            if (asteroid) {
                matchSourceDestination(source, asteroid, false);
            }
            i++;
            j--;
        }
        // top right
    } else if (distance.x < 0 && distance.y > 0) {
        // row decrease, column increase
        let i = referenceNode.x - 1;
        let j = referenceNode.y + 1;
        while (j < row_max && i > 0) {
            let asteroid = getAsteroidsByCoordinates(i, j);
            if (asteroid) {
                matchSourceDestination(source, asteroid, false);
            }
            i--;
            j++;
        }
    }
}

function handleColumnDistance(source, referenceNode, distance) {
    let current_pos = referenceNode.y;
    for (let i = current_pos + 1; i < column_max; i++) {
        if (input_array[referenceNode.x][i] === "#") {
            let asteroid = getAsteroidsByCoordinates(referenceNode.x, i);
            if (asteroid) {
                matchSourceDestination(source, asteroid, false);
            }
        }
    }
}

function handleRowDistance(source, distance) {
    let current_pos = source.x;
    for (let i = current_pos + 1; i < row_max; i++) {
        if (input_array[i][source.y] === "#") {
            let asteroid = getAsteroidsByCoordinates(i, source.y);
            if (asteroid) {
                matchSourceDestination(source, asteroid, false);
            }
        }
    }
}

function getDistanceType(source, destination) {
    if (Math.abs(source.x - destination.x) === Math.abs(source.y - destination.y)) {
        return "Diagonal";
    } else if (source.x - destination.x === 0) {
        return "Column";
    } else if (source.y - destination.y === 0) {
        return "Row";
    } else {
        return "Random";
    }
}


function checkWhetherNodeAvailable(source, node, distance, isMatch) {
    matchSourceDestination(source, node, isMatch);
    let nextNode = {
        "x": node.x + distance.x,
        "y": node.y + distance.y
    }

    let nextAsteroid = getNextAsteroid(node, distance);
    if (nextAsteroid) {
        checkWhetherNodeAvailable(source, nextAsteroid, distance, false);
    }
    else {
        // we have reached the end of the matrix (either x or y)
        return;
    }
}

function getNextAsteroid(node, distance) {
    let nextNode = getNodeByDistance(node, distance);
    if (nextNode.x < 0 || nextNode.x >= input_array[0].length || nextNode.y < 0 || nextNode.y >= input_array.length) {
        return null;
    }
    if (input_array[nextNode.x][nextNode.y] === "#") {
        return getAsteroidsByCoordinates(nextNode.x, nextNode.y);
    } else {
        return getNextAsteroid(nextNode, distance)
    }
}

function getAsteroidsByCoordinates(x, y) {
    for (let i = 0; i < asteroid_array.length; i++) {
        if (asteroid_array[i].x === x && asteroid_array[i].y === y) {
            return asteroid_array[i];
        }
    }
}

function matchSourceDestination(source, destination, isMatch) {
    if (isMatch) {
        source["reachableNodes"].push({
            "x": destination.x,
            "y": destination.y
        });

        destination["reachableNodes"].push({
            "x": source.x,
            "y": source.y
        });
    } else {
        source["unreachableNodes"].push({
            "x": destination.x,
            "y": destination.y
        });

        destination["unreachableNodes"].push({
            "x": source.x,
            "y": source.y
        });
    }
}

function getNodeByDistance(node, distance) {
    return {
        "x": node.x + distance.x,
        "y": node.y + distance.y
    }
}

function getDistanceBetweenNodes(source, destination) {
    return {
        x: destination.x - source.x,
        y: destination.y - source.y
    }
}

function checkForReachableOrUnReachableNodes(source, destination) {
    const reachableNodes = source.reachableNodes;
    const unreachableNodes = source.unreachableNodes;

    for (let i = 0; i < reachableNodes.length; i++) {
        if (reachableNodes[i].x === destination.x && reachableNodes[i].y === destination.y) {
            return true;
        }
    }

    for (let i = 0; i < unreachableNodes.length; i++) {
        if (unreachableNodes[i].x === destination.x && unreachableNodes[i].y === destination.y) {
            return true;
        }
    }
    return false;
}


// console.log(input);