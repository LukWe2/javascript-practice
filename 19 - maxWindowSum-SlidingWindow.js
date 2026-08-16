/*
Version vorher:

function maxWindowSum(numbers, k){

    let currentSum = 0;

    for (let i = 0; i <= k; i++){
        currentSum += numbers[i];
    }

    let highestSum = 0;

    for (let i = k; i < numbers.length; i++){

        currentSum = currentSum - numbers[i - k] + numbers[i];

        if (currentSum > highestSum){
            highestSum = currentSum;
        }
    }

    return highestSum;
}


Fehler:

1. for (let i = 0; i <= k; i++){
- Mit `<= k` läuft die Schleife bei z. B. `k = 2` drei Mal:
  `i = 0`, `i = 1` und `i = 2`.
- Dadurch werden `numbers[0]`, `numbers[1]` und `numbers[2]` addiert,
  also drei Elemente statt nur zwei.
- Das liegt daran, dass Array-Indizes bei 0 beginnen.
- Wenn die Fenstergröße `k = 2` ist, sollen genau zwei Elemente verwendet werden:
  Index 0 und Index 1.
- Deshalb muss die Bedingung `i < k` heißen.
- Dann läuft die Schleife nur für `i = 0` und `i = 1`.

Richtig:
for (let i = 0; i < k; i++){
    currentSum += numbers[i];
}
*/



function maxWindowSum(numbers, k){

    let currentSum = 0;

    for (let i = 0; i < k; i++){
        currentSum += numbers[i];
    }

    let highestSum = 0;

    for (let i = k; i < numbers.length; i++){

        currentSum = currentSum - numbers[i - k] + numbers[i];

        if (currentSum > highestSum){
            highestSum = currentSum;
        }
    }

    return highestSum;
}

console.log(maxWindowSum([4, 2, 1, 7, 8, 1], 2));