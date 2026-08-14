/*
Version vorher:

function getEvenNumbers(numbers){

    let evenNumbersArray = [];

    for (let i = 0; i < numbers.length; i++){
        if (numbers[i] % 2 === 0){
            evenNumbersArray[i] = numbers[i];
        }
    }

    return evenNumbersArray;
}

Fehler:

1. evenNumbersArray[i] = numbers[i];
- das setzt die gerade Zahl an den gleichen Index im neuen Array wie im alten und nicht nacheinander wie gedacht, dadurch wird vorher ein leeres Element
hinzugefügt und Ergebnis wäre falsch
- Ergebnis wäre: [ <leer>, <leer>, 4, 8, <leer>, 2 ] also (6) […, 4, 8, …, 2] und nicht wie gedacht [4, 8, 2]
- push() sagt: Hänge diesen Wert hinten an das Array an. -> gibt es aber in Java nicht beim Array (außer bei ArrayList gibt es .add())


*/

function getEvenNumbers(numbers){

    let evenNumbersArray = [];

    for (let i = 0; i < numbers.length; i++){
        if (numbers[i] % 2 === 0){
            evenNumbersArray.push(numbers[i]);
        }
    }

    return evenNumbersArray;
}

console.log(getEvenNumbers([3,5,4,8,9,2,1]));




/*
Lösung in Java ohne ArrayList und .add() wäre:

public static int[] getEvenNumbers(int[] numbers) {

    // 1. Zuerst zählen, wie viele gerade Zahlen es gibt
    int count = 0;

    for (int i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 == 0) {
            count++;
        }
    }

    // 2. Array mit genau der benötigten Größe erstellen
    int[] evenNumbers = new int[count];

    // Eigener Index für das neue Array
    int index = 0;

    for (int i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 == 0) {

            evenNumbers[index] = numbers[i];
            index++;
        }
    }

    return evenNumbers;
}

*/