const loadButton = document.getElementById("loadButton");
const output = document.getElementById("output");

loadButton.addEventListener("click", async function(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    const user = await response.json();

    output.textContent = `Geladener Benutzer: ${user.name}`;
});