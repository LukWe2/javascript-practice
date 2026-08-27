const loadButton = document.getElementById("loadButton");
const output = document.getElementById("output");

loadButton.addEventListener("click", function(){
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(function(response){
            return response.json();
        })
        .then(function(user){
            output.textContent = `Geladener Benutzer: ${user.name}`;
        })
        .catch(function(error){
            output.textContent = "Benutzer konnte nicht geladen werden.";
            console.log("Fehler: ", error);
        });
});