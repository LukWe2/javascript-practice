const profileForm = document.getElementById("profileForm");

const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");

const errorMessage = document.getElementById("errorMessage");
const output = document.getElementById("output");


function checkNameInput(){
    
    if (nameInput.value.trim() === ""){
        errorMessage.textContent = "Bitte gib einen Namen ein";

        return false;
    }

    return true;
}

function checkAgeInput() {

    const age = Number(ageInput.value);

    if (age < 18) {
        errorMessage.textContent =
            "Du musst mindestens 18 Jahre alt sein.";
        return false;
    }

    if (age > 100) {
        errorMessage.textContent =
            "Bitte gib ein gültiges Alter ein.";
        return false;
    }

    return true;
}


function createAccount(){

    errorMessage.textContent = "";

    output.textContent = `Profil erstellt: ${nameInput.value}, ${ageInput.value} Jahre`
}


profileForm.addEventListener("submit", function(event){
    event.preventDefault();

    if (!checkNameInput()){
        return;
    }

    if (!checkAgeInput()){
        return;
    }

    createAccount();
});


