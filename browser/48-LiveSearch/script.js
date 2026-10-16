const searchInput = document.getElementById("searchInput");
const paragraph = document.getElementById("status");
const technologyList = document.getElementById("technologyList");


const technologies = [
    "JavaScript",
    "React",
    "TypeScript",
    "Next.js",
    "CSS",
    "HTML"
];

function showDefault(){

    if (searchInput.value === ""){

        technologies.forEach(function(item){

            const newItem = document.createElement("li");
            newItem.textContent = item;

            technologyList.append(newItem);
        }    
    )
}
}

showDefault();



searchInput.addEventListener("input", function(){

    technologyList.replaceChildren();

    const currentInput = searchInput.value.toLowerCase();

    const matchingItems = technologies.filter(function(item){
        return item.toLowerCase().includes(currentInput);
    });

    paragraph.textContent = "";

    if (matchingItems.length === 0){
        paragraph.textContent = "Keine Ergebnisse gefunden.";
    }

    matchingItems.forEach(function(fittingItem){

        const newItem = document.createElement("li");
        newItem.textContent = fittingItem;

        technologyList.append(newItem);
    });

});