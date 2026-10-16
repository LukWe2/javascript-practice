// muss auch mit mehreren Promises die Antwort des Promise in JavaScript Objekt umwandeln mit .json()!
// also userInfoRequest und postsRequest hatte ich vorher alleine und direkt daraus .name und .title aufgerufen
// ging nicht, weil das zwei Promises sind und noch keine JavaScript Objekte wie beim einzelnen Promise mit const response = await fetch("");
// ist hier einfach zweimal theoretisch const userInfoRequest = await fetch(""); und const postsRequest = await fetch("")
// und muss genauso mit .json() noch in JavaScript umgewandelt werden! 
// (const userInfo = await userInfoRequest.json(); und const userInfo = await userInfoRequest.json();)

const loadButton = document.getElementById("loadButton");
const userOutput = document.getElementById("userOutput");
const postList = document.getElementById("postList");
const paragraph = document.getElementById("status");


loadButton.addEventListener("click", async function(){

    paragraph.textContent = "Daten werden geladen...";

    try {

        const [userInfoRequest, postsRequest] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users/1"),
            fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
        ]);

        paragraph.textContent = "";

        if (!userInfoRequest.ok || !postsRequest.ok) {
            throw new Error("Request fehlgeschlagen");
        }

        const userInfo = await userInfoRequest.json();

        userOutput.textContent = `Benutzer: ${userInfo.name}`;

        postList.replaceChildren();

        const posts = await postsRequest.json();

        posts.forEach(function(post){

            const newItem = document.createElement("li");
            newItem.textContent = post.title;

            postList.append(newItem);

        });

    } catch (error){

        paragraph.textContent = "Daten konnten nicht geladen werden."

        console.log(error);

    }


});