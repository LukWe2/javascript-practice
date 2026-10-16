const showButton = document.getElementById("showButton");
const output = document.getElementById("output");

const user = {
    id: 7,
    name: "Anna",
    email: "anna@example.com",
    role: "Developer"
};




showButton.addEventListener("click", function(){

    const { name, email, role } = user;

    output.textContent = `${name} - ${email} - ${role}`;

    const technologies = [
    "JavaScript",
    "React",
    "TypeScript"
    ];

    const [ firstArrayElement, secondArrayElement] = technologies;

    console.log(`First Array Element: ${firstArrayElement} - Second Array Element: ${secondArrayElement}`);
});