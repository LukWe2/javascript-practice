// gehen jede Zahl im Array einmal durch, schauen für jedes Element einmal ob Zahl schon drin ist, wenn ja Eintrag in Map hochzählen,
// wenn nicht dann mit Zähler 1 eintragen

function countFrequenciesWithMap(numbers){

    const counts = new Map();

    for (let i = 0; i < numbers.length; i++){
        
        const number = numbers[i];

        if (counts.has(number)){
            counts.set(number, counts.get(number) + 1);
        } else{
            counts.set(number, 1);
        }
    }

    return counts;
}

console.log(countFrequenciesWithMap([2, 4, 2, 3, 3, 2, 5]));