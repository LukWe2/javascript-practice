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


if (savedTasks !== null){
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

        if (task.done){
            newItem.classList.add("done");
        }
    });
}


renderTasks();


taskList.addEventListener("click", function(event){

    const selectedItem = event.target.closest("li");

    if (selectedItem){

        const id = Number(selectedItem.dataset.id);

        toggleTask(id);
        saveTasks();
        renderTasks();
    }


});


function toggleTask(id){
    tasks = tasks.map(function(task){
        if (task.id === id){
            return{
                ...task,
                done: !task.done
            }
        }

        return task;
    });
}


function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}