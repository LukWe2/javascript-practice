/*
Version vorher:
function isPalindrome(word){

    let palindrome = false;

    let reverse = [];

    for (let i = 0; i < word.length; i++){
        reverse[i] = word[word.length - 1 - i];
    }

    for (let j = 0; j < word.length; j++){
        if (reverse[j] != word[word.length - 1 - j]){
            return false;
        }
    }

    return true;
}

Fehler:

1. if (reverse[j] != word[word.length - 1 - j]){
- würde reverse (das Array mit den umgedrehten Buchstaben) wieder mit dem rückwärts gelesenen Original word-Array verglichen
- will aber ja mit dem normalen word-Array vergleichen, deswegen einfach if (reverse[j] != word[j]){


*/


function isPalindrome(word){

    let palindrome = false;

    let reverse = [];

    for (let i = 0; i < word.length; i++){
        reverse[i] = word[word.length - 1 - i];
    }

    for (let j = 0; j < word.length; j++){
        if (reverse[j] != word[j]){
            return false;
        }
    }

    return true;
}


console.log(isPalindrome("anna"));



/*
Noch eine Möglichkeit nur mit einer Schleife und zwei Indizes:

function isPalindrome(word) {

    for (
        let left = 0, right = word.length - 1;
        left < right;
        left++, right--
    ) {
        if (word[left] !== word[right]) {
            return false;
        }
    }

    return true;
}

console.log(isPalindrome("anna"));
*/



/*
Lösung in Java:
- Genau: In Java kann man einen String nicht direkt mit word[i] indexieren wie in JavaScript
- hat zwei typische Möglichkeiten:
1. word.charAt(i)
2. vorher: char[] letters = word.toCharArray();

also:

1.
public static boolean isPalindrome(String word) {

    for (
        int left = 0, right = word.length() - 1;
        left < right;
        left++, right--
    ) {
        if (word.charAt(left) != word.charAt(right)) {
            return false;
        }
    }

    return true;
}



2.
public static boolean isPalindrome(String word) {

    char[] letters = word.toCharArray();

    for (
        int left = 0, right = letters.length - 1;
        left < right;
        left++, right--
    ) {
        if (letters[left] != letters[right]) {
            return false;
        }
    }

    return true;
}

und ohne zwei Indizes:

1.
public static boolean isPalindrome(String word) {

    for (int i = 0; i < word.length(); i++) { -> oder nur: for (int i = 0; i < letters.length / 2; i++) {

        if (word.charAt(i) != word.charAt(word.length() - 1 - i)) {
            return false;
        }
    }

    return true;
}

2.
public static boolean isPalindrome(String word) {

    char[] letters = word.toCharArray();

    for (int i = 0; i < letters.length; i++) { -> oder nur: for (int i = 0; i < word.length() / 2; i++) {

        if (letters[i] != letters[letters.length - 1 - i]) {
            return false;
        }
    }

    return true;
}


*/