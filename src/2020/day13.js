const utils = require("../utils");

const fileContents = utils.readFile("day13.txt");

let earliestTime = parseInt(fileContents[0], 10);

let busIds = [];

let allBuses = fileContents[1].split(",");
allBuses.forEach((bus) => {
    if (bus !== 'x') {
        busIds.push(parseInt(bus, 10));
    }
});

let allBusesAndPositions = [];
allBuses.forEach((bus, index) => {
    if (bus !== 'x') {
        allBusesAndPositions.push({
            busId: parseInt(bus, 10),
            postion: index
        });
    }
});

console.log(busIds);
let allTimes = [];
let maxBus = Math.max(...busIds);

for (let i = 0; i < busIds.length; i++) {
    let counter = 0;
    while (counter <= earliestTime + maxBus) {
        allTimes.push({
            time: counter,
            busId: busIds[i]
        });
        counter = counter + busIds[i];
    }
}

allTimes.sort((a, b) => {
    return a.time - b.time;
});

let counter = 0;
while (allTimes[counter].time < earliestTime) {
    counter++;
}

let result = (allTimes[counter].time - earliestTime) * allTimes[counter].busId;


//part - 2
// get the maxBus
// iterate from  until we find the subsequent buses
// each time you do, check whether time - startingposition % starting === 0
// time + endingposition % ending === 0


let maxBusInfo = null;

let maxBusId = Number.MIN_SAFE_INTEGER;


for(let i=0;i<allBusesAndPositions.length;i++){
    let busId = Math.max(maxBusId, allBusesAndPositions[i].busId);
    if(busId !== maxBusId){
        maxBusInfo = allBusesAndPositions[i];
        maxBusId = busId;
    }
}

let firstBusInfo = allBusesAndPositions[0];
let lastBusInfo = allBusesAndPositions[allBusesAndPositions.length-1];

let timeStamp = 0;
while(true){
    timeStamp = timeStamp + maxBusInfo.busId;

    let isFirstBusCorrectTime = (timeStamp - maxBusInfo.postion) % firstBusInfo.busId === 0;
    let isLastBusCorrectTime = (timeStamp + (lastBusInfo.postion - maxBusInfo.postion)) % lastBusInfo.busId === 0;
    if(isFirstBusCorrectTime && isLastBusCorrectTime){
        break;
    }
}


console.log(allTimes[counter]);
console.log(allTimes);
