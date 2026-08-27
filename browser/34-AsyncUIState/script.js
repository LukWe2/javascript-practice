const loadButton = document.getElementById("loadButton");
const paragraph = document.getElementById("status");

loadButton.addEventListener("click", async function(){
    
    loadButton.disabled = true;
    paragraph.textContent = "Benutzer wird geladen...";

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        if (!response.ok){
            throw new Error("Request fehlgeschlagen");
        }

        const user = await response.json();

        paragraph.textContent = `Geladener Benutzer: ${user.name}`;

    } catch (error){

        paragraph.textContent = "Benutzer konnte nicht geladen werden."
    } finally {
        loadButton.disabled = false;
    }
});