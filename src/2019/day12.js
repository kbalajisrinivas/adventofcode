// store the x,y,z for position and velocity for each moon.
`
moon = {
    position: {

    },
    velocity: {

    }
}

loop over steps. 
for each step. compare

<x=-13, y=14, z=-7>
<x=-18, y=9, z=0>
<x=0, y=-3, z=-3>
<x=-15, y=3, z=-13>

`
let moons = [
    {
        id: 1,
        position: {
            x: -13,
            y: 14,
            z: -7
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        },
        potentialEnergy: 0,
        kineticEnergy: 0
    },
    {
        id: 2,
        position: {
            x: -18,
            y: 9,
            z: 0
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        },
        potentialEnergy: 0,
        kineticEnergy: 0
    },
    {
        id: 3,
        position: {
            x: 0,
            y: -3,
            z: -3
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        },
        potentialEnergy: 0,
        kineticEnergy: 0
    },
    {
        id: 4,
        position: {
            x: -15,
            y: 3,
            z: -13
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        },
        potentialEnergy: 0,
        kineticEnergy: 0
    }
]
let stepsCount = 0;
let energy = {};
// x,y and z are independent of each other.
// so if we can individually calculate how many steps it takes to get to the same axis 
// we can find lcm of (x,y,z) to find the actual number.
// brilliant solution. Had to find the hint for the second part

let positions = {
    "x": {
        "found": false,
        "allPositions": {},
        "steps": 0,
        "debug": []
    },
    "y": {
        "found": false,
        "allPositions": {},
        "steps": 0,
        "debug": []
    },
    "z": {
        "found": false,
        "allPositions": {},
        "steps": 0,
        "debug": []
    }
}

while (true) {
    // length -1 because the last element is already compared
    for (let j = 0; j < moons.length; j++) {
        if (j !== moons.length - 1) {
            let remainingElements = moons.slice(j + 1);
            calculateGravity(remainingElements, moons[j]);
            // updateVelocity(moons[j]);
        }
        updateVelocity(moons[j]);
    }
    let axis = ['x', 'y', 'z'];
    let allfound = true;
    for (let i = 0; i < axis.length; i++) {
        // only if they are not found, we will go and check for existence
        if (!positions[axis[i]]["found"]) {
            let isFound = checkForExistence(moons, axis[i]);
            allfound = allfound && isFound;
        }
    }
    if (allfound) {
        // since we have found the number of steps required for each axis to repeat, we can find the LCM
        // LCM of these numbers were found online
        console.log(`x: ${positions['x'].steps}, y: ${positions['y'].steps}, z: ${positions['z'].steps}`);
    }
    stepsCount++;
}

function checkForExistence(moons, axis) {
    // for all the moons, we need to get the axis
    let axisStr = `${axis}`
    for (let i = 0; i < moons.length; i++) {
        axisStr = axisStr + `p${moons[i].position[axis]},`
    }
    for (let i = 0; i < moons.length; i++) {
        axisStr = axisStr + `v${moons[i].velocity[axis]},`
    }
    positions[axis]["debug"].push(axisStr);
    // if string is available
    if (positions[axis]["allPositions"][axisStr]) {
        positions[axis]["found"] = true;
        positions[axis]["steps"] = Object.keys(positions[axis]["allPositions"]).length;
    } else {
        positions[axis]["allPositions"][axisStr] = 1;
    }
    return positions[axis]["found"];
}

// previous approach was to use a dictionary to hold the positions and see whether we can find something similar before
// but that doesn't scale. so this approach does not work
function formUniqueString(moons) {
    let uniqueString = "";
    for (let i = 0; i < moons.length; i++) {
        let moonString = `;${i},x: ${moons[i].position.x},y:${moons[i].position.y},z:${moons[i].position.z}`;
        uniqueString = uniqueString + moonString;
    }
    return uniqueString;
}
let totalEnergy = 0;
for (let i = 0; i < moons.length; i++) {
    calculateEnergy(moons[i]);
    totalEnergy = totalEnergy + moons[i].totalEnergy;
}

console.log(totalEnergy);

function calculateEnergy(moon) {
    moon.potentialEnergy = Math.abs(moon.position['x']) + Math.abs(moon.position['y']) + Math.abs(moon.position['z']);
    moon.kineticEnergy = Math.abs(moon.velocity['x']) + Math.abs(moon.velocity['y']) + Math.abs(moon.velocity['z']);
    moon.totalEnergy = moon.potentialEnergy * moon.kineticEnergy;
}

function updateVelocity(moon) {
    moon.position['x'] = moon.position['x'] + moon.velocity['x'];
    moon.position['y'] = moon.position['y'] + moon.velocity['y'];
    moon.position['z'] = moon.position['z'] + moon.velocity['z'];
}

function calculateGravity(moons, currentMoon) {
    moons.forEach(moon => {
        updateGravityChange(moon, currentMoon, 'x');
        updateGravityChange(moon, currentMoon, 'y');
        updateGravityChange(moon, currentMoon, 'z');
    });
}

function updateGravityChange(otherMoon, currentMoon, axis) {
    if (otherMoon.position[axis] < currentMoon.position[axis]) {
        otherMoon.velocity[axis] = otherMoon.velocity[axis] + 1;
        currentMoon.velocity[axis] = currentMoon.velocity[axis] - 1;
    } else if (otherMoon.position[axis] > currentMoon.position[axis]) {
        otherMoon.velocity[axis] = otherMoon.velocity[axis] - 1;
        currentMoon.velocity[axis] = currentMoon.velocity[axis] + 1;
    } else[
        //do nothing
    ]
}