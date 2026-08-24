let tasks = [
    {
        id: 1,
        text: "JavaScript lernen",
        done: false
    }
];


const addButton = document.getElementById("addButton");
const output = document.getElementById("output");

addButton.addEventListener("click", function(){
    const newTask = {
        id: 2,
        text: "React lernen",
        done: false
    };

    tasks.push(newTask);
    
    output.textContent = "Anzahl Tasks: " + tasks.length;
    console.log(tasks);
});




