const button = document.getElementById("changeButton");
const title = document.getElementById("title");

button.addEventListener("click", function(){
    title.textContent = "Der Button wurde geklickt!";
});

/*

const button = document.getElementById("changeButton");
const title = document.getElementById("title");

button.addEventListener("click", () => {
    title.textContent = "Der Button wurde geklickt!";
});

*/

