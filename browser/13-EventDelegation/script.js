const list = document.getElementById("taskList");

list.addEventListener("click", function(event) {
    if (event.target.classList.contains("task")){
        event.target.classList.toggle("done");
    }
});