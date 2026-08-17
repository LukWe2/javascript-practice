function isValidParentheses(text){

    const stack = [];

    for (let i = 0; i < text.length; i++){
        if (text[i] === "("){
            stack.push(text[i]);
        } else {

            if (stack.length === 0) {
                return false;
            }

            stack.pop();
        }
    }

    if (stack.length === 0){
        return true;
    }

    return false;
}


console.log(isValidParentheses("()"));



/*
Version vorher:

function isValidParentheses(text){

    const stack = new Stack();

    for (let i = 0; i < text.length; i++){
        if (text[i] === "("){
            stack.push(text[i]);
        } else {
            stack.pop();
        }
    }

    if (stack.length === 0){
        return true;
    }

    return false;
}

Fehler:
- gibt keinen Stack default in JavaScript also keine Stack Implementation, nimmt hier einfach normales Array, 
was in Javascript auch die Methoden .push() und .pop() hat
- das             "if (stack.length === 0) {
                return false;
            }"
im else-Zweig vegessen, das muss für Fälle rein, wenn eine schließende Klammer (")") ohne vorher geöffnete vorkommt
- weil Stack wird ja aufgefüllt mit geöffneten Klammern und auch wieder entfernt, wenn eine dazu schließende kommt
- wenn aber eine schließende kommt ohne dass vorher eine geöffnete (oder alle geöffneten schon gepoppt wurden und 
somit keine mehr diese geschlossene übrig bleibt), dann ist diese invalide ohne geöffnete Klammer (also invalide und muss false returned werden)
- anders nochmal bei Implementation mit den drei Klammerarten (), [] und {} (siehe nächste Aufgabe)

*/
