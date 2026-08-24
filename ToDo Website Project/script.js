const list = document.getElementById("list");
const form = document.getElementById("todoForm");
const input = document.getElementById("input");

const printButton = document.getElementById("printButton");

const emptyMessage = document.getElementById("emptyMessage");

form.addEventListener("submit", function(event){
    event.preventDefault();

    if (input.value !== ""){
        const newItem = document.createElement("li");
        newItem.classList.add("listItem");
        newItem.textContent = input.value;
        list.appendChild(newItem);
        updateEmptyMessage();


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.classList.add("deleteButton");
        newItem.append(deleteButton);

        deleteButton.addEventListener("click", function(){
            newItem.remove();

            updateEmptyMessage();
        });
        
        input.value = "";
    }

});

function updateEmptyMessage(){
    if (list.children.length === 0){
        emptyMessage.style.display = "block";
    } else{
        emptyMessage.style.display = "none";
    }
}

printButton.addEventListener("click", function(){
    window.print();
});


list.addEventListener("click", function(event){
    const task = event.target.closest(".listItem");

    if(task){
        task.classList.toggle("done");
    }
    
});