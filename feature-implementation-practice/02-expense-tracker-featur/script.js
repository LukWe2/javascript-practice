// ganzes Prinzip: haben Funktionen, die das State Array permanent verändern wie Hinzufügen, Löschen und Bearbeiten von Transaktionen und Funktionen die Filtern wie Sucheingabe, Dropdown für Typ und Dropdown für Kategorien
// diese müssen synchronisiert werden, also das Filtern des State Arrays und die Darstellung also das Rendern der zu den Filtern zutreffenden Listenelemente aus dem State Array
// die Funktionen die State Array verändern machen das und callen dann die render-Funktion
// die Filter wiederum callen direkt die render-Funktion, denn innerhalb der render-Funktion wird in dieser Version gefiltert (geht auch anders siehe andere Versionen) und es werden immer nach allen drei Filtern gleichzeitig gefiltert,
// somit sind alle immer synchronisiert und es funktioniert auch während Funktionen ausgeführt werden, die das State Array verändern wenn die render-Funktion danach aufgerufen wird nach der Änderung
// denn dann wird immer neu gefiltert mit dem neuen State
// -> State Array muss immer mit allen drei Filtern gefiltert werden, nach jeder Änderung des States und nach jeder Filteränderung und dann neu gerendert werden, sodass UI und State, also Änderungen und Filerungen innerhalb des States funktionieren und synchron mit Darstellung sind
// nach Änderungen im State muss also neu gefiltert werden, mit dem neuen State und allen Filtern, dann ist State und UI synchron
// Synchronität ist weg, wenn nach Sucheingabe oder Dropdown-Filter einzeln gefiltert wird und nicht alles zusammen (war Fehler in erster Aufgabe am Anfang, in Listenern wurde gefiltert einzeln und dann d)

// wichtiges Konzept: dataset.id bzw. dadurch hinzugefügtes data-id Attribut in HTML
// machen in render-Funktion transactionElement.dataset.id = transaction.id;, weil wir zwischen den Objekten im State Array und den in der Liste gerenderten Listenelementen noch keine Verbindung haben
// dadurch können wir beim Bearbeiten und Löschen von Transaktionen (beim Hinzufügen packen wir ja nur eine weitere Transaktion in das State Array, da brauchen wir keine Zuordnung) das Listenelement
// mit dem zugehörigen Objekt im State Array zurodnen
// weil was machen wir in render-Funktion? Eigentlich nur durch das State Array gehen und die Objekte in Listenelemente umwandeln also in eine Darstellung, aber ohne Verbindung oder Weg eben
// das Listenelement mit dem Objekt im State Array zuzuordnen, müssen aber beim Bearbeiten und Löschen das haben, weil wollen ja das Objekt das wir in der Darstellung anklicken ändern,
// da wir ja nicht die Listenelemente verändern und löschen, sondern die Objekte aus dem State Array und dann neurendern! Wenn wir nur Listenelemente hätten und bearbeiten würden, bräuchten
// wir die Verbindung nicht aber da wir die Darstellung ja über den State steuern (Darstellung soll immer den State rendern), brauchen wir die Zuordnung
// dafür weisen wir einfach jedem HTML Listenelement das wir in der render-Funktion erzeugen mit transactionElement.dataset.id = transaction.id der jeweiligen ID aus dem State Array zu
// wenn wir jetzt im HTML ein Listenelement klicken, hat dieses eine ID, und zwar die gleiche wie das zugehörige Objekt im State Array, dann können wir das zugehörige Bearbeiten
// ohne das data-id Attribut das mit x.dataset.id = ... automatisch erstellt wird, klicken wir z.B. den Löschen Button des HTML-Listenelements mit dem Titel "Gehalt Nebenjob" und es existiert
// zwar ein Objekt im State Array mit demselben Titel die konzeptionell zusammengeehören, aber diese haben keine Verbindung zueinander, wenn wir aber die data-id mitgeben hat sie eine
// könnten theoretisch auch bei einem Klick den Titel oder andere Property holen und durch das State Array gehen und vergleichen bis Objekt gefunden wurde und so das Objekt zuweisen, aber mit ID ist eleganter
// ACHTUNG: dataset.id liefert IMMER einen String, also wenn man mit einer ID vom Typ number z.B. aus dem State Array vergleicht wie in dieser Aufgabe, muss der String aus dataset.id erst mit Number(...) in eine number umgewandelt werden

