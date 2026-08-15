/*
Version vorher:

function firstDuplicate(numbers){

    const counts = new Map();

    for (let i = 0; i < numbers.length; i++){

        if (counts.has(numbers[i])){

            counts.set(numbers[i], counts.get(numbers[i] + 1));

            if (counts.get(numbers[i]) === 2){
                return numbers[i];
            }
        } else {
            counts.set(numbers[i], 1);
        }
    }

    return null;
}


Fehler:

1. counts.set(numbers[i], counts.get(numbers[i] + 1));
- möchte hier ja Wert von key hochsetzen, zähle aber den Schlüssel eben hoch und nicht den Wert, Klammer ist falsch gesetzt
- suche dann sozusagen diesen erhöhten Key bei if (counts.get(numbers[i]) === 2){ weil numbers[i] jetzt +1 also einer höher ist
*/


function firstDuplicate(numbers){

    const counts = new Map();

    for (let i = 0; i < numbers.length; i++){

        if (counts.has(numbers[i])){

            counts.set(numbers[i], counts.get(numbers[i]) + 1);

            if (counts.get(numbers[i]) === 2){
                return numbers[i];
            }
        } else {
            counts.set(numbers[i], 1);
        }
    }

    return null;
}
 

console.log(firstDuplicate([2, 1, 3, 3, 4, 6]));