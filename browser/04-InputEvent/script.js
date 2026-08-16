const input = document.getElementById("messageInput");
const paragraph = document.getElementById("preview");

input.addEventListener("input", function(){
    paragraph.textContent = `Hier erscheint deine Eingabe: ${input.value}`;
});