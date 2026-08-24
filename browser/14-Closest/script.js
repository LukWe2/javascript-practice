const list = document.getElementById("taskList");

list.addEventListener("click", function(event){
    const task = event.target.closest(".task");

    if (task){
        task.classList.toggle("done");
    }
});



/*
Version vorher:

const list = document.getElementById("taskList");

list.addEventListener("click", function(event){
    if (event.target.closest(".task")){
        console.log(event.target);
        event.target.classList.toggle("done");
    }
});

Fehler:
- finde zwar das li-Element wie gewollt mit event.target.closest(".task")
aber benutze es danach nicht mehr
- also suche es, finde es, aber weise die CSS-Klasse mit event.target.classList.toggle("done")
trotzdem dem angeklickten span-Element hinzu was eben nicht Sinn war
- Sinn war, das nähste Element mit der task-Klasse zu finden und auf dieses die CSS-Klasse zuzuweisen
- ist hier das jeweilige li-Listenelement
- dafür muss man dieses nähste li-Element in einer Variablen speichern und dann die Klasse zuweisen

anders gesagt:
// Mit event.target.closest(".task") finde ich zwar wie gewollt das nächste Element mit der Klasse "task",
// benutze dieses gefundene Element danach aber nicht.
// Mit event.target.classList.toggle("done") wird die Klasse weiterhin dem tatsächlich angeklickten Element,
// hier also dem <span>, zugewiesen. Sinn von closest() ist hier, das zugehörige <li class="task"> zu finden 
// und diesem die Klasse zuzuweisen.

*/