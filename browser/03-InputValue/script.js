const input = document.getElementById("nameInput");
const button = document.getElementById("showButton");
const paragraph = document.getElementById("output");

button.addEventListener("click", function(){
    paragraph.textContent = "Hallo " + input.value + "!";
})

/*
oder cleaner mit Template Literals:

const input = document.getElementById("nameInput");
const button = document.getElementById("showButton");
const paragraph = document.getElementById("output");

button.addEventListener("click", function(){
    paragraph.textContent = `Hallo ${input.value}!`;
})



*/