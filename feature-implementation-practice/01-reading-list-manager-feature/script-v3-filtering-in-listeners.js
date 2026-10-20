// Variante 3: Die Listener filtern, renderArticles() zeigt das Ergebnis an.
// Zum Ausprobieren in index.html den vorhandenen Script-Verweis ersetzen durch:
// <script src="script-v3-filtering-in-listeners.js"></script>
//
// Jeder Listener berücksichtigt BEIDE Filter und startet beim gesamten Array articles.
// Die Wiederholung ist hier bewusst gewählt, um diese Variante vergleichen zu können.

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

function saveArticles() {
    localStorage.setItem("articles", JSON.stringify(articles));
}

// Die Funktion erhält die bereits gefilterten Artikel als Parameter.
// Sie liest keine Filterwerte aus und enthält keine Filterlogik.
function renderArticles(visibleArticles) {
    articleList.replaceChildren();

    visibleArticles.forEach((article) => {
        const newListItem = document.createElement("li");
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

    // Diese Anzeigen gehören zur Darstellung und benötigen keine eigene Filterung.
    createSummary(visibleArticles, articles);

    emptyMessage.textContent = visibleArticles.length === 0
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
    inputAddForm.value = "";
    saveArticles();

    // Auch nach dem Hinzufügen müssen die aktuellen Filter gelten.
    const input = searchInput.value.toLowerCase();
    const status = statusFiler.value;

    const matchingArticles = articles.filter((article) => {
        const matchesTitle = article.title.toLowerCase().includes(input);

        const matchesStatus =
            status === "all" ||
            (status === "open" && !article.isRead) ||
            (status === "read" && article.isRead);

        return matchesTitle && matchesStatus;
    });

    renderArticles(matchingArticles);
});

articleList.addEventListener("click", function(event) {
    const clickedElement = event.target;
    const clickedLi = clickedElement.closest("li");

    if (!clickedLi) {
        return;
    }

    const id = Number(clickedLi.dataset.id);

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
    } else if (clickedElement.classList.contains("delete-button")) {
        deleteArticle(id);
    } else {
        // Ein Klick auf Titel oder Kategorie ändert keine Daten.
        return;
    }

    saveArticles();

    // Gilt für beide Aktionen: Nach der Datenänderung erneut filtern.
    // Beispiel: Ein gelesener Artikel verschwindet aus dem Filter "Ungelesen".
    const input = searchInput.value.toLowerCase();
    const status = statusFiler.value;

    const matchingArticles = articles.filter((article) => {
        const matchesTitle = article.title.toLowerCase().includes(input);

        const matchesStatus =
            status === "all" ||
            (status === "open" && !article.isRead) ||
            (status === "read" && article.isRead);

        return matchesTitle && matchesStatus;
    });

    renderArticles(matchingArticles);
});

function deleteArticle(id) {
    // Hier wird articles absichtlich neu zugewiesen: Der Artikel wird gelöscht.
    // Beim Filtern der Ansicht bleibt articles dagegen vollständig erhalten.
    articles = articles.filter((article) => {
        return article.id !== id;
    });
}

searchInput.addEventListener("input", function() {
    // Beim Suchen zusätzlich den ausgewählten Status berücksichtigen.
    const input = searchInput.value.toLowerCase();
    const status = statusFiler.value;

    const matchingArticles = articles.filter((article) => {
        const matchesTitle = article.title.toLowerCase().includes(input);

        const matchesStatus =
            status === "all" ||
            (status === "open" && !article.isRead) ||
            (status === "read" && article.isRead);

        return matchesTitle && matchesStatus;
    });

    // Keine Datenänderung, deshalb kein saveArticles().
    renderArticles(matchingArticles);
});

statusFiler.addEventListener("change", function() {
    // Beim Statuswechsel zusätzlich den aktuellen Suchbegriff berücksichtigen.
    const input = searchInput.value.toLowerCase();
    const status = statusFiler.value;

    const matchingArticles = articles.filter((article) => {
        const matchesTitle = article.title.toLowerCase().includes(input);

        const matchesStatus =
            status === "all" ||
            (status === "open" && !article.isRead) ||
            (status === "read" && article.isRead);

        return matchesTitle && matchesStatus;
    });

    renderArticles(matchingArticles);
});

function createSummary(filteredArticles, originalArticles) {
    const currentlyVisibleArticles = filteredArticles.length;
    const totalArticleCount = originalArticles.length;

    // Gelesene Artikel werden weiterhin über die gesamte Liste gezählt.
    let readArticleCount = 0;

    originalArticles.forEach((article) => {
        if (article.isRead === true) {
            readArticleCount++;
        }
    });

    const summary = `${currentlyVisibleArticles} von ${totalArticleCount} angezeigt - ${readArticleCount} gelesen.`;
    summaryParagraph.textContent = summary;
}

// Beim Start hat noch kein Listener reagiert. Deshalb einmal separat filtern
// und rendern. Dabei werden auch bereits vorbelegte Filterwerte berücksichtigt.
const input = searchInput.value.toLowerCase();
const status = statusFiler.value;

const matchingArticles = articles.filter((article) => {
    const matchesTitle = article.title.toLowerCase().includes(input);

    const matchesStatus =
        status === "all" ||
        (status === "open" && !article.isRead) ||
        (status === "read" && article.isRead);

    return matchesTitle && matchesStatus;
});

renderArticles(matchingArticles);
