//alle tasks holen und event Listener hinzufügen (in 13-EventDelegation wird nur Liste geholt und mit Event Delegation gearbeitet dass durch Event Bubbling Event Listener nur auf dem ul-Listenelement sitzen kann
// aber man trotzdem die CSS-Klasse den li-Listenelementen zuweisen kann)

const items = document.querySelectorAll(".task");

items.forEach(function(task){

    task.addEventListener("click", function(event){
        event.target.classList.toggle("done");
    });

});




/*
Version vorher:


const items = document.querySelectorAll("task");

items.forEach(function(task){

    task.addEventListener("click", function(event){
        event.target.classList.toggle("done");
    });
    
});

Fehler:
- bei const items = document.querySelectorAll("task");
- in querySelectorAll() gibt man CSS Klasse mit . an also müsste (".task") sein
- ohne Punkt sucht man nach reinem HTML Tag wie p, aber task ist eine Klasse und kein Tag






*/