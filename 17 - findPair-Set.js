/*
Version vorher:

function findPair(numbers, target){

    const numbersSet = new Set();

    let resultArray = [];

    let currentSum = 0;

    for (let i = 0; i < numbers.length; i++){

        currentSum = numbers[i] + numbers[i + 1];

        if (!numbersSet.has(currentSum)){
            numbersSet.add(currentSum)
        }

        if (currentSum === target){
            resultArray.push(numbers[i]);
            resultArray.push(numbers[i + 1]);

            return resultArray;
        }
    }

    return null;
}

Fehler:

1. 
- vergleiche wieder nur Zahlen nebeneinander mit currentSum = numbers[i] + numbers[i + 1];, die zwei Zahlen die target ergeben können aber irgendwo im Array sein




*/



//with going trough the array for every element in Array and thus complexity O(n^2):

/*
function findPair(numbers, target){

    let resultArray = [];

    for (let i = 0; i < numbers.length; i++){
        for (let j = i + 1; j < numbers.length; j++){
            if (numbers[i] + numbers[j] === target){
                resultArray.push(numbers[i]);
                resultArray.push(numbers[j]);
            }
        }
    }

    return resultArray;
}


console.log(findPair([2, 11, 7, 15], 9));
*/


// with Set so have to go through Array only once, thus complexity O(n):
// for every current number in Array calculate the number that is missing from reaching target, if Set contains that difference then return the missing number and the current number in array
// otherwise add the current number to the Set (which then could be the missing number in one of the remaining iterations!)

function findPair(numbers, target){

    const numbersSet = new Set();

    for (let i = 0; i < numbers.length; i++){

        let missing = target - numbers[i];

        if (numbersSet.has(missing)){
            return [missing, numbers[i]];
        }

        numbersSet.add(numbers[i]);
    }

    return null;
}

console.log(findPair([2, 11, 7, 15], 9));