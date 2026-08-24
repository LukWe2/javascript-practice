const tasks = document.querySelectorAll(".task");

tasks.forEach(function(task){
    task.addEventListener("click", function(event){
        event.currentTarget.classList.toggle("done");
    });
});