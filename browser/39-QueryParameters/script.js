// wieder async vor der Listener function() vergessen und await for den Promise erzeugenden Aufrufen fetch()
// und response.json()!!!!!!!!!!

const userForm = document.getElementById("userForm");
const userIdInput = document.getElementById("userIdInput");
const paragraph = document.getElementById("status");
const postList = document.getElementById("postList");

userForm.addEventListener("submit", async function(event){
    
    event.preventDefault();

    paragraph.textContent = "Posts werden geladen...";

    const url = "https://jsonplaceholder.typicode.com/posts?userId=" + userIdInput.value;

    console.log(url);


    try {
        const respone = await fetch(url);

        const arrayOfPosts = await respone.json();

        arrayOfPosts.forEach(function(post){

            const newPost = document.createElement("li");
            newPost.textContent = post.title;

            postList.append(newPost);

        });
    } catch (error){

        paragraph.textContent = "Posts konnten nicht geladen werden.";

        console.log(error);
    }

})