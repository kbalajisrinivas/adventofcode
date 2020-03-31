

function differentSetOfPasswords() {
    let validNumberCount = 0;
    let valid_numbers = [];
    for (let i = 356261; i < 846303; i++) {
        const isValid = isValidNumber(i);
        if (!isValid.result) {
            i = isValid.nextNumber - 1;
        } else {
            console.log(i);
            valid_numbers.push(i);
            validNumberCount++;
        }
    }
    console.log(JSON.stringify(valid_numbers));
    console.log(JSON.stringify(invalid_numbers));
    return validNumberCount;

}
let invalid_numbers = [];

differentSetOfPasswords();


function isValidNumber(num) {
    let mod = null, prev = null, difference, digits = 0, isDoubleDigit;
    let str_num = num.toString();
    let doubleCounter = {};
    while (num > 0) {
        digits++;
        mod = num % 10;
        num = Math.floor(num / 10);
        if (mod !== null && prev !== null) {
            if (prev < mod) {
                difference = digits;
            }
            if (prev === mod) {
                isDoubleDigit = true;
                if (!doubleCounter[mod]) {
                    doubleCounter[mod] = 0;
                }
                doubleCounter[mod] = doubleCounter[mod] + 1;
            }
        }
        prev = mod;
    }


    if (!isDoubleDigit) {
        return { result: false, nextNumber: parseInt(str_num) + 1 }
    }

    //if doubleCounter is 1, there is only pair, if it is 2, there are no pairs(3 number i.e 123444)
    if (!difference) {
        let keys = Object.keys(doubleCounter);
        let evenPairs = false;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (doubleCounter[key] == 1) {
                evenPairs = true;
            }
        }
        if (evenPairs) {
            return {
                result: true
            }
        } else {
            invalid_numbers.push(str_num);
            return { result: false, nextNumber: parseInt(str_num) + 1 };
        }
    }

    str_num = str_num.substring(0, str_num.length - difference + 1);
    const last_char = str_num[str_num.length - 1];
    for (let i = 0; i < difference - 1; i++) {
        str_num = str_num + last_char;
    }
    return { result: false, nextNumber: parseInt(str_num) }
}


/*


1 - 100 --> 55

356261


356666

356262



*/