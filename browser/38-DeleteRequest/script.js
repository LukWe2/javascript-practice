// wieder async vor der function() im Listener vergessen und await vor den Promise-erzeugenden Aufrufen
// (hier nur vor dem fetch-Aufruf, sonst noch vor dem Objekt das response in JavaScript Objekt wieder umwandelt wie
// const user = response.json() oder const post = respone.json())

const deleteButton = document.getElementById("deleteButton");
const paragraph = document.getElementById("status");

deleteButton.addEventListener("click", async function(){

    paragraph.textContent = "Beitrag wird gelöscht...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "DELETE",
            /*
            headers: {
                "Content-Type": "application/json"
            },
            */
        });

        if (!response.ok){
            throw new Error("Request fehlgeschlagen.");
        }

        paragraph.textContent = "Beitrag wurde erfolgreich gelöscht.";

    } catch (error){

        paragraph.textContent = "Post konnte nicht gelöscht werden.";

        console.log(error);
    }

});