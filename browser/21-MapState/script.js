const taskList = document.getElementById("taskList");
const doneButton = document.getElementById("doneButton");

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

renderTasks();


function renderTasks(){
    taskList.replaceChildren();

    tasks.forEach(function(task){
        const newItem = document.createElement("li");

        newItem.textContent = task.text;

        taskList.append(newItem);

        if (task.done){
        newItem.classList.add("done");
    }
    });
};



doneButton.addEventListener("click", function(){
    tasks = tasks.map(function(task) {
        if (task.id === 2) {
            return {
                ...task,
                done: true
            };
        }

        return task;
    });

    renderTasks();
});


