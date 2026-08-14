/*
Version vorher (falsch):
function findLargest(numbers){
    const largest = 0;

    for (let i = 0; i < numbers.length; i++){
        if (i > i + 1){
            if (i < numbers.length - 1){
                largest = numbers[i];
            }
        }
    }

    return largest;
}

console.log(findLargest([3, 7, 2, 9, 4]));

Fehler:
1. Code macht nicht das, was er soll ist also inhaltlich falsch!
- prüft Zahlen von links nach rechts und wenn diese größer ist, wird immer die größere Zahl der beiden in largest gespeichert, nicht die größte bisher!

2. if (i > i + 1){:
- i ist nur der Index, nicht die Zahl an der Stelle im Array
- sollte sein: if (numbers[i] > numbers[i + 1]){

3. const largest = 0;
- da largest später überschrieben werden soll von größerer Zahl, muss es let sein weil es nochmal verändert werden soll

4. if (numbers[i] > numbers[i + 1]){
- braucht man hier nicht, weil for-Schleife mit i < numbers.length schon prüft dass Index nicht über Array Länge hinausläuft
- braucht man/wird wichtig, wenn man nicht nur auf numbers[i], sondern auf einen Nachbarn wie numbers[i + 1] zugreift


*/


function findLargest(numbers){
    //let largest = 0; -> war vorher so, würde für Arrays nur mit negativen Zahlen fälschlicherweise 0 zurückgeben, muss so wie unten sein:
    let largest = numbers[0];

    for (let i = 0; i < numbers.length; i++){
            if (numbers[i] > largest){
                largest = numbers[i];
            }
        }

    return largest;
}

console.log(findLargest([3, 13, 2, 9, 4]));