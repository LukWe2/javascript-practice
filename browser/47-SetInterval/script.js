const output = document.getElementById("output");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

let secondCount = 0;
let intervalId = null;

startButton.addEventListener("click", function(){

    if (intervalId !== null) {
        return;
    }

    intervalId = setInterval(function(){

        secondCount += 1;

        output.textContent = `Sekunden: ${secondCount}`
    }, 1000);
});


stopButton.addEventListener("click", function(){

    clearInterval(intervalId);

    intervalId = null;

});