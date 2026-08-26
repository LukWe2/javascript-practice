const taskList = document.getElementById("taskList");

let tasks = [
    {
        id: 1,
        text: "JavaScript lernen",
        done: false
    },
    {
        id: 2,
        text: "React lernen",
        done: false
    },
    {
        id: 3,
        text: "TypeScript lernen",
        done: false
    }
];



function renderTasks(){
    taskList.replaceChildren();

    tasks.forEach(function(task){

        const newItem = document.createElement("li");
        newItem.textContent = task.text;
        newItem.dataset.id = task.id;
        taskList.append(newItem);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        // Klasse um im Listener zu prüfen, ob wirklich ein Delete Button gedrückt wurde
        // sonst würde beim Klick von allem (z.B. auch vom Text) das Event Bubbling auslösen
        // und die Listener Funktion triggern, aber wollen nur wenn man Button gedrückt hat
        // weil Listener Logik für Löschen hat was nur mit Delete Button ausgelöst werden können soll
        deleteButton.classList.add("deleteButton");
        newItem.append(deleteButton);
    });
}


renderTasks();


taskList.addEventListener("click", function(event){

    if (!event.target.classList.contains("deleteButton")) {
        return;
    }

    const selectedItem = event.target.closest("li");

    if (selectedItem){

        const id = Number(selectedItem.dataset.id);

        tasks = tasks.filter(function(task){
            return task.id !== id;
        });

        renderTasks();
    }
});