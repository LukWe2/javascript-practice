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
- Button hat kein Text, muss mit deleteButton.textContent = "Löschen"; erst hinzugefügt werden
- Button wird nicht angezeigt weil er zwar erstellt aber nicht zum DOM hinzugefügt
wurde, muss mit newItem.appendChild(deleteButton); erst gemacht werden, weil jedes
Element ja ein Löschen Button haben soll in der Liste
- remove() Function fehlt für den eigentlichen Zweck nämlich das Löschen des jeweiligen Elements in der Liste





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

Fehler:
- .remove() wird direkt auf dem Element aufgerufen, was gelöscht werden soll, nicht 
auf document allgemein
- da wir den gesamten Listeneintrag und nicht nur den Button löschen wollen, ist die
richtige Lösung newItem.remove();

*/