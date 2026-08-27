const selectButton = document.getElementById("selectButton");
const output = document.getElementById("output");


selectButton.addEventListener("click", function(event){
    const card = event.currentTarget.parentElement;

    const firstChild = card.firstElementChild;

    const firstChildContent = firstChild.textContent;

    output.textContent = `Ausgewählt: ${firstChildContent}`;

    card.classList.add("selected");
});

