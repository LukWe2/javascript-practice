const userButton = document.getElementById("userButton");
const guestButton = document.getElementById("guestButton");
const output = document.getElementById("output");


function createGreeting(name = "Gast", role = "Besucher"){

    return `Hallo ${name} - ${role}`;;

};


userButton.addEventListener("click", function(){

    output.textContent = createGreeting("Anna", "Developer");

});



guestButton.addEventListener("click", function(){

    output.textContent = createGreeting();

});