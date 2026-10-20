
const articleList = document.getElementById("articleList");
// weil die form in der der Button liegt eine id hat und der Button explizit vom Type
// "submit" ist und keine id hat, soll hier wahrscheinlich das event auf der form liegen
const addForm = document.getElementById("articleForm");
const inputAddForm = document.getElementById("titleInput");
const addCategorySelect = document.getElementById("categoryInput");
const searchInput = document.getElementById("searchInput");
const statusFiler = document.getElementById("statusFilter");

const summaryParagraph = document.getElementById("summary");

const emptyMessage = document.getElementById("emptyMessage");


const initialArticles = [
    {
        id: 101,
        title: "React-Komponenten verstehen",
        category: "Frontend",
        isRead: false
    },
    {
        id: 102,
        title: "REST API Grundlagen",
        category: "APIs",
        isRead: true
    },
    {
        id: 103,
        title: "CSS Flexbox Layouts",
        category: "Frontend",
        isRead: false
    },
    {
        id: 104,
        title: "Accessible Forms",
        category: "UX",
        isRead: false
    }
];


let articles = [...initialArticles];

let nextArticleId = 105;

// benutzen hier Default Parameter also wenn etwas übergeben wird also ein Array als Parameter, dann benutze dies hier: visibleArticles.forEach((article) => { ... }, wenn leer dann nehme das Default Array articles, deswegen visibleArticles = articles
function renderArticles(visibleArticles = articles) {

    // oder ohne die Default Parameter Syntax:
    /*
    function renderArticles(visibleArticles) {
        if (visibleArticles === undefined) {
            visibleArticles = articles;
        }

        ...
    */

    articleList.replaceChildren();

    visibleArticles.forEach((article) => {
        const newListItem = document.createElement("li");

        // siehe: Konzept 15: data-* Attribute und dataset
        // kann mit dataset HTML-Elemente eigene zusätzliche Informationen geben, wie auch data-id, was eine zusätzliche Information für JavaScript ist und
        // sozusagen vorgegeben ist, durch .dataset.id = ... kann man dieses Attribut data-id="..." jeweils zuweisen, Ergebnis ist dann z.B.:
        // <li data-id="101">React-Komponenten verstehen
        // ... (paragraphs und buttons)
        // </li>
        newListItem.dataset.id = article.id;

        if (article.isRead){

            newListItem.classList.add("is-read");
        }

        // erstellen span für Titel weil CSS-Selektor ein Kind verlangt das Klasse .article-title hat, diese Klasse wird drunter diese Klasse hinzugefügt, sonst hätte newList also das li-Element
        // beide Klassen und CSS-Selektor würde nicht mehr passen, müsste dann .is-read.article-title sein, was ein HTML-Element mit zwei CSS-Klassen aussucht
        const titleElement = document.createElement("span");

        // wegen dieser Zuweisung wird nur der Titel durchgestrichen und nicht ganzes Element, weil CSS-Selektor so ist: .is-read .article-title
        titleElement.classList.add("article-title");
        titleElement.textContent = article.title;

        newListItem.appendChild(titleElement);

        articleList.appendChild(newListItem);

        const newListItemCategory = document.createElement("p");
        newListItemCategory.textContent = article.category;
        newListItem.appendChild(newListItemCategory);

        const newListItemStatus = document.createElement("p");
        newListItemStatus.textContent = article.isRead ? "Gelesen" : "Ungelesen";
        newListItem.appendChild(newListItemStatus);

        const switchStatusButton = document.createElement("button");
        switchStatusButton.textContent = "Switch Status";
        // Adden dem Button noch eine CSS Klasse, damit wir unten für Event Bubbling im Listen Listener identifizieren können wenn der Button und kein anderes Element in der Form geklickt wurde
        // (sonst wird bei jedem Kind was man klickt das Listenelement durchgestrichen)
        switchStatusButton.classList.add("switch-status-button");
        newListItem.appendChild(switchStatusButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Item";
        deleteButton.addEventListener("click", () => {

            deleteArticle(article.id);
            renderArticles();
        })
        newListItem.appendChild(deleteButton);

        // wenn Löschen von einem Artikel auch über Event Delegation umgesetzt werden würde:
        /*
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Item";
        deleteButton.classList.add("delete-button");

        newListItem.appendChild(deleteButton);
        */

    });
};


renderArticles();


function addNewArticle(){

    const newArticleId = nextArticleId;

    nextArticleId++;

    const newArticleTitle = inputAddForm.value.trim();

    const newArticleCategory = addCategorySelect.value;

    const newArticleStatus = false;

    articles.push(
        {
            id: newArticleId,
            title: newArticleTitle,
            category: newArticleCategory,
            isRead: newArticleStatus
        }
    );
};




addForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (inputAddForm.value.trim() === ""){

        return;
    }

    addNewArticle();

    renderArticles();

    createSummary(articles, articles);

    inputAddForm.value = "";
});



