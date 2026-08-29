// Achtung: an export vor Funktion denken
// wurde falsche Variable genutzt, nicht Parametervariable postData

export async function createPost(postData){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData),
        }
    );

        if (!response.ok){
            throw new Error("Request fehlgeschlagen");
        }

        console.log(response);

        const createdPost = await response.json();

        return createdPost;
}