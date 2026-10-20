// Vollständige Variante: renderArticles() übernimmt auch die Aufgaben von updateView().
// Zum Ausprobieren in index.html den vorhandenen Script-Verweis ersetzen durch:
// <script src="script-render.js"></script>

const articleList = document.getElementById("articleList");
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

const articlesLocalStorage = localStorage.getItem("articles");

let articles = articlesLocalStorage === null
    ? [...initialArticles]
    : JSON.parse(articlesLocalStorage);

let nextArticleId = Math.max(104, ...articles.map((article) => article.id)) + 1;

// Speichern ist nur nach einer Änderung der Artikeldaten notwendig.
function saveArticles() {
    localStorage.setItem("articles", JSON.stringify(articles));
}

// Kein Parameter nötig: Die Funktion ermittelt selbst die sichtbaren Artikel.
function renderArticles() {
    // 1. Suchbegriff und Statusfilter auslesen
    const input = searchInput.value.toLowerCase();
    const status = statusFiler.value;

    // 2. Passende Artikel ermitteln; das Array articles bleibt dabei unverändert.
    const matchingArticles = articles.filter((article) => {
        // Jeder String enthält "", daher passen bei leerem Suchfeld alle Titel.
        const matchesTitle = article.title.toLowerCase().includes(input);

        const matchesStatus =
            status === "all" ||
            (status === "open" && !article.isRead) ||
            (status === "read" && article.isRead);

        return matchesTitle && matchesStatus;
    });

    // 3. Liste leeren und passende Artikel anzeigen
    articleList.replaceChildren();

    matchingArticles.forEach((article) => {
        const newListItem = document.createElement("li");
        // Die ID am li ermöglicht später die Zuordnung eines Button-Klicks.
        newListItem.dataset.id = article.id;

        if (article.isRead) {
            newListItem.classList.add("is-read");
        }

        const titleElement = document.createElement("span");
        titleElement.classList.add("article-title");
        titleElement.textContent = article.title;
        newListItem.appendChild(titleElement);

        const newListItemCategory = document.createElement("p");
        newListItemCategory.textContent = article.category;
        newListItem.appendChild(newListItemCategory);

        const newListItemStatus = document.createElement("p");
        newListItemStatus.textContent = article.isRead
            ? "Gelesen"
            : "Ungelesen";
        newListItem.appendChild(newListItemStatus);

        const switchStatusButton = document.createElement("button");
        switchStatusButton.textContent = "Switch Status";
        switchStatusButton.classList.add("switch-status-button");
        newListItem.appendChild(switchStatusButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Item";
        deleteButton.classList.add("delete-button");
        newListItem.appendChild(deleteButton);

        articleList.appendChild(newListItem);
    });

    // 4. Zusammenfassung und Leermeldung aktualisieren
    createSummary(matchingArticles, articles);

    emptyMessage.textContent = matchingArticles.length === 0
        ? "Keine passenden Artikel gefunden."
        : "";
}

function addNewArticle() {
    const newArticleId = nextArticleId;
    nextArticleId++;

    const newArticleTitle = inputAddForm.value.trim();
    const newArticleCategory = addCategorySelect.value;
    const newArticleStatus = false;

    articles.push({
        id: newArticleId,
        title: newArticleTitle,
        category: newArticleCategory,
        isRead: newArticleStatus
    });
}

addForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (inputAddForm.value.trim() === "") {
        return;
    }

    addNewArticle();

    // Erst nach dem Auslesen leeren, sonst hätte der neue Artikel keinen Titel.
    inputAddForm.value = "";

    saveArticles();
    renderArticles();
});

// Ein Listener auf der Liste behandelt auch Klicks auf neu erstellte Buttons.
articleList.addEventListener("click", function(event) {
    const clickedElement = event.target;
    const clickedLi = clickedElement.closest("li");

    if (!clickedLi) {
        return;
    }

    const id = Number(clickedLi.dataset.id);

    // Lesestatus umschalten
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

        saveArticles();
        renderArticles();
    }

    // Artikel löschen
    if (clickedElement.classList.contains("delete-button")) {
        deleteArticle(id);
        saveArticles();
        renderArticles();
    }
});

function deleteArticle(id) {
    articles = articles.filter((article) => {
        return article.id !== id;
    });
}

// Suche und Filter ändern nur die Ansicht, deshalb hier kein saveArticles().
searchInput.addEventListener("input", renderArticles);
statusFiler.addEventListener("change", renderArticles);

function createSummary(filteredArticles, originalArticles) {
    const currentlyVisibleArticles = filteredArticles.length;
    const totalArticleCount = originalArticles.length;

    // Gelesene Artikel werden in der gesamten Liste gezählt, unabhängig vom Filter.
    let readArticleCount = 0;

    originalArticles.forEach((article) => {
        if (article.isRead === true) {
            readArticleCount++;
        }
    });

    const summary = `${currentlyVisibleArticles} von ${totalArticleCount} angezeigt - ${readArticleCount} gelesen.`;
    summaryParagraph.textContent = summary;
}

// Ansicht beim Laden der Seite aufbauen
renderArticles();