// Weitere Erkenntnis aus dieser Aufgabe: haben Listener transactionList, in dem registriert wird wenn auf Bearbeiten Button geklickt wird, aber dadurch dass dies nur eine Form öffnet und nicht direkt das Objekt im State Array ändert, muss hier erst die ID gespeichert werden
// und in einem weiteren anderen Listener editTransactionForm auf der tatsächlichen Form zum Bearbeiten diese verwendet werden die ID die vorher in dem anderen Listener festgelegt wurde
// Ist so, weil das editTransactionForm ein "submit"-Event hat, und dieses mit const clickedLi = event.target.closest("li"); nicht das Listenelement liefert wenn man auf den Button klickt, sondern die Form an sich weil die Form zum Bearbeiten ja nicht über der Liste liegt, 
// deswegen brauchten noch anderen Listener der erstmal die ID des Listenelements holt und die dann für die seperaten Listener zum tatsächlichen Bearbeiten und Löschen verwendet wird
// also nicht wie in letzter Aufgabe: Form für Änderungen ist schon angezeigt und drücken des Bearbeiten Buttons liefert direkt das Objekt im State Array durch ID, sondern Bearbeiten Button öffnet erst Form, muss beim Klicken des Bearbeiten Buttons die ID wie sonst auch speichern,
// und benutzt diese ID dann in anderem Listener für das eigentliche Bearbeiten das dann auch das Objekt im State Array ändert, was vorher direkt auf dem Bearbeiten Button war, jetzt auf dem initial "Ändernungen speichern" Button der in der initial verborgenene Form ist

const transactionList = document.getElementById("transactionList");

const addTransactionForm = document.getElementById("addTransactionForm");
const addTransactionTitleInput = document.getElementById("titleInput");
const addTransactionAmountInput = document.getElementById("amountInput");
const addTransactionTypeDropdown = document.getElementById("typeInput");
const addTransactionCategoryDropdown = document.getElementById("categoryInput");

const editSection = document.getElementById("editSection");
const editTitleInput = document.getElementById("editTitleInput");
const editAmountInput = document.getElementById("editAmountInput");
const editTypeInput = document.getElementById("editTypeInput");
const editCategoryInput = document.getElementById("editCategoryInput");

const editTransactionForm = document.getElementById("editTransactionForm");

const cancelEditButton = document.getElementById("cancelEditButton");

const searchInput = document.getElementById("searchInput");

const typeFilter = document.getElementById("typeFilter");

const categoryFilter = document.getElementById("categoryFilter");

const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses");
const totalBlance = document.getElementById("balance");

const transactionSummary = document.getElementById("transactionSummary");

const emptyMessage = document.getElementById("emptyMessage");


const initialTransactions = [
    {
        id: 201,
        title: "Gehalt Nebenjob",
        amount: 680,
        type: "income",
        category: "Arbeit"
    },
    {
        id: 202,
        title: "Supermarkt",
        amount: 48.50,
        type: "expense",
        category: "Lebensmittel"
    },
    {
        id: 203,
        title: "Miete",
        amount: 390,
        type: "expense",
        category: "Wohnen"
    },
    {
        id: 204,
        title: "Kino",
        amount: 14.90,
        type: "expense",
        category: "Freizeit"
    },
    {
        id: 205,
        title: "Rückerstattung",
        amount: 25,
        type: "income",
        category: "Sonstiges"
    },
    {
        id: 206,
        title: "Café",
        amount: 6.50,
        type: "expense",
        category: "Lebensmittel"
    }
];

// erst initial gespeicherten Stand aus localStorage holen, falls existiert
const transactionStorage = localStorage.getItem("transactions");

// Brauchen das JSON.parse(), weil localStorage Daten mit JSON.stringify(transactions) in saveArticles() als Text speichert, man zum Arbeiten aber wieder ein Array mit Objekten braucht
// JSON.parse() übersetzt das JSON in JavaScript Objekte
// Beim ersten Öffnen wird also mit den Daten aus dem initialTransactions Array gearbeitet, sonst wenn existiert eben mit Stand in localStorage
let transactions = transactionStorage === null ? [...initialTransactions] : JSON.parse(transactionStorage);


