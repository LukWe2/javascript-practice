const list = document.getElementById("shoppingList");
const input = document.getElementById("itemInput");
const button = document.getElementById("addButton");

button.addEventListener("click", function(){
    const newItem = document.createElement("li");
    newItem.textContent = input.value;

    list.appendChild(newItem);

    // damit leert sich Eingabefeld nach Hinzufügen von Element/Button drücken
    input.value = "";
});