const findButton = document.getElementById("findButton");
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
        done: true
    },
    {
        id: 3,
        text: "TypeScript lernen",
        done: false
    }
];


findButton.addEventListener("click", function(){

    const foundElement = tasks.find(function(task){
        return task.id === 2;
    });

    if (foundElement){

        console.log(tasks.findIndex(function(task){
            return task.id === 2;
        }));

        output.textContent = "Gefundener Task: " + foundElement.text;

    } else {
        output.textContent = "Task nicht gefunden.";
    }
});