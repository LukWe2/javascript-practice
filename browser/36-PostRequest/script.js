const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const paragraph = document.getElementById("status");


postForm.addEventListener("submit", async function(event){

    event.preventDefault();

    try {

        paragraph.textContent = "Beitrag wird erstellt...";

        const createdPost = {
            title: titleInput.value,
            text: bodyInput.value,
            userId: 1
        }

        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdPost),
        })

        if (!response.ok){
            throw new Error("Request fehlgeschlagen");
        }

        console.log(response);

        const post = await response.json();

        paragraph.textContent = `Beitrag erstellt mit ID: ${post.id}`;

    } catch (error){
        paragraph.textContent = "Post konnte nicht erstellt werden."

        console.log(error);
    }
});