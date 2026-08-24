const taskList = document.getElementById("taskList");
const output = document.getElementById("output");


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
    tasks.forEach(function(task){

        const newItem = document.createElement("li");

        newItem.textContent = task.text;

        newItem.dataset.id = task.id;

        taskList.append(newItem);
    });
};


taskList.addEventListener("click", function(event){
    const selectedTask = event.target.closest("li");


    if (selectedTask){
        const id = Number(selectedTask.dataset.id);

        const foundTask = tasks.find(function(task){
            return task.id == id;
        })

        output.textContent = "Ausgewählter Task: " + foundTask.text;
    }
});