// brauchen eigentlich nur diese Funktion, die initial die articles als State einmal speichert und können wenn wir den State verändern (wie beim Hinzufügen, Löschen oder Umschalten des Status, aber nicht beim Suchen oder Filtern
// weil wir da ja nicht das State Array verändern und keine Veränderung sein soll die permanent gespeichert sein soll), diese Methode wieder aufrufen um den veränderten State zu aktualisieren im localStorage
function saveTransactions() {

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// hier wieder render-Methode mit der wir für jedes Objekt im State ein Listenelement rendern
function renderTransactions() {

    // holen uns hier die Werte des Suchfeldes und der Dropdowns
    const searchInputTextField = searchInput.value.toLowerCase();

    const typeDropdownInput = typeFilter.value;

    const categoryDropdownInput = categoryFilter.value;

    const filteredStateArray = transactions.filter((transaction) => {

        const matchesTitle = transaction.title.toLowerCase().includes(searchInputTextField);

        // im State Array sind ja alle Objete einem Type und Category zugeordnet, aber die Dropdowns in der UI stehen auf "all" als Value deswegen wäre das immer false:
        // weil im State ist z.B. type auf "expense" und hier vergleicht man const matchesType = "expense" === "all" -> false
        /*const matchesType = transaction.type === typeDropdownInput;

        const matchesCategory = transaction.category === categoryDropdownInput;
        */

        const matchesType = typeDropdownInput === "all" || transaction.type === typeDropdownInput;

        const matchesCategory = categoryDropdownInput === "all" || transaction.category === categoryDropdownInput;

        return matchesTitle && matchesType && matchesCategory;
    });

    clearEmptyMessage();

    if (filteredStateArray.length === 0){

        displayEmptyMessage();
    }

    transactionList.replaceChildren();

    filteredStateArray.forEach((transaction) => {

        const transactionElement = document.createElement("li");
        transactionElement.textContent = transaction.title;
        transactionList.appendChild(transactionElement);

        // machen das, damit wir die gerenderten Listenelemente also der im HTML bzw. DOM zu den Objekten im State zuordnen können,
        // sonst können wir beim Bearbeiten z.B. nicht zuordnen beim Klicken des "Bearbeiten"-Buttons, für welches Objekt im State
        // die Änderung gemacht werden soll, da wir Buttons dynamisch für alle Elemente erstellen und rein damit keine Verbindung
        // zwischen dem Listen-Element im HTML und dem Objekt im State haben
        // -> siehe: Konzept 15: data-* Attribute und dataset
        // kann mit dataset HTML-Elemente eigene zusätzliche Informationen geben, wie auch data-id, was eine zusätzliche Information für JavaScript ist und
        // sozusagen vorgegeben ist, durch .dataset.id = ... kann man dieses Attribut data-id="..." jeweils zuweisen
        // muss oben direkt in der render-Funktion passieren
        transactionElement.dataset.id = transaction.id;

        const transactionElementCategory = document.createElement("p");
        transactionElementCategory.textContent = transaction.category;
        transactionElement.appendChild(transactionElementCategory);

        const transactionAmount = document.createElement("p");
        const transactionAmountNumber = transaction.amount.toFixed(2);
        transactionAmount.textContent = transaction.type === "income" ? `+${transactionAmountNumber}€`: `-${transactionAmountNumber}€`;
        transactionElement.appendChild(transactionAmount);

        const editButton = document.createElement("button");
        editButton.textContent = "Bearbeiten";
        transactionElement.appendChild(editButton);
        // damit Klick auf editButton erkannt werden kann (fürs Öffnen des Bearbeiten Forms), müssen wir es identifizeren und fügen deshalb eine CSS-Klasse hinzu
        editButton.classList.add("editButtonClass");


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        transactionElement.appendChild(deleteButton);
        // damit Klick auf editButton erkannt werden kann (fürs Öffnen des Bearbeiten Forms), müssen wir es identifizeren und fügen deshalb eine CSS-Klasse hinzu
        deleteButton.classList.add("deleteButtonClass");

    })

    // hatte das vorher ausversehen in der forEach() Schleife, dann wurde nachdem die Ergebnisse 0 waren nicht "0 von X Ergebnissen angezeigt" sondern der letzte Stand also z.B. "4 von 6 Ergebnissen angezeigt"
    // weil: forEach() wird für jedes Element einmal durchgeführt, wenn filteredStateArray aber leer ist, wird der Body von forEach() nicht ausgeführt und somit auch nicht das letzte Mal
    // wenn filteredStateArray leer ist und Anzahl somit 0 wäre, also die letzte Ausführung wäre dann der letzte Stand des gefilterten Arrays was zum Verhalten passt
    // außerhalb der forEach() ist richtig, dann wird es für das filteredStateArray auch bei einem leeren Zustand ausgeführt bei dem length 0 ist und somit auch der Text
    getAndDisplayAmountCurrentlyDisplayedTransaction(filteredStateArray);

    // genau das gleihe gilt für calculateBalanceAndUpdateUIFieldsForIt(), war vorher auch fälschlicherweise in der forEach()
    // Das Problem auch hier: dass die Finanzübersicht nur aktualisiert wird, wenn filteredStateArray mindestens einen Eintrag enthält, sonst alter Stand wie bei getAndDisplayAmountCurrentlyDisplayedTransaction() 
    calculateBalanceAndUpdateUIFieldsForIt();
};

renderTransactions();

// nicht meehr hardcoeded 207, weil wenn wir Transaktion 207 schon erstellt haben und in localStorage gespeichert ist, im Code aber ab ID 207 weiter gemacht wird wieder, kann dieses Objekt überschrieben werden weil es ja in localStorage schon existiert aber wieder ab ID 207 beginnt
// berechnet die nächste freie ID anhand der höchsten aktuell vorhandenen Transaktions-ID, dabei ist die neue ID mindestens 207
// map() sammelt alle IDs aus transactions in einem neuen Array wie [201, 205, 210]
// Der Spread ... übergibt die Elemente als einzelne Argumente, da Math.max() einzelne Zahlen erwartet wie Math.max(201, 205, 210); // 210, ohne den Spread wäre es aber: Math.max(206, [201, 205, 210]); // NaN
// Durch den Spread wird der Aufruf also zu: Math.max(206, 201, 205, 210);
// Das + 1 sorgt dafür, dass der Startwert bereits über der höchsten vorhandenen ID liegt, denn wenn man die Seite lädt, ist die höchste ID die gerade in localStorage im transactions
// Array liegt schon vergeben (z.B. 211), man zählt hier direkt +1 hoch (z.B. 212), diese 212 wird dann vergeben und danach wird  newTransactionId++ gemacht was dann 213 wäre,
// diese Zeile hier wird aber nicht jedes Mal beim Durchgehen des Codes aufgerufen, sondern NUR beim Laden der Seite, kann zweimal den Hinzufügen Code durchlaufen und diese
// Zeile wird nicht ausgeführt weil sie nur beim Laden/Neuladen der Seite ausgeführt wird
// Die 206 dient als Untergrenze, auch wenn alle Transaktionen gelöscht wurden
let newTransactionId = Math.max(206, ...transactions.map((transaction) => transaction.id)) + 1;


addTransactionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // form kann nur über Button abgeschickt werden und über kein andderes Element unter dem form-Element im HTML
    // also brauche hier keine Unterscheidung ob event.target der Button ist

    const newTransactionTitle = addTransactionTitleInput.value.trim();
    const amountValue = addTransactionAmountInput.value
    const newTransactionAmount = Number(amountValue);

    // Number.isFinite(newTransactionAmount) prüft ob Zahl eine gültige, endliche Zahl ist, gibt boolean zurück,
    // true bei endlichen Zahlen positiv und negativ, false bei NaN, Infinity, -Infinity, "50" also Strings und null
    // checken es hier weil über .value erhalten wir einen String, den wir mit Number() in eine Zahl umwandeln,
    // bei ungültigen Werten von Number(...) wie Number("abc"); kann allerdings NaN entstehen, was aber noch nicht gecheckt wird vorher
    if (newTransactionTitle === "" || newTransactionAmount <= 0 || amountValue.trim() === "" || !Number.isFinite(newTransactionAmount)){

        return;
    }

    const newTransactionType = addTransactionTypeDropdown.value;
    const newTransactionCategory = addTransactionCategoryDropdown.value;



    const newTransaction = {

        id: newTransactionId,
        title: newTransactionTitle,
        // Der Wert aus einem Eingabefeld ist immer ein String (Text) – auch wenn das HTML Element für den input type="number" ist
        // toFixed() erwartet aber eine Zahl also vom Typ number, wäre dann aebr "48.50".toFixed(2) was nicht geht
        // beim Code Number(transaction.amount.toFixed(2)) wird zuerst das innere ausgeführt also JavaScript versucht transaction.amount.toFixed(2)
        // was nicht funktioniert und erst danach würde Number(...) das Ergebnis in eine Zahl umwandeln aber das wird nicht ausgeführt weil das innere failed
        // deswegen direkt hier zu einer Zahl machen, dass hier: transaction.amount.toFixed(2) das amount schon eine Zahl ist
        amount: newTransactionAmount,
        type: newTransactionType,
        category: newTransactionCategory
    };

    transactions.push(newTransaction);

    newTransactionId++;

    resetNewTransactionForm();

    renderTransactions();

    // Nach Bearbeitung hier (Hinzufügen von Transaktionen) verändern wir den State Array permanent und speichern das im localStorage dann ab also das neue transactions Array
    saveTransactions()
});


