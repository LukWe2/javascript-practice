// muss neuen Titel als Objekt schicken, nicht nur als String
// also const newTitle = titleInput.value; ist falsch, muss const newTitle = { title: titleInput.value} sein

const updateForm = document.getElementById("updateForm");
const titleInput = document.getElementById("titleInput");
const paragraph = document.getElementById("status");

updateForm.addEventListener("submit", async function(event){
    
    event.preventDefault();

    paragraph.textContent = "Beitrag wird aktualisiert...";

    const updatedPost = { title: titleInput.value };

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedPost)
            }
        );

        if (!response.ok){
            throw new Error("Request fehlgeschlagen.")
        }

        const post = await response.json();

        paragraph.textContent = `Neuer Titel: ${post.title}`;

    } catch (error){

        paragraph.textContent = "Post konnte nicht aktualisiert werden."

        console.log(error);
    }


});