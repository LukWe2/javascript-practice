const tasks = [
    {
        id: 1,
        text: "JavaScript lernen",
        done: false
    },
    {
        id: 2,
        text: "React lernen",
        done: true
    }
];


const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");
const output = document.getElementById("output");


saveButton.addEventListener("click",function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
});


loadButton.addEventListener("click", function(){
    const tasksLoaded = localStorage.getItem("tasks");

    const tasksArray = JSON.parse(tasksLoaded);

    if (tasksArray){
        output.textContent = "Erster Task: " + tasksArray[0].text;
    }
});