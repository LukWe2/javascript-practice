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


// Objekte aus Task bzw. deren Texte als Liste in HTML rendern
// also Datenstruktur Array tasks als Liste in HTML rendern (bzw. deren Texte nur sichtbar)

function renderTasks(){
    taskList.replaceChildren();

    tasks.forEach(function(task){
        const newItem = document.createElement("li");
        newItem.textContent = task.text;
        // li-Element die id aus dem JavaScript Objekt mitgeben als dataset id
        newItem.dataset.id = task.id;


        if (task.done) {
            newItem.classList.add("done");
        }

        taskList.append(newItem);
    });
};


renderTasks();

// nur der Liste einen Listener geben weil Event Bubbling dafür sorgt,
// dass beim Klick des li-Elements das Event nach oben wandert zum Listener
// an der Liste und die Funktion hier auslöst, die für das Verändern verantwortlich ist
// würde sonst denken, warum nicht direkt ans Element? Weil viele dynamsich erstellt werden
// und initial kein Listener an noch nicht existente Elemente gehängt werden können
// also geht dynamisch beim Erzeugen da auch Listener dranzuhängen aber so ist cleaner
taskList.addEventListener("click", function(event){
    // erst checken ob das geklickte wirklich ein Listenelement (bzw. der sichtbare Text) war, sonst würden
    // auch alle anderen Elemente unter der Liste im HTML das Event auslösen weil Event Bubbling von allen
    // nach oben steigt
    //obwohl jetzt nicht noch andere Elemente unter der Liste hängen machen wir hier es für Robustheit
    const selectedItem = event.target.closest("li");

    if (selectedItem){

        const id = Number(selectedItem.dataset.id);

        // geht durch jedes Element im Array und verändert es ggf. (hier wenn id gleich der angeklickten ID was immer der Fall ist)
        // returned neues Array nachdem es durch jedes Element vom Array ist und function angewandt hat
        tasks = tasks.map(function(task){
            if (task.id === id){
                return{
                    ...task,
                    done: !task.done
                };
            }

            return task
        });
    }

        renderTasks();
});