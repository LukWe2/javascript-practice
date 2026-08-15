// diese Lösung funktioniert, aber hat Laufzeit von O(n^2), untendrunter auskommentiert noch eine Lösung mit Map und bessere/effizientere von O(n)

function mostFrequent(numbers){

    let maxCount = 0;
    let mostFrequentNumber = numbers[0];

    let currentCount = 0;

    for (let i = 0; i < numbers.length; i++){

        currentCount = 0;

        for (let j = 0; j < numbers.length; j++){
            if (numbers[i] === numbers[j]){
                currentCount++;
            }
        }

        if (currentCount > maxCount){
            maxCount = currentCount;
            mostFrequentNumber = numbers[i];
        }
    }

    return mostFrequentNumber;
}

console.log(mostFrequent([1, 2, 2, 3, 3, 3, 3, 4]));


/*
Effizientere Lösung mit Map weil man Array nicht für jedes Element nochmal durchgehen muss sondern nur jedes Element einmal:

function mostFrequent(numbers) {

    const counts = new Map();

    let maxCount = 0;
    let mostFrequentNumber = numbers[0];

    for (const number of numbers) {

        const newCount = (counts.get(number) || 0) + 1;
        counts.set(number, newCount);

        if (newCount > maxCount) {
            maxCount = newCount;
            mostFrequentNumber = number;
        }
    }

    return mostFrequentNumber;
}

*/