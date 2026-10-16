const runButton = document.getElementById("runButton");


runButton.addEventListener("click", function(){

    console.log("Start");

    setTimeout(function(){
        console.log("Timer")
    }, 0);

    Promise.resolve().then(function(){
        console.log("Promise")
    });

    console.log("Synchrones Ende");

});