function resetNewTransactionForm(){

    addTransactionTitleInput.value = "";
    addTransactionAmountInput.value = "";
    addTransactionTypeDropdown.value = "expense";
    addTransactionCategoryDropdown.value = "Arbeit";
}


// brauchen diese globale Variable für die ID des Listenelements, weil im Listener für das Edit Form wir diese auch benötigen,
// aber innerhalb der Form wird diese nicht bekommen können, weil die Form außerhalb der Liste sitzt (<form id="editTransactionForm"> ist nicht über
// <ul id="transactionList"></ul>) und man kann somit durch Event Bubbling nicht die Liste und somit das Listenelement mit der ID erreichen
let editingTransactionId = null;


// Fürs Öffnen des Bearbeiten Forms klicken wir ja innerhalb eines Listenelements auf den "Bearbeiten"-Button, somit können wir der Liste einen Listener
// hinzufügen und über event.target erkennen ob der dynamisch erzeugte Button (können ihn nicht einfach holen mit id weil dieser eben dynamisch in 
// renderTransactions() erstellt wird), geklickt wurde, da wir in renderTransaction() diesem auch eine CSS-Klasse hinzugefügt haben
// -> Identifizieren ob dynamisch erzeugter Button geklickt wurde: Durch Event Bubbling und event.target im form-Element und mit einer CSS-Klasse am Button

