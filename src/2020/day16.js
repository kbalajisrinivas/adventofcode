const utils = require("../utils");

const fileContent = utils.readFile("day16.txt");

let seatDetails = [];

let counter = 0;
let allValuesSet = new Set();

while (fileContent[counter] !== '') {
    const currentClass = fileContent[counter];
    const classType = currentClass.split(":")[0];
    const possibleValues = (currentClass.split(":")[1]).split(" or ");
    let uniqueValues = new Set();
    for (let i = 0; i < possibleValues.length; i++) {
        let possibleValue = possibleValues[i].split("-");
        let start = parseInt(possibleValue[0], 10);
        let end = parseInt(possibleValue[1], 10);
        for (let i = start; i <= end; i++) {
            uniqueValues.add(i);
            allValuesSet.add(i);
        }
    }
    seatDetails.push(uniqueValues);
    counter++;
}

let nearbyTicketsIndex = 0;
fileContent.forEach((row, index) => {
    if (row === "nearby tickets:") {
        nearbyTicketsIndex = index + 1;
    }
});

let inValidTickets = [];
for (let i = nearbyTicketsIndex; i < fileContent.length; i++) {
    let ticketInfo = fileContent[i].split(",");
    ticketInfo = ticketInfo.map((tinfo) => {
        return parseInt(tinfo, 10);
    })
    for (let j = 0; j < ticketInfo.length; j++) {
        if (!allValuesSet.has(ticketInfo[j])) {
            inValidTickets.push(ticketInfo[j]);
            break;
        }
    }
}

let result = solvePart2(nearbyTicketsIndex, fileContent, seatDetails);

function solvePart2(startingIndex, fileContent, seatDetails) {

    //remove Invalid tickets
    for (let i = startingIndex; i < fileContent.length; i++) {
        let ticketInfo = fileContent[i].split(",");
        ticketInfo = ticketInfo.map((tinfo) => {
            return parseInt(tinfo, 10);
        })
        for (let j = 0; j < ticketInfo.length; j++) {
            if (!allValuesSet.has(ticketInfo[j])) {
                fileContent[j] = "";
                break;
            }
        }
    }

    let allValidSeatCombinations = [];
    for (let i = startingIndex; i < fileContent.length; i++) {
        if (fileContent[i] !== "") {
            // process only valid rows
            let ticketInfo = fileContent[i].split(",");
            ticketInfo = ticketInfo.map((tinfo) => {
                return parseInt(tinfo, 10);
            });
            let possibleCombinationsForSeat = [];
            //For each of the row
            for (let j = 0; j < ticketInfo.length; j++) {
                // check which
                let possibleValuesForOneSet = [];
                const currentValue = ticketInfo[j];
                // current value is one of the column
                // There are 20 different set of sets, we need to see in how many sets does
                // it fit
                for (let k = 0; k < seatDetails.length; k++) {
                    // If a value fits in more than one set, add the possible sets
                    if (seatDetails[k].has(currentValue)) {
                        possibleValuesForOneSet.push(k);
                    }
                }
                possibleCombinationsForSeat.push(possibleValuesForOneSet);
            }
            allValidSeatCombinations.push(possibleCombinationsForSeat);
        }
    }

    // allValidCombinations has row and column
    // we need to iterate over the columns for each row
    // and find the intersection

    let columns = allValidSeatCombinations[0].length;
    // this will have each column
    let intersectionPoints = [];
    for (let i = 0; i < columns; i++) {
        let intersectionClass = allValidSeatCombinations[0][i];
        for (let j = 1; j < allValidSeatCombinations.length; j++) {
            let currentCombinations = allValidSeatCombinations[j][i];
            let currentCombinationSet = new Set(currentCombinations);
            for (let k = 0; k < intersectionClass.length; k++) {
                if (!currentCombinationSet.has(intersectionClass[k])) {
                    intersectionClass.splice(k, 1);
                }
            }
        }
        // once you go over all the rows, you add the intersection class to the intersection points
        intersectionPoints.push(intersectionClass);
    }

    let intersectionPointSet = intersectionPoints.map((x, index) => {
        return {
            classes: new Set(x),
            index: index
        }
    });


    // what's the confusion?
    // we have the index and possible values
    // value tells where should it go
    //once all the index has only unique values
    // we need to find the 

    let indexValueMapping = [];

    let counter = 0;
    while (intersectionPointSet.length > 0) {
        intersectionPointSet.sort((a, b) => {
            return a.size - b.size;
        });

        let uniqueIntersectionPoint = intersectionPointSet[0];
        let classTobeRemoved = uniqueIntersectionPoint.classes.values().next().value;
        // uniqueIntersectionPoint should have only 1 in the value
        indexValueMapping.push({
            index: uniqueIntersectionPoint.index,
            value: [...uniqueIntersectionPoint.classes][0]
        });
        //now we need to remove that one value from all the others.
        intersectionPointSet.shift();

        // now we need to remove
        intersectionPointSet.map((x) => {
            x.classes.delete(classTobeRemoved);
        });
        counter++;
    }

    indexValueMapping.sort((a, b) => {
        return a.value - b.value
    });

    let ticket = [151, 139, 53, 71, 191, 107, 61, 109, 157, 131, 67, 73, 59, 79, 113, 167, 137, 163, 149, 127];
    let result = 1;
    for (let i = 0; i < 6; i++) {
        let indexOfTicket = indexValueMapping[i].index;
        result = result * ticket[indexOfTicket];
    }
    console.log(result);

    console.log(allValidSeatCombinations);
}

let errorRate = 0;
for (let i = 0; i < inValidTickets.length; i++) {
    errorRate = errorRate + inValidTickets[i];
}

console.log(invalidTickets);
console.log(fileContent);