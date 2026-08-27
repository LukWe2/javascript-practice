import { loadUser } from "./api.js"

const loadButton = document.getElementById("loadButton");
const paragraph = document.getElementById("status");

loadButton.addEventListener("click", async function(){

    loadButton.disabled = true;
    paragraph.textContent = "Benutzer wird geladen...";

    try {

        const user = await loadUser();

        paragraph.textContent = `Geladener Benutzer: ${user.name}`;

    } catch (error){

        paragraph.textContent = "Benutzer konnte nicht geladen werden.";
        console.error(error);

    } finally {

        loadButton.disabled = false;

    }
});