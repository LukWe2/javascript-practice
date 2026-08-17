const button = document.getElementById("highlightButton");
const paragraph = document.getElementById("message");

button.addEventListener("click", function(){
    paragraph.classList.toggle("highlight");
});