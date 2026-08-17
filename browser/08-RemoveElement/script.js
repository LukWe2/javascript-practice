const addButton = document.getElementById("addButton");
const input = document.getElementById("itemInput");
const list = document.getElementById("shoppingList");

addButton.addEventListener("click", function(){
    const newItem = document.createElement("li");
    newItem.textContent = input.value;
    list.appendChild(newItem);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    newItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        newItem.remove();
    });

    input.value = "";
});



/*
Version 1 vorher:

const addButton = document.getElementById("addButton");
const input = document.getElementById("itemInput");
const list = document.getElementById("shoppingList");

addButton.addEventListener("click", function(){
    const newItem = document.createElement("li");

    newItem.textContent = input.value;

    list.appendChild(newItem);

    const deleteButton = document.createElement("button");


    input.value = "";
});

Fehler:
- 



Version 2 vorher:

const addButton = document.getElementById("addButton");
const input = document.getElementById("itemInput");
const list = document.getElementById("shoppingList");

addButton.addEventListener("click", function(){
    const newItem = document.createElement("li");
    newItem.textContent = input.value;
    list.appendChild(newItem);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    newItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        document.remove(deleteButton);
    })

    input.value = "";
});

*/