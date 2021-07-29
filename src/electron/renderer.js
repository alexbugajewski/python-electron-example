const addButton = document.getElementById("add-button");
const numOneField = document.getElementById("num-one");
const numTwoField = document.getElementById("num-two");
const resultField = document.getElementById("result");
const url = "http://127.0.0.1:5000/";

addButton.addEventListener("click", () => {
    let numOne = parseInt(numOneField.value);
    let numTwo = parseInt(numTwoField.value);

    data = { numOne: numOne, numTwo: numTwo}
    postData(data);
})

function postData(data = {}) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let result = JSON.parse(xhr.responseText).result;
                console.log(result);
                resultField.innerHTML = result;
            } else {
                console.log("Error somehow...")
            }
        }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify(data));
}