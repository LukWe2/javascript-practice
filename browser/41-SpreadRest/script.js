const showButton = document.getElementById("showButton");
const output = document.getElementById("output");

const frontend = [
    "JavaScript",
    "React"
];

const additionalTechnologies = [
    "TypeScript",
    "Next.js"
];

const user = {
    id: 5,
    name: "Anna",
    role: "Developer"
};


const combined = [ ...frontend, ...additionalTechnologies];


const [first, ...rest] = combined;

console.log(first);

console.log(rest);


const userCopy = {...user, role: "Frontend Developer"};

console.log(userCopy);

showButton.addEventListener("click", function(){
    output.textContent = `${first} - ${userCopy.role}`;
});



