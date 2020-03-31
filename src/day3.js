const util = require('./utils');


function getIntersection() {

    const input = util.readFile('day3.txt');
    // input has 2 rows
    // first row, starting point is x,y
    let firstCoordinates = getCoordinates(input[0]);
    let secondCoordinates = getCoordinates(input[1]);
    let result = 4;
    let intersectionPoints = [];
    for (let i = 1; i < firstCoordinates.length; i++) {
        for (let j = 1; j < secondCoordinates.length; j++) {
            let x1, y1, x2, y2, steps1;
            let x3, y3, x4, y4, steps2;
            x1 = firstCoordinates[i - 1]['x'];
            y1 = firstCoordinates[i - 1]['y'];
            steps1 = firstCoordinates[i - 1]['totalSteps'];
            x2 = firstCoordinates[i]['x'];
            y2 = firstCoordinates[i]['y'];

            if (y1 === y2) {
                let temp = Math.min(x1, x2);
                let temp1 = Math.max(x1, x2);
                x1 = temp;
                x2 = temp1;
            }

            if (x1 === x2) {
                let temp = Math.min(y1, y2);
                let temp1 = Math.max(y1, y2);
                y1 = temp;
                y2 = temp1;
            }

            x3 = secondCoordinates[j - 1]['x'];
            y3 = secondCoordinates[j - 1]['y'];
            steps2 = secondCoordinates[j - 1]['totalSteps'];
            x4 = secondCoordinates[j]['x'];
            y4 = secondCoordinates[j]['y'];

            if (y3 === y3) {
                let temp = Math.min(x3, x4);
                let temp1 = Math.max(x3, x4);
                x3 = temp;
                x4 = temp1;
            }

            if (x3 === x4) {
                let temp = Math.min(y3, y4);
                let temp1 = Math.max(y3, y4);
                y3 = temp;
                y4 = temp1;
            }

            // console.log(`x1,y1: ${x1},${y1}    x2,y2: ${x2},${y2}     x3,y3: ${x3},${y3}    x4,y4: ${x4},${y4}`)

            if ((y3 === y4 && y1 < y3 && y2 > y3) &&
                (x1 === x2 && x3 < x1 && x4 > x1)) {
                console.log(`x1,y1: ${x1},${y1}    x2,y2: ${x2},${y2}     x3,y3: ${x3},${y3}    x4,y4: ${x4},${y4}`)
                // found the coordinates. 
                intersectionPoints.push({
                    x: x1, y: y3, totalSteps: steps1 + (x1 - x3) + steps2 + (y3 - y1)
                })
            } else if ((y1 === y2 && y3 < y1 && y4 > y1) &&
                (x3 === x4 && x1 < x3 && x2 > x3)) {
                console.log(`x1,y1: ${x1},${y1}    x2,y2: ${x2},${y2}     x3,y3: ${x3},${y3}    x4,y4: ${x4},${y4}`)
                intersectionPoints.push({
                    x: x3, y: y1, totalSteps: steps1 + (x3 - x1) + steps2 + (y1 - y3)
                });
            }
        }
    }
    let minimalDistance, minimumSteps;
    for (let i = 0; i < intersectionPoints.length; i++) {
        let currentDistance = Math.abs(intersectionPoints[i].x) + Math.abs(intersectionPoints[i].y);
        if (!minimalDistance) {
            minimalDistance = currentDistance;
        } else if (minimalDistance > currentDistance) {
            minimalDistance = currentDistance
        }

        if(!minimumSteps){
            minimumSteps = intersectionPoints[i]['totalSteps'];
        } else if(minimumSteps > intersectionPoints[i]['totalSteps']){
            minimumSteps = intersectionPoints[i]['totalSteps'];
        }
    }
    console.log(minimumSteps);
    return minimalDistance;

}


function getCoordinates(input) {
    let firstRowCoordinates = [{
        x: 0, y: 0
    }];
    let x = 0;
    let y = 0;
    let firstRowElements = input.split(",");
    let totalSteps = 0;

    for (let i = 0; i < firstRowElements.length; i++) {
        let direction = firstRowElements[i][0];
        let coordinate = firstRowElements[i].substring(1, firstRowElements[i].length);
        switch (direction) {
            case "L":
                y = y - parseInt(coordinate);
                break;
            case "R":
                y = y + parseInt(coordinate);
                break;
            case "U":
                x = x + parseInt(coordinate);
                break;
            case "D":
                x = x - parseInt(coordinate);
                break;
        }
        totalSteps = totalSteps + parseInt(coordinate);

        firstRowCoordinates.push({
            x: x,
            y: y,
            direction: direction,
            totalSteps: totalSteps
        });
    }
    return firstRowCoordinates;
}

module.exports = { getIntersection };