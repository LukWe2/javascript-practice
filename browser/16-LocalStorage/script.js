const saveButton = document.getElementById("saveButton");
const input = document.getElementById("nameInput");
const output = document.getElementById("output");

saveButton.addEventListener("click", function(){
    localStorage.setItem("username", input.value);

    output.textContent = "Gespeicherter Name: " + localStorage.getItem("username");
});


const savedName = localStorage.getItem("username");

if (savedName){
    output.textContent = "Gespeicherter Name: " + savedName;
}
