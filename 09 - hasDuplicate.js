/*
Version vorher:

function hasDuplicate(numbers){

    for (let i = 0; i < numbers.length; i++){
        for (let j = i + 1; j < numbers.length - i; j++){
            if (numbers[i] === numbers[j]){
                return true;
            }
        }
    }

    return false;
}


Fehler:

1. for (let j = i + 1; j < numbers.length - i; j++){
- das i abziehen ist nicht nötig, weil die Abbruchbedingung unabhängig vom Startwert ist
- also ob j bei 0, 1, 2, 3 usw. anfängt ist egal, weil es immer bei z.B. 4 abbricht, wenn numbers 4 Elemente hat
- so überspringt man den rechten Bereich des Arrays zunehmend, weil man immer i weniger Elemente prüft pro i-Durchgang (z.B. bei Bubble Sort)
- aber hier will man ja nach ganz rechts prüfen


*/


function hasDuplicate(numbers){

    for (let i = 0; i < numbers.length; i++){
        for (let j = i + 1; j < numbers.length; j++){
            if (numbers[i] === numbers[j]){
                return true;
            }
        }
    }

    return false;
}


console.log(hasDuplicate([1, 2, 3, 4]));