const container = document.getElementById("container");
const button = document.getElementById("button");

container.addEventListener("click", function(event){
    console.log("target:", event.target);
    console.log("currentTarget:", event.currentTarget);
});
