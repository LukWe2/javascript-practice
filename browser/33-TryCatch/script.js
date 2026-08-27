const loadButton = document.getElementById("loadButton");
const output = document.getElementById("output");

loadButton.addEventListener("click", async function(){
    
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users/9999999");

        if (!response.ok){
            throw new Error("Request fehlgeschlagen");
        }

        const user = await response.json();

        output.textContent = `Geladener Benutzer: ${user.name}`

    } catch (error){

        output.textContent = "Benutzer konnte nicht geladen werden.";
        console.log(error);
    }
});