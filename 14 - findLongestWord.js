/*
Kleine Verbesserung:

Edge Case leeres Array absichern durch Prüfung:
    if (words.length === 0){
        return null;
    }
- die war vorher nicht drin in meiner Lösung
*/

function findLongestWord(words){
    if (words.length === 0){
        return null;
    }
    
    let currentLongestWord = words[0];

    for (let i = 0; i < words.length; i++){
        if (words[i].length > currentLongestWord.length){
            currentLongestWord = words[i];
        }
    }

    return currentLongestWord;
}

console.log(findLongestWord(["cat", "elephant", "dog", "giraffe"]));