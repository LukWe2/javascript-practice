const taskList = document.getElementById("taskList");

let defaultTasks = [
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


const savedTasks = localStorage.getItem("tasks");


let tasks;


if (savedTasks){
    tasks = JSON.parse(savedTasks);
} else {
    tasks = defaultTasks;
}


function renderTasks(){

    taskList.replaceChildren();

    tasks.forEach(function(task){

        const newItem = document.createElement("li");
        newItem.textContent = task.text;
        newItem.dataset.id = task.id;
        taskList.append(newItem);

        if (task.done === true){
            newItem.classList.add("done");
        }
    });
};


renderTasks();


taskList.addEventListener("click", function(event){
    
    const selectedItem = event.target.closest("li");

    if (selectedItem){

        const id = Number(selectedItem.dataset.id);

        tasks = tasks.map(function(task){
            if (task.id === id){
                return{
                    ...task,
                    done: !task.done
                }
            }

            return task;
        });
    };

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
});


// Fehler:
// 1. tasks = task.map(function(task){
// - muss .map() auf ganzem Array tasks anwenden, nicht nur auf aktuellem task
// 2. done: !done
// - done alleine existiert als Variable selbst nicht (nur im Kontext vom Objekt)
// - deswegen geht zwar "done: " aber nur "done" als Variable muss noch auf Objekt gecalled werden
// 3. const tasks = [
// - muss let statt const sein, da tasks später mit dem von .map() erzeugten neuen Array neu zugewiesen wird
//4. fehlendes taskList.replaceChildren() am Anfang von renderTasks()
// - 