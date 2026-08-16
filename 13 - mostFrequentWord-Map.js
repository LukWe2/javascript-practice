function mostFrequentWord(words){

    const wordsWithCounts = new Map();

    let mostFrequentWord = words[0];

    for (let i = 0; i < words.length; i++){
        if (wordsWithCounts.has(words[i])){
            wordsWithCounts.set(words[i], wordsWithCounts.get(words[i]) + 1);

            if (wordsWithCounts.get(words[i]) > wordsWithCounts.get(mostFrequentWord)){
                mostFrequentWord = words[i];
            }
        } else{
            wordsWithCounts.set(words[i], 1);
        }
    }

    return mostFrequentWord;
}

console.log(mostFrequentWord(["apple", "banana", "apple", "orange", "apple", "banana"]));


/*
Etwas cleaner: 

function mostFrequentWord(words){

    const counts = new Map();

    let mostFrequent = words[0];
    let maxCount = 0;

    for (let i = 0; i < words.length; i++){

        if (counts.has(words[i])){
            counts.set(words[i], counts.get(words[i]) + 1);
        } else {
            counts.set(words[i], 1);
        }

        if (counts.get(words[i]) > maxCount){
            maxCount = counts.get(words[i]);
            mostFrequent = words[i];
        }
    }

    return mostFrequent;
}


*/