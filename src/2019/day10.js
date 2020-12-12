function findGcd(a, b) {
    if (a < b) {
        let temp = a;
        a = b;
        b = temp;
    }
    let gcd = 1;
    while (b > 0) {
        gcd = b;
        b = a % b;
        a = gcd;
    }
    return gcd;
}
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
                "unreachableNodes": [],
                "availableSights": []
            }
            asteroid_array.push(asteroid);
        }
    }
}

for (let i = 0; i < asteroid_array.length; i++) {
    for (let j = i + 1; j < asteroid_array.length; j++) {
        let nodeVisited = checkForReachableOrUnReachableNodes(asteroid_array[i], asteroid_array[j]);
        if (!nodeVisited) {
            let ratio = getSightRatioBetweenNodes(asteroid_array[i], asteroid_array[j]);
            let isSightAvailable = checkAvailableSights(asteroid_array[i], ratio);
            matchSourceDestination(asteroid_array[i], asteroid_array[j], !isSightAvailable);
            if(!isSightAvailable){
                asteroid_array[i].availableSights.push(ratio);
            }

        }
    }
}

console.log(asteroid_array);


function getSightRatioBetweenNodes(source, destination) {
    let distance = {
        x: destination.x - source.x,
        y: destination.y - source.y
    };

    let gcd = findGcd(distance.x, distance.y);
    return {
        x: distance.x / gcd,
        y: distance.y / gcd
    }
}

function checkAvailableSights(node, ratio) {
    let availableSights = node.availableSights;
    for (let i = 0; i < availableSights.length; i++) {
        if (availableSights[i].x === ratio.x && availableSights[i].y === ratio.y) {
            return true
        }
    }
    return false;
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