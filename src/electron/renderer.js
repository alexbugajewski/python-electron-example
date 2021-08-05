const {ipcRenderer} = require('electron')
const addButton = document.getElementById("add-button");
const numOneField = document.getElementById("num-one");
const numTwoField = document.getElementById("num-two");
const resultField = document.getElementById("result");

addButton.addEventListener("click", () => {
    let numOne = parseInt(numOneField.value);
    let numTwo = parseInt(numTwoField.value);

    sendData(numOne, numTwo);
})

function sendData(numOne, numTwo) {
    console.log("sendData called!")
    console.log(result.result);
    
}

// Async message handler
ipcRenderer.on('asynchronous-reply', (event, arg) => {
   console.log(arg)
})

// Async message sender
ipcRenderer.send('asynchronous-message', ['async ping'])