const button = document.getElementById("finishButton");

const items = document.querySelectorAll(".task");

button.addEventListener("click", function(){
    items.forEach(function(item){
    item.classList.add("done");
    })
})

