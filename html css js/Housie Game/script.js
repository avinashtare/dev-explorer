// Define variables
const Modal = document.querySelector(".modal"); // Select the modal element
const ModalText = Modal.querySelector("span"); // Select the text element inside the modal
const board = document.querySelector(".board"); // Select the board element
let SelectedNumber = Array(); // Array to store selected numbers
let ModalRunning = false; // Flag to check if modal is currently running

// Function to speak given text
let speakText = (speechText) => {
    // Check if speech synthesis is supported by the browser
    if ('speechSynthesis' in window) {
        var message = new SpeechSynthesisUtterance(); // Create a new speech synthesis object
        message.text = speechText; // Set the text to be spoken

        // Get available voices
        var voices = window.speechSynthesis.getVoices();

        // Set voice (optional)
        message.voice = voices[0]; // You can change the voice here

        // Set additional properties like pitch and rate
        message.rate = .7; // Default rate (speed)

        // Speak the text
        window.speechSynthesis.speak(message);
    } else {
        console.error('Speech synthesis not supported by your browser');
    }
}

// Function to get a random number between min and max (inclusive)
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random number not already selected
const RandomNumber = (selected) => {
    let randomNumber;
    do {
        randomNumber = getRandomNumber(1, 90);
    } while (selected.includes(randomNumber));

    selected.push(randomNumber)
    return randomNumber;
}

// Function to handle key press events
const chooseNumber = (event) => {
    if (ModalRunning) {
        return false; // If modal is already running, exit
    } else if (event.code == "KeyC") {
        clearBoard(); // If 'C' key is pressed, clear the board
        ModalRunning = true;
        return;

    } else if (event.type == "click") {

    } else if (event.code != "Space" || SelectedNumber.length >= 90) {
        return; // If space key is not pressed or maximum numbers are selected, exit
    }

    ModalRunning = true;
    Modal.classList.add("show-modal");

    let RandomNum = RandomNumber(SelectedNumber)
    ModalText.innerText = RandomNum;

    // Speak the selected number
    speakText(`Number ${RandomNum}`);

    // Remove modal and mark the selected number after a delay
    setTimeout(() => {
        Modal.classList.remove("show-modal");
        board.children[RandomNum - 1].classList.add("select-box");
        ModalRunning = false;
    }, 1500);
}

// Function to clear the board
let clearBoard = (isInit) => {
    if (isInit) {
        return; // If it's initialization, exit
    }

    SelectedNumber.length = 0;
    for (let i = 0; i < 90; i++) {
        board.children[i].classList.remove("select-box");
    }

    ModalText.innerText = "Clear";
    Modal.classList.add("show-modal");
    speakText(`Clear`);
    setTimeout(() => { Modal.classList.remove("show-modal"); ModalRunning = false; }, 900)
}

// Function to initialize the game
let init = () => {
    speakText("Welcome To Housie Game");
    clearBoard(true);
}

// Event listeners
document.addEventListener("keypress", chooseNumber); // Listen for key presses
board.addEventListener("click", chooseNumber);

document.addEventListener("DOMContentLoaded", init); // Listen for DOMContentLoaded event to initialize the game