transactionList.addEventListener("click", function(event) {

    const clickedElement = event.target;

    // console.log(clickedElement); -> passt, gibt <button class="editButtonClass">Bearbeiten</button> aus

    // Form anzeigen, die gerade <section id="editSection" hidden> ist, wie macht man das?
    // -> ist ja ein Attribut also einfach mit .hidden = false
    // passt, Form erscheint
    // Problem: können noch nicht gerenderte transactions bzw. im HTML DOM zu den Objekten im State zuordnen,
    // müssen dafür den li-Elementen die ID aus dem State mitgeben
    // -> siehe: Konzept 15: data-* Attribute und dataset
    // kann mit dataset HTML-Elemente eigene zusätzliche Informationen geben, wie auch data-id, was eine zusätzliche Information für JavaScript ist und
    // sozusagen vorgegeben ist, durch .dataset.id = ... kann man dieses Attribut data-id="..." jeweils zuweisen
    // muss oben direkt in der render-Funktion passieren
 

    // wenn es der Bearbeiten Button ist der gedrückt wurde (identifiziert durch CSS-Klasse die wir manuell in render-Methode hinzugefügt haben)
    if (clickedElement.classList.contains("editButtonClass")) {

        // hier blenden wir nur die Form zum Bearbeiten ein und speichern die ID des Listenelements in der globalen Variable editingTransactionId,
        // außerdem setzen wir noch die Werte die gerade für diese Transaktion im State Array als Properties hat in die Felder ein,
        // aber erst im Listener für die editTransactionForm holen wir das was dann drin steht und verändern das jeweilige Objekt im State Array

        editSection.hidden = false;

        // jetzt da jedes Li-Element im HTML eine id hat, die mit den ids für die Objekte im State Array verbunden sind,
        // können wir jetzt zuordnen, welches Objekt im State wir verändern wollen

        // brauchen aber noch das li-Element zu dem der Button gehört, event.target ist der Button selbst, auf dem liegt aber nicht die 
        // id und bringt uns für die Zuordnung nichts
        // -> mit .closest() holen wir uns das nächstgelegene li-Element während des Event Bubblings vom Button+

        const clickedLi = clickedElement.closest("li");

        if (!clickedLi) {
            return;
        }

        // Achtung: clickedLi.dataset.id liefert einen String als HTML Attribut, transaction.id ist aber ja eine Zahl weil die Property im Array number ist!
        // liefert natürlich immer false wenn eine number mit string verglichen wird mit ===, das auch den Typen prüft
        editingTransactionId = Number(clickedLi.dataset.id); 

        // suchen hier über die data-id des HTML Elements und die ID der Transaktion im State Array die Transaktion, von der der Bearbeiten Button geklickt wurde, damit wir 
        // die Default Werte im Bearbeiten Formular mit den Original Daten füllen können
        // durch clickedLi haben wir das Listen-Element das zum Bearbeiten Button gehört im HTML, vergleichen dessen data-id Attribut das wir oben zuteilen jeweils und ordnen so Objekt aus State Array zu
        const clickedTransaction = transactions.find((transaction) => {

            // Achtung: clickedLi.dataset.id liefert einen String als HTML Attribut, transaction.id ist aber ja eine Zahl weil die Property im Array number ist!
            return editingTransactionId === transaction.id; 
        });

        console.log(clickedTransaction);

        // setzen die Eingabefelder auf die Werte die Transaktion im State Array als Properties hat
        editTitleInput.value = clickedTransaction.title;
        editAmountInput.value = clickedTransaction.amount;
        editTypeInput.value = clickedTransaction.type;
        editCategoryInput.value = clickedTransaction.category;

        // hier speichern wir nicht in localStorage weil wir hier ja nur das angeklickte Listenelement suchen/finden und die aktuellen Werte der Transaktion in die Felder einfügen
    }


    // wenn es der Löschen Button ist der gedrückt wurde (identifiziert durch CSS-Klasse die wir manuell in render-Methode hinzugefügt haben)
    if (clickedElement.classList.contains("deleteButtonClass")){

        const clickedLi = clickedElement.closest("li");

        if (!clickedLi) {
            return;
        }

        // hier nicht die globale ID befüllen mit dem geklicketen Listenelement durch dessen Löschen Button, sonst könnte es während man eine Transaktion bearbeitet in der editTransactionForm und dann
        // ein Element löscht dazu kommen, dass es nach der ID des währenddessen gelöschten Elements sucht, weil wir ja somit die ID der gerade gelöschten Transaktion speichern, und wenn wir die Änderungen
        // vom Bearbeiten speichern, benutzen wir die ID die gerade in editingTransactionId steht, und das wäre nicht die die gerade bearbeitet wird, sondern die die gerade gelöscht wurde weil wir sie so überschreiben!
        const clickedButtonCorrespondingTransactionID = Number(clickedLi.dataset.id);

        // wenn man die Transaktion löscht die man gerade bearbeitet, sollte sich das Bearbeiten Form schließen und die ID der Transaktion die man gerade bearbeitet zurücksetzen,
        // weil diese ja gelöscht wird und dann nicht mehr existiert und Fenster sollte weggehen weil man diese Transaktion ja nicht mehr bearbeiten kann
        if (clickedButtonCorrespondingTransactionID === editingTransactionId){

            editSection.hidden = true;
            editingTransactionId = null;
        }

        transactions = transactions.filter((transaction) => {

            return clickedButtonCorrespondingTransactionID !== transaction.id;
        });


        // hier können wir direkt rendern, weil wir nicht wie beim Bearbeiten Button noch eine Form dahinter haben, die nochmal Buttons und Zustände hat
        // also fürs Löschen verändern wir ja direkt das State Array, beim Bearbeiten haben wir ja die editTransactionForm die nochmal einen Listener braucht
        renderTransactions();

        // Nach Bearbeitung hier (Löschen von Transaktionen) verändern wir den State Array permanent und speichern das im localStorage dann ab also das neue transactions Array
        saveTransactions()
    }
})



