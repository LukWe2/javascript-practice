/*
Version vorher:

function removeDuplicates(numbers) { 
    const numbersSet = new Set(); 
    
    let withoutDuplicates = []; 
    
    for (let i = 0; i < numbers.length; i++) 
        { 
            if (numbersSet.has(numbers[i])) { 
                break; 
            } else { 
                withoutDuplicates.push(numbers[i]); 
            } 
        } 
        
        return withoutDuplicates; 
    } 
    
    console.log(removeDuplicates([1, 2, 2, 3, 1, 4]));

Fehler:

1. break; 
- break bricht gesamte Schleife ab also auch die for-Schleife, nicht nur Durchgang, das würde continue machen
- ist außerdem einfacher zu prüfen, ob Zahl nicht im Set ist und dann etwas zu tun statt zu prüfen ob sie schon drin ist und dann nichts zu tun

2.  else { 
        withoutDuplicates.push(numbers[i]); 
    }
- im else Zweig noch dem Set die Zahl hinzufügen, sonst wird sie nicht gemerkt und obwohl sie schon vorkam nochmal ins Array gepusht
*/





function removeDuplicates(numbers) {

    const numbersSet = new Set();

    let withoutDuplicates = [];

    for (let i = 0; i < numbers.length; i++) {
        if (!numbersSet.has(numbers[i])) {
            numbersSet.add(numbers[i]);
            withoutDuplicates.push(numbers[i]);
        }
    }

    return withoutDuplicates;
}

console.log(removeDuplicates([1, 2, 2, 3, 1, 4]));