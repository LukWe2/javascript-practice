const list = document.getElementById("taskList");
const addButton = document.getElementById("addButton");

let tasks = [
    {
        id: 1,
        text: "JavaScript lernen",
        done: false
    }
];

renderTasks();


function renderTasks(){
    list.textContent = "";

    tasks.forEach(function(task){
        const newTask = document.createElement("li");

        newTask.textContent = task.text;
        
        list.append(newTask);
    })
};


addButton.addEventListener("click", function(){
    const newTask = {
        id: 2,
        text: "React lernen",
        done: false
    };

    tasks.push(newTask);

    renderTasks();    
});