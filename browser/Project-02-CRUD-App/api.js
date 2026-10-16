export async function loadPosts(){

    const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");

        if (!response.ok){
            throw new Error("Response fehlgeschlagen.")
        }

    const posts = await response.json();

    return posts;

}



export async function createPost(postData){

        
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData) 
    });


    if (!response.ok){
        throw new Error("Response fehlgeschlagen.")
    }


    const addedPost = await response.json();


    return addedPost;

}


export async function updatePost(id, postData){
        
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData) 
    });


    if (!response.ok){
        throw new Error("Response fehlgeschlagen.")
    }

    const updatedPostResponse = await response.json();

    return updatedPostResponse;

}


export async function deletePost(id){

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE"
        });


        if (!response.ok){
            throw new Error("Response fehlgeschlagen.")
        }

}