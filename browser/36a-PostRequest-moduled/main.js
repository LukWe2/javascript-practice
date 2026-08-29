import { createPost } from "./api.js";

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

        const post = await createPost(createdPost);

        paragraph.textContent = `Beitrag erstellt mit ID: ${post.id}`;

    } catch (error){
        paragraph.textContent = "Post konnte nicht erstellt werden."

        console.log(error);
    }
});