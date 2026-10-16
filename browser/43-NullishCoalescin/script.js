const firstUserButton = document.getElementById("firstUserButton");
const secondUserButton = document.getElementById("secondUserButton");
const output = document.getElementById("output");


const users = [
    {
        id: 1,
        name: "Anna",
        address: {
            city: "Würzburg"
        }
    },
    {
        id: 2,
        name: "Max"
    }
];


firstUserButton.addEventListener("click", function(){

    const desiredUser = users.find(function(user){

        return user.id === 1;

    });

    output.textContent = `${desiredUser.name} - ${desiredUser?.address?.city ?? "Keine Stadt angegeben"}`;

});


secondUserButton.addEventListener("click", function(){

    const desiredUser = users.find(function(user){

        return user.id === 2;

    });

    output.textContent = `${desiredUser.name} - ${desiredUser?.address?.city ?? "Keine Stadt angegeben"}`;

});