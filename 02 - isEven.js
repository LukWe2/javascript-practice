// % ist der Modulo-Operator.
// Er gibt den Rest einer Division zurück.
// === ist der strikte Vergleichsoperator.
// Er prüft, ob sowohl der Wert als auch der Datentyp gleich sind.

function isEven(number){
    if (number % 2 === 0){
        return true;
    } else{
        return false;
    }
}

console.log(isEven(5));