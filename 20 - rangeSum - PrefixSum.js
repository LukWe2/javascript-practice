// allgemein: Indexe in Methodenkopf sind 0-basiert und start und end sollen inklusive sein!
function rangeSum(numbers, start, end){

    const prefixSum = [];

    // erstellen des Prefix Sum Array also Array in dem aktuelles Element jeweils die bisherige Summe + aktuelles Element ist
    //da für jedes Element O(n)
    for (let i = 0; i < numbers.length; i++){

        // checken hier nach 0 weil erstes Element einfach die erste Zahl ist, man kann nicht ohne diese Zuweisung bei Position 1, weil 
        // sonst unten prefixSum[i - 1] gleich prefixSum[0 - 1] und somit prefixSum[-1] wäre 
        if (i === 0) {
        prefixSum[i] = numbers[i];
        } else {
            // in aktuelle Stelle in neuem prefixSum Array, packe die Addition der bisherigen Summe (prefixSum[i - 1]) und aktueller Zahl (numbers[i])
            // numbers:     [2,  4,  6,  8, 10]
            // prefixSum:   [2,  6, 12, 20, 30]
            prefixSum[i] = prefixSum[i - 1] + numbers[i];
        }
    }

    // Wenn der Bereich bei Index 0 beginnt, muss nichts davor abgezogen werden.
    // also returne einfach die Zahl ganz am Ende von Array prefixSum also mit index end (ist ja die Summe aus allen Zahlen vorher)
    if (start === 0){
        return prefixSum[end];
    }

    // returne Element in PrefixSum Array an Stelle mit index end minus Element in PrefixSum Array an Stelle mit index start - 1, 
    // weil Start noch inklusive sein soll und Array 0-basiert ist (also geben ja 1 als Start an und wollen dann wirklich erstes Element, da ist aber an 0-ter Stelle im Array)
    // muss start - 1 machen weil das ja der Index ist und die Stelle an start - 1 (ist der Index für diese Stelle) die Summe von allem vor start beinhaltet und start soll ja noch drin also inklusive sein, deswegen Summe aller Elemente vorher
    return prefixSum[end] - prefixSum[start - 1];
}


console.log(rangeSum([2, 4, 6, 8, 10], 1, 3));


/*
Variante mit Prefix Sum:
// Prefix Sum speichert an jeder Position die Summe aller bisherigen Elemente (also an Position 3 z.B. Summe von Element 1 + Element 2 + Element 3).
// Dadurch muss eine Bereichssumme nicht jedes Mal neu mit einer Schleife berechnet werden wie mit Variante oben.
// Nach einmaligem Aufbau in O(n) kann jede Bereichssumme in O(1) berechnet werden.

// intern entsteht:
// numbers:     [2,  4,  6,  8, 10]
// prefixSum:   [2,  6, 12, 20, 30]

function rangeSum(numbers, start, end){

    let sum = 0;

    for (let i = start; i <= end; i++){
        sum += numbers[i];
    }

    return sum;
}


console.log(rangeSum([2, 4, 6, 8, 10], 1, 3));

*/




/*
Version vorher:

function rangeSum(numbers, start, end){

    let sum = 0;

    for (let i = start; i <= end - start; i++){
        sum += numbers[i];
    }

    return sum;
}

Fehler:
- wollen nicht bis end - start laufen sondern bis ganz zu end also richtig ist "i <= end"
- end - start ist eher üblich für Distanzen oder Anzahl der Elemente zwischen der Spanne (Achtung, wenn man Elementenzahl inklusive Start und Ende, dann braucht man end - start + 1 statt nur end - start)
- unabhängig davon nur zur Notiz: start ist 1-basiert ist und nicht 0-basiert, also 1 im Methodenkopf heißt tatsächlich zweites Element (0,1) und nicht das erste also 0
*/