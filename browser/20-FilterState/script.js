const taskList = document.getElementById("taskList");
const deleteButton = document.getElementById("deleteButton");

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
    });
};

deleteButton.addEventListener("click", function(){
    tasks = tasks.filter(function(task){
        return task.id !== 2;
    });

    renderTasks();
});