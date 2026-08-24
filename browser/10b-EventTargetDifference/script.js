// In der forEach-Schleife ist die Variable task  immer das aktuelle <li>-Element
// Mit Aufruf task.classList... im ersten Code wird immer das gesamte <li> verändert
// Aufruf mit event.target ist dagegen genau das Element, auf das tatsächlich geklickt wurde, in diesem Fall das span-Element
// Klickt man also auf den <span>-Text, ist event.target also der <span> und nicht das <li>

/*
const tasks = document.querySelectorAll(".task");

tasks.forEach(function(task){
    task.addEventListener("click", function(){
        task.classList.toggle("done");
    });
});
*/





const tasks = document.querySelectorAll(".task");

tasks.forEach(function(task){
    task.addEventListener("click", function(event){
        event.target.classList.toggle("done");
    });
});

