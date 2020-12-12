const utils = require("../utils");

const fileContent = utils.readFile("day7.txt");

let adjacencyList = {};
let inDegreeSet = {};

for (let i = 0; i < fileContent.length; i++) {
    const rowContent = fileContent[i].split("contain");
    const source = rowContent[0].trim();
    let destinations = rowContent[1].split(",");
    let destinationList = [];
    for (let j = 0; j < destinations.length; j++) {
        const destination = destinations[j].trim();
        if (destination !== "no other bags") {
            let firstSpaceIndex = destination.indexOf(" ");
            let count = destination.substring(0, firstSpaceIndex);
            let bagName = destination.substring(firstSpaceIndex + 1, destination.length);
            destinationList.push({
                count: count,
                bagName: bagName
            });
        }
    }
    if (adjacencyList[source] === undefined) {
        adjacencyList[source] = [];
    }
    adjacencyList[source].push(...destinationList);
}

for (const [key, value] of Object.entries(adjacencyList)) {
    let destinations = value;

    if (inDegreeSet[[key]] === undefined) {
        inDegreeSet[[key]] = 0;
    }
    for (let i = 0; i < destinations.length; i++) {
        const bagName = destinations[i].bagName;
        if (inDegreeSet[[bagName]] === undefined) {
            inDegreeSet[[bagName]] = 0;
        }
        inDegreeSet[[bagName]]++;
    }
}

let nodeQueue = [];
for (const [key, value] of Object.entries(inDegreeSet)) {
    if (value === 0) {
        nodeQueue.push(key);
    }
}

let result = [];


for (let j = 0; j < nodeQueue.length; j++) {
    dfs(nodeQueue[j], adjacencyList, []);

}

let resultSet = new Set(result);

console.log(result.size);

function dfs(key, adjacencyList, localResult) {
    if (key === "shiny gold bags") {
        result.push(...localResult);
        return true;
    }
    let allDestinations = adjacencyList[key];
    for (let i = 0; i < allDestinations.length; i++) {
        const destination = allDestinations[i];
        let temp = [...localResult];
        temp.push(key);
        dfs(destination.bagName, adjacencyList, temp);
    }
}


// part 2
var bagCount = 0;
dfsBagCount("shiny gold bags", adjacencyList, 1);
console.log(bagCount);

function dfsBagCount(key, adjacencyList, multiplier) {
    let allDestinations = adjacencyList[key];
    bagCount = bagCount + multiplier;
    for (let i = 0; i < allDestinations.length; i++) {
        const destination = allDestinations[i];
        let destinationBagCount = parseInt(destination.count, 10);
        let mult = multiplier * destinationBagCount;
        dfsBagCount(destination.bagName, adjacencyList, mult);
    }
}

console.log(nodeQueue);


console.log(adjacencyList);
console.log(fileContent);