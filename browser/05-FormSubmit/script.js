const paragraph = document.getElementById("output");
const form = document.getElementById("profileForm");
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const button = document.getElementById("submit");

form.addEventListener("submit", function(event){
    event.preventDefault();

    paragraph.textContent = `${nameInput.value} ist ${ageInput.value} Jahre alt.`;
})


/*
- Das hier war noch drin, war falsch! Dachte soll zusätzlich noch Button implementieren der gleiches wie Formular macht
- aber: gibt garkein HTML-Element mit id = "submit", bei button ist das der type und nicht die id!
- document.getElementById("submit") liefert hier null, und anschließend kann button.addEventListener(...) einen Fehler erzeugen, 
- weil null keinen addEventListener besitzt


button.addEventListener("click", () => {
    paragraph.textContent = `${nameInput.value} ist ${ageInput.value} Jahre alt.`;
})
    */