articleList.addEventListener("click", function(event) {

    if (!event.target.classList.contains("switch-status-button")) {
        return;
    }

    // Ab hier wird nur auf Switch-Status-Klicks reagiert.

    // nur event.target ist hier nicht richtig, weil man auf den Button klickt und event.target der Button wäre, die data-id mit der wir vergleichen liegt aber auf dem li-Element, was wir mit closest() finden,
    // liefert das nähste spezifizierte Element durch Event Bubbling
    const closestLiEelementToClickedElement = event.target.closest("li");

    articles = articles.map((article) => {

        if (article.id === Number(closestLiEelementToClickedElement.dataset.id)){

            return (
                {
                    ...article,
                    isRead: !article.isRead
                }
            )
        }

        return article;
    });

    renderArticles();

    createSummary(articles, articles);


    // wenn Löschen von einem Artikel auch über Event Delegation umgesetzt werden würde:
    /*
    articleList.addEventListener("click", function(event) {

        const clickedElement = event.target;

        const clickedLi = clickedElement.closest("li");

        if (!clickedLi) {
            return;
        }

        const id = Number(clickedLi.dataset.id);

        // Switch Status
        if (clickedElement.classList.contains("switch-status-button")) {

            articles = articles.map((article) => {
                if (article.id === id) {
                    return {
                        ...article,
                        isRead: !article.isRead
                    };
                }

                return article;
            });

            renderArticles();
        }

        // Delete Item
        if (clickedElement.classList.contains("delete-button")) {

            deleteArticle(id);

            renderArticles();
        }
    });
    */

});


function deleteArticle(id) {

    // Filter returned ein neues Array was hier aber wieder articles zugewiesen wird und somit überschreibt, map() eignet sich hier nicht, weil es immer ein Array von gleicher Länge wie vorher zurückgibt!
    // wollen aber ja ein kürzeres wenn wir etwas löschen logischerweise
    articles = articles.filter((article) => {

        return article.id !== id;
    });

    createSummary(articles, articles);
}




searchInput.addEventListener("input", function(event) {

    emptyMessage.textContent = "";

    const input = searchInput.value.toLowerCase();

    // hier jetzt nicht den State überschreiben, da wir sonst ja kein Backup sozusagen mehr haben, nachdem wir die Suche resetten, .filter() würde dann aus dem articles-Array alle Einträge löschen weil keine mit der EIngabe (die dann leer ist)
    // übereinstimmt und das Array wäre leer, wenn wir die ursprünglichen Artikel ohne Suche rendern wollen
    const matchingArticles = articles.filter((article) => {

        const matchesStatus = statusFiler.value === "all" || (statusFiler.value === "open" && !article.isRead) || statusFiler.value === "read" && article.isRead;

        return article.title.toLowerCase().includes(input) && matchesStatus;
    });

    if (matchingArticles.length === 0){

        emptyMessage.textContent = "Keine passenden Artikel gefunden.";
    }

    renderArticles(matchingArticles);

    createSummary(matchingArticles, articles);
});


statusFiler.addEventListener("change", function() {

    const matchingArticles = articles.filter((article) => {

        const matchesStatus = statusFiler.value === "all" || (statusFiler.value === "open" && !article.isRead) || statusFiler.value === "read" && article.isRead;

        return matchesStatus;
    })

    renderArticles(matchingArticles);

    createSummary(articles, articles);
})



function createSummary(filteredArticles, originalArticles) {

    const currentlyVisibleArticles = filteredArticles.length;

    const totalArticleCount = originalArticles.length;

    // soll von allen Artikel die Anzahl der gelesenen sein, nicht von gerade gefilterten -> articles Array wird ja nicht gefiltert, aber trotzdem geupdated wenn der Status des Artikels umgeschaltet wird, somit articles Array benutzen
    // dachte erst, auch articles Array wird beim Filtern verändert, wird aber nicht weil wir ein neues Array matchingArticles anlegen, articles wird geupdatet wenn sich der Status eines Artikels ändert und initialArticles wird ja garnicht verändert,
    // somit passt es
    let readArticleCount = 0;
    originalArticles.forEach((article) => {

        if (article.isRead === true){

            readArticleCount++;
        }
    })

    const summary = `${currentlyVisibleArticles} von ${totalArticleCount} angezeigt - ${readArticleCount} gelesen.`;

    summaryParagraph.textContent = summary;
}

createSummary(articles, articles);
