/*
Version vorher:

function reverseArray(numbers){

    let reversed = [];

    for (let i = numbers.length - 1; i >= 0; i--){
        for (let j = 0; j < numbers.length; j++){
            reversed[j] = numbers[i]
        }
    }

    return reversed;
}

Fehler:

1. die zweite Schleife
- mit dieser wird Array reversed immer mit dem Wert von i voll gemacht für jeden Durchlauf von i
- also bei i = 4 wäre reversed danach [5, 5, 5, 5, 5] und nach i = 3 danach [4, 4, 4, 4, 4]


*/



function reverseArray(numbers){

    let reversed = [];

    for (let i = numbers.length - 1; i >= 0; i--){
        reversed.push(numbers[i]);
    }

    return reversed;
}

console.log(reverseArray([5, 4, 3, 2, 1]));



//oder:

/*
function reverseArray(numbers){
    let reversed = [];

    for (let i = 0; i < numbers.length; i++){
        reversed[i] = numbers[numbers.length - 1 - i]
    }

    return reversed;
}

console.log(reverseArray([5, 4, 3, 2, 1]));
*/






/*
Lösung in Java ohne ArrayList:

1.
public static int[] reverseArray(int[] numbers) {

    int[] reversed = new int[numbers.length];

    for (int i = numbers.length - 1, j = 0; i >= 0; i--, j++) {
        reversed[j] = numbers[i];
    }

    return reversed;
}


2. 

public static int[] reverseArray(int[] numbers) {

    int[] reversed = new int[numbers.length];

    for (int i = 0; i < numbers.length; i++) {
        reversed[i] = numbers[numbers.length - 1 - i];
    }

    return reversed;
}


*/