// Listener wiederum auf der Form des Bearbeitens weil wir hier noch zwei Buttons haben, Änderungen speichern und Abbrechen
// und wir den Klick abfangen müssen und prüfen müssen welcher Button es war, nur der Abbrechen Button hat aber eine id
editTransactionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const editedTitle = editTitleInput.value.trim();
    // packen hier amountValue seperat in eine Variable, damit wir den String nochmal prüfen können ob dieser keine Leerzeichen enthält, weil bei Eingabefeld x.value immer vom
    // Typ String ist, auch wenn es type=number hat als Attribut
    const amountValue = editAmountInput.value;
    const editedAmount = Number(amountValue);
    const editedType = editTypeInput.value;
    const editedCategory = editCategoryInput.value;

    if (editedTitle === "" || amountValue.trim() === "" || !Number.isFinite(editedAmount) || editedAmount <= 0) {

        return;
    }

    transactions = transactions.map((transaction) => {

        // Achtung: clickedLi.dataset.id liefert einen String als HTML Attribut, transaction.id ist aber ja eine Zahl weil die Property im Array number ist!
        // liefert natürlich immer false wenn eine number mit string verglichen wird mit ===, das auch den Typen prüft
        // deswegen machen wir in transactionList Listener, wo wir die ID der globalen Variable editingTransactionId zuweisen, auch die Umwandlung mit Number(...)
        if (editingTransactionId === transaction.id){

            return {
                // in diesem ...transaction steckt eigentlich nur die id noch, weil wir sonst alles ändern also hätten auch
                // noch id: transaction.id machen können
                ...transaction,
                title: editedTitle,
                amount: editedAmount,
                type: editedType,
                category: editedCategory
            }
        }

        // wenn nicht die id passt vom am nähest liegenden li-Element zum geklickten Button, dann ist es der Bearbeiten Button
        // eines anderen Listeneintrags den wir eben nicht bearbeiten wollen
        // -> mit event.target holen wir uns den Button der geklickt wurde, könnte ja jeder in Liste sein, und prüfen noch zu welchem Objekt im State
        // Array es gehört, indem wir über das Listenelement, dem wir die ids zu den jeweiligen Objekten im Array als HTML Attribut gespeichert haben
        // das Objekt holen 

        // wenn nicht passt, einfach das originale Objekt im State Array zurückgeben, .map() geht durch alle und macht was im Callback
        // definiert ist, hier für wenn id passt die Änderung, wenn nicht einfach das originale Objekt in neues Array (das aber wieder direkt in
        // transactions gespeichert wurde)
        return transaction;
    });

    renderTransactions();

    // Nach Bearbeitung hier (Bearbeiten von Transaktionen) verändern wir den State Array permanent und speichern das im localStorage dann ab also das neue transactions Array
    saveTransactions()

    editSection.hidden = true;
    editingTransactionId = null;
});


cancelEditButton.addEventListener("click", function() {

    editSection.hidden = true;
    editingTransactionId = null;
});



// Aufgabe E: Suche und kombinierte Filter

// jetzt Aufgabe E: Suche und kombinierte Filter
// wollen erreichen dass wir Begriffe für die Titel eingeben und diese gefiltert werden und nur Transaktionen angezeigt werden mehr, die dazu passen unabhängig von Groß- und Kleinschreibung
// Außerdem sollen die Filter für Typen und Kategorien greifen,
// heißt wir müssen diese drei Filter kombinieren, wenn man switcht bei den Dropdowns oder den Suchbegriff ändern während man andere Filter gesetzt hat, soll sich die Liste auch korrekt aktualisieren
// Außerdem sollen auch die anderen Aktionen wie Hinzufügen, Bearbeiten und Löschen durchgeführt und dann die Liste richtig aktualisiert werden, wenn eine dieser Aktionen während einer aktiven Filterung stattfindet
// Lösung: einfach "immer" die gefilterte Liste für alle Filter anzeigen, also garnicht mehr die komplette Liste von Arrays anzeigen, sondern immer die gefilterte und wenn nichts in Filter ausgewählt ist,
// dann einfach die ganze aber gesteuert durch die Filter
// am Ende ist Filterung ein Durchgehen durch das Array von Transaktionen und eben nach Bedingungen filtern, wichtig ist dass Rendering synchronisiert ist mit Änderungen und gleichzeitigen Aktionen, was in letzter
// Aufgabe durch ein Rendern der Liste durch immer die gleichen Kriterien passiert ist, und zwar mit allen Filtern angewandt, auch nach eben Veränderungen wie hinzufügen, bearbeiten und löschen wird
// eine neue komplette Filterung mit allen Fitlern also Sucheingabe, Typ-Dropdown und Alle Kategorien getriggered und die mit allen Aspekten gefilterte Liste/Array ein neues Rendering getriggered
// -> also Lösung letzte Aufgabe war, immer die selbe, komplette Filterung des Arrays durchzuführen, nach jeder Aktion die möglich ist: Hinzufügen, Bearbeiten, Löschen, Filtern nach Sucheeingabe, Filtern nach Typ-Dropdown,
// FIlterung nach Kategorien-Dropdown
// -> Fehler letztes Mal: Fehler war einfach nur, dass ich nicht immer nach allen Kriterien gefiltert habe und deswegen nur teil- oder garnicht gefilterte Array angezeigt habe, was dann auch nicht mit der Synchronisation gestimmt hat
// und statt dann 10 individuelle Fälle abzudecken manuell, einfach die KOMPLETTE (mit allen Filtern) Filterung und Rendering zentralisieren in eine Methode, und immer die gleiche Methode und Filterung und dann Rendering aufrufen, statt 10 seperate

// !!!!!!!!!!! Ziel ist also, bei den Funktionen, die das State Array permanent ändern wie Hinzufügen, Bearbeiten und Löschen dass diese eben das machen, und dass vor dem Rendering nach der Suche und den Filtern nach Typ und Filtern nach Category durchgeführt wird
// haben Funktionen in Projekt die das State Array permanent verändern wie Bearbeiten oder Löschen, hier sollen die Objekt im Array tatsächlich verändert werden, aber auch Funktionen wie das Suchen, Filtern nach
// Typ und Filtern nach Kategorie, was nur Filtern soll und nicht das State Array verändern soll
// müssen deswegen die render-Funktion ändern, dass diese nicht nur die transactions Liste/Array einfach rendert, sondern ein Array rendert, das immer gefiltert ist mit der Sucheingabe und den Angaben aus den beiden Dropdowns
// wenn nichts eingegeben ist, ist input = "" was mit .includes() immer inkludiert wird also immer true ist, das passt also für die Titelfilterung
// und die Dropdowns Werte können ja ebenfalls geholt werden aus dem HTML und mit den Typen und Kategorie Wert aus dem State Array verglichen werden




// Szenarien könnten sein: User gibt Suchbegriff ein, dann wird gefiltert, nach dieser Filterung wählt er Dropdown für Typ aus, dann muss einfach gleiche Methode aufgerufen werden aber mit der zweiten Filterung auch, genauso wenn die dritte noch dazukommt
// wichtig: nach jeder weiteren Auswahl einer Filterung in der UI muss eben auch eine Filterung des State Arrays erfolgen und neu rendern, damit synchron ist
// wenn nichts ausgewählt ist in Filtern, muss einfach dieser Filter ignoriert werden (dafür gibt es Methoden wie ...), also man filtert in der Implementation trotzdem, aber so, dass bei keiner Auswahl
// einfach alle Transaktionen für diese Kategorie angezeigt werden

// brauchen als erstes Listener auf Suchtextfeld, weil bei jedem Eintippen gefiltert werden soll, deswegen auch das "input" Event was nach jedem Tastenschlag die Callback-Funktion durchführt
// können hier aber einfach nur die render-Funktion übergeben, weil in dieser das transactions Array nach den Eingaben gefiltert wird
// und übergeben eben nur renderTransactions und nicht renderTransaction(), weil die Methode sonst direkt beim Call einmal aufgerufen wird und dann nochmal ausgeführt wird
searchInput.addEventListener("input", renderTransactions);


// genauso hier bei den Dropdowns, der Input dieser also was man auswählt wird in der render-Funktion geholt und gefiltert (oder in updateView() Methode wie in erster Version der Aufgabe)
// hier jetzt aber "change" Event weil bei Dropdowns mit options bei Änerung das den geänderten Wert gibt wenn er sich denn ändert
typeFilter.addEventListener("change", renderTransactions);


categoryFilter.addEventListener("change", renderTransactions);



