const list = document.querySelector("#taskList");
const paragraph = document.getElementById("output");

list.addEventListener("click", function(event){
    const task = event.target.closest(".task");

    if (task){
        paragraph.textContent = `Ausgewählte Task-ID: ${task.dataset.id}`;
    }
});



/* Kommentare:

1. .querySelector("#taskList") ist das selbe wie .getElementById("taskList")
Bei querySelector() wird ein CSS-Selektor verwendet, deshalb #taskList.
Bei getElementById() wird direkt die ID übergeben, deshalb nur "taskList".

2. list.addEventListener fügt dem ul-Element mit id "taskList" einen Listener hinzu 
Dieser wartet auf das angegebene Event, hier "click".
Sobald dieses Event auftritt oder durch Event Bubbling beim <ul> ankommt, 
wird die als zweites Argument übergebene Funktion ausgeführt.

3. event.target.closest(".task") startet beim tatsächlich angeklickten Element und prüft zuerst dieses Element selbst und danach seine Parent-Elemente nach oben.
Gesucht wird das erste Element mit der Klasse "task".
Das gefundene Element wird hier in der Variable task gespeichert.
Wenn direkt auf ein <li class="task"> geklickt wird, ist dieses <li> bereits der Treffer. 
Wenn innerhalb des <li> z. B. ein <span> angeklickt wird, startet die Suche beim <span> 
und findet danach das übergeordnete <li class="task">.

4. if (task) prüft ob ein solches HTML-Element mit der Klasse "task" nach oben gehend in der Hierarchie
ab dem tatsächlich geklickten Element existiert, sonst wäre task gleich null
Wenn ein Element gefunden wurde, enthält task eine Referenz auf dieses Element und die Bedingung ist true.
Wenn kein passendes Element gefunden wurde, ist task gleich null und die Bedingung ist false

5. task.dataset.id holt sich die data-id aus dem jeweiligen HTML-Element (in Javascript callt man es mit dataset.---)

6. paragraph.textContent greift auf den Textinhalt des <p>-Elements zu und ersetzt den Text


*/