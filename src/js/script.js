const form = document.querySelector("form");
const dismissButton = document.getElementById("dismissButton");

function handleFormSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("user__email");
    const errorMessage = document.getElementById("errorMessagetag");


    // clean the error message
    errorMessage.innerText = "";
    input.classList.remove("error");


    const email = input.value.trim();
    if (email === "") {
        errorMessage.innerText = "L'adresse email est requise.";
        input.classList.add("error");
        return;
    }

    if (!checkEmail(email)) {
        errorMessage.innerText = "Adresse email invalide.";
        input.classList.add("error");
        return;
    }

    // Stocke the email in the local storage
    localStorage.setItem("savedEmail", email);


    displaySucessMessage(email);
}



function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



function displaySucessMessage(inputValue) {
    const newsLetter = document.querySelector(".newsletter__card");
    newsLetter.classList.add("hidden");

    const sucessCard = document.querySelector(".success__card");
    const emailContainer = document.getElementById("emailDisplay");

    sucessCard.classList.add("show");
    emailContainer.innerText = inputValue;
}


function dismissMessage() {
    localStorage.removeItem("savedEmail");

    document.querySelector(".success__card").classList.remove("show");
    document.querySelector(".newsletter__card").classList.remove("hidden");
}


window.addEventListener("DOMContentLoaded", () => {
    const savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {
        displaySucessMessage(savedEmail);
    }
});



form.addEventListener("submit", handleFormSubmit);
dismissButton.addEventListener("click", dismissMessage);