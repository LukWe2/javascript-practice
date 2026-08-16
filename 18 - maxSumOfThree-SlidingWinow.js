/*
Version vorher:

function maxSumOfThree(numbers){

    let highestSum = 0;

    let currentSum = 0;

    for (let i = 0; i < numbers.length - 2; i++){
        currentSum = numbers[i] + numbers[i + 1] + numbers[i + 2];

        if (currentSum > highestSum){
            highestSum = currentSum;
        }
    }

    return highestSum;
}

Fehler:

1. Edge Case nicht beachtet, dass nur negative Zahlen in Array sind, dann würde als highestSum 0 returned werden, was aber nicht stimmt (z.B. bei [-5, -2, -3] müsste -10 zurückgegebenen werden als maximale Summe)
- statt let highestSum = 0; zu machen, einfach die Summe der ersten drei Elemente als Startwert nehmen



*/



// diese Version ist schon O(n), da man nur einmal durchs Array geht, gibt aber noch elegantere/fortgeschrittenere Variante mit Sliding Window (siehe unten):
/*
function maxSumOfThree(numbers){

    let highestSum = numbers[0] + numbers[1] + numbers[2];

    let currentSum = 0;

    for (let i = 0; i < numbers.length - 2; i++){
        currentSum = numbers[i] + numbers[i + 1] + numbers[i + 2];

        if (currentSum > highestSum){
            highestSum = currentSum;
        }
    }

    return highestSum;
}


console.log(maxSumOfThree([4, 2, 1, 7, 8, 1]));
*/


function maxSumOfThree(numbers){

    let currentSum = numbers[0] + numbers[1] + numbers[2];
    let highestSum = currentSum;

    for (let i = 3; i < numbers.length; i++){
        currentSum = currentSum - numbers[i - 3] + numbers[i];

        if (currentSum > highestSum){
            highestSum = currentSum;
        }
    }

    return highestSum;
}


console.log(maxSumOfThree([4, 2, 1, 7, 8, 1]));