// Aufgabe F: Finanzübersicht

// müssen Logik in Funktion packen, weil wenn z.B. eine Transaktion von Einnahmen auf Ausgabe geändert wird, müssen die Werte angepasst werden für Einnahmen, Ausgaben und Kontostand
// muss also diese Funktion die diese drei Werte berechnet immer dort aufrufen, wo am besten gesammelt für alle Änderungen auch aufgerufen wird und das ist am besten die render-Funktion
// könnte auch einzeln in den Listenern oder Funktionen zum Löschen z.B. aber am einfachsten einfach einmal beim Rendern neu berechnen

function calculateBalanceAndUpdateUIFieldsForIt() {
    // Werte sollten am Anfang 0 sein und eben nicht der letzte Stand weil wir immer neu berechnen komplett mit dem State Array und die Werte nicht updaten sondern eben komplett neu berechnen
    let incomes = 0;

    let expenses = 0;

    // transactions ist das Array, was den State enhält und in der die permanent verändernden Funktionen zum Hinzufügen, Bearbeiten und Löschen ihre Änderungen machen, deshalb ist dieses das richtige für die Einnahmen, Ausgaben und Kontostand
    // da diese eben nicht das Array ist was bei einer Filterung angezeigt wird, sondern das was gefiltert wird

    transactions.forEach((transaction) => {

        if (transaction.type === "income"){

            incomes += transaction.amount;
        } else if (transaction.type === "expense"){

            expenses += transaction.amount;
        }
    });

    const balance = incomes - expenses;

    totalIncome.textContent = `${incomes.toFixed(2)} €`;
    totalExpenses.textContent = `${expenses.toFixed(2)} €`;
    totalBlance.textContent = `${balance.toFixed(2)} €`;
}

// das Anzeigen von wie viele Transaktionen nach einem Filter angezeigt werden muss im Gegensatz zu calculateBalanceAndUpdateUIFieldsForIt() nicht auf das transactions Array,
// sondern auf das gefilterte transactions Array was in der render-Funktion erstellt wird angewandt werden, deswegen übergeben wir hier wieder ein Array statt einfach das transactions Array aufzurufen
// die Funktion wird eben in der render-Methode aufgerufen weil dort das gefilterte Array erstellt wird aus dem die erste Zahl kommen muss
function getAndDisplayAmountCurrentlyDisplayedTransaction(transactionArray){

    const totalTransactions = transactions.length;

    const currentlyDisplayedTransactions = transactionArray.length;

    transactionSummary.textContent = `${currentlyDisplayedTransactions} von ${totalTransactions} Buchungen angezeigt`;
}


function displayEmptyMessage(){

    emptyMessage.textContent = "Keine passenden Buchungen gefunden.";
}

function clearEmptyMessage(){

    emptyMessage.textContent = "";
}



// Aufgabe H: Speicherung von State in localStorage

// wollen ja den aktuellen Stand der Transaktionen in localStorage speichern, sodass dieser Stand nach dem refreshen so wie vorher ist
// dafür holen wir uns ganz am Anfang aus localStorage die Speicherung, die da wäre wenn wir sie schon erstellt hätten: const transactionStorage = localStorage.getItem("transactions");

// dann prüfen wir einmal, ob diese Speicherung in localStorage schon existiert: let transactions = transactionStorage === null ? [...initialTransactions] : JSON.parse(transactionStorage);
// wenn nicht, legen wir das Array erst an, was wir dann speichern, wenn doch holen wir uns das Array was in localStorage als JSON liegt und wandeln es mit JSON.parse() in JavaScript Array um

// dann legen wir einfach nur eine Funktion an, die jeweils den Stand im localStorage mit dem neuen Stand überschreibt und rufen diese immer auf, wenn wir das State Array permanent ändern,
// wie beim Hinzufügen, Bearbeiten und Löschen von Transaktionen: 
/*
    function saveTransactions() {

        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
*/
// hier setzten wir initial das Item in localStorage (machen wir auch einfach wenn es schon existiert) und wandeln das State Array in JSON/Text um mit JSON.stringify(transactions),
// weil localStorage die Daten als JSON abspeichert

// also:
// JavaScript Daten in JSON umwandeln -> JSON.stringify(data) !!!!!!!!!!!!!!
// JSON in JavaScript umwandeln -> JSON.parse(dataStorage);

// vorher noch: Daten als JSON aus localStorage holen: const dataStorage = localStorage.getItem("data")
// danach noch: Methode zum Speichern implementieren und aufrufen wenn State verändert wird der gespeichert werden soll: localStorage.setItem("transactions", JSON.stringify(transactions));

// gibt also localStorage.setItem() und localStorage.getItem() + JSON.stringify() und JSON.parse()
// localStorage.setItem() -> muss man auch initial machen um Daten anzulegen in localStorage, war hier in Methode und dann aufrufen auch initial