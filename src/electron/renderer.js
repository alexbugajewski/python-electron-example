const addButton = document.getElementById("add-button");
const numOneField = document.getElementById("num-one");
const numTwoField = document.getElementById("num-two");

addButton.addEventListener("click", () => {
    numOne = parseInt(numOneField.value);
    numTwo = parseInt(numTwoField.value);
    alert(numOne + numTwo);
})