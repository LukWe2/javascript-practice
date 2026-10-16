import {
    loadPosts,
    createPost,
    updatePost,
    deletePost
} from "./api.js";

const loadButton = document.getElementById("loadButton");
const paragraph = document.getElementById("status");
const postList = document.getElementById("postList");

const createForm = document.getElementById("createForm");

const createTitleInput = document.getElementById("createTitleInput");
const createBodyInput = document.getElementById("createBodyInput");

const updateForm = document.getElementById("updateForm");

const updateIdInput = document.getElementById("updateIdInput");
const updateTitleInput = document.getElementById("updateTitleInput");

const deleteForm = document.getElementById("deleteForm");

const deleteIdInput = document.getElementById("deleteIdInput");



loadButton.addEventListener("click", async function(){
    
    try {

        const posts = await loadPosts();

        postList.replaceChildren();

        posts.forEach(function(post){
            const newPost = document.createElement("li");
            newPost.textContent = post.title;

            postList.append(newPost);
        });

    } catch(error){

        paragraph.textContent = "Posts konnten nicht geladen werden.";

    }

});


createForm.addEventListener("submit", async function(event){
    
    event.preventDefault();

    try {

        const newPost = {
            title: createTitleInput.value,
            body: createBodyInput.value,
            userId: 1
        }
        
        const addedPost = await createPost(newPost);


        paragraph.textContent = `Added Post ID: ${addedPost.id}`;
    
    } catch(error){

        paragraph.textContent = "Post konnte nicht erstellt werden.";

    }

});


updateForm.addEventListener("submit", async function(event){
    
    event.preventDefault();

    try {

        const updatedPost = {
            id: updateIdInput.value,
            title: updateTitleInput.value,
        }
        

        const updatedPostResponse = await updatePost(
            updateIdInput.value,
            updatedPost
        );

        paragraph.textContent = `Updated Post ID: ${updatedPostResponse.id}`;
    
    } catch(error){

        paragraph.textContent = "Post konnte nicht aktualisiert werden.";

    }

});


deleteForm.addEventListener("submit", async function(event){

    event.preventDefault();

    try {
        
        await deletePost(deleteIdInput.value);

        paragraph.textContent = `Deleted Post with ID: ${deleteIdInput.value}`;

    } catch(error){

        paragraph.textContent = "Post konnte nicht gelöscht werden.";

    }

});




