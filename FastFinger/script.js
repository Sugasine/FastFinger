const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
let totalMistakes = 0;
let totalCharsTyped = 0;
let totalWordsTyped = 0;
let isTestRunning = false;

// Custom Quotes List
const quotes = [
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Your time is limited, don't waste it living someone else's life.",
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Life is what happens when you're busy making other plans.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It's not whether you get knocked down, it's whether you get up.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Change your thoughts and you change your world.",
    "You miss 100% of the shots you don't take."
];

// Function to get a random quote
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Display random quotes
const renderNewQuote = () => {
    quote = getRandomQuote();
    console.log("Fetched quote:", quote);  // Debug log
    let arr = quote.split("").map(value => {
        return `<span class='quote-chars'>${value}</span>`;
    });
    quoteSection.innerHTML = arr.join("");
};

// Logic for comparing input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split("");

    quoteChars.forEach((char, index) => {
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
            char.classList.remove("fail");
        } else if (userInputChars[index] == null) {
            char.classList.remove("success");
            char.classList.remove("fail");
        } else {
            if (!char.classList.contains("fail")) {
                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
    });

    let check = quoteChars.every((element) => element.classList.contains("success"));
    if (check) {
        calculateResults();
        renderNewQuote();
        userInput.value = "";
    }
});

// Update Timer on screen
function updateTimer() {
    if (time == 0) {
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

// Sets timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

// Calculate accuracy and speed
const calculateResults = () => {
    totalMistakes += mistakes;
    totalCharsTyped += userInput.value.length;
    totalWordsTyped += userInput.value.split(" ").length;
    mistakes = 0;
}

// End Test
const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = (60 - time) / 60;
    document.getElementById("wpm").innerText = (totalWordsTyped / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText = Math.round(((totalCharsTyped - totalMistakes) / totalCharsTyped) * 100) + "%";
    isTestRunning = false;
};

// Start Test
const startTest = () => {
    mistakes = 0;
    totalMistakes = 0;
    totalCharsTyped = 0;
    totalWordsTyped = 0;
    time = 60;
    userInput.disabled = false;
    userInput.value = "";
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
    renderNewQuote();
    isTestRunning = true;
};

// Reset Test
const resetTest = () => {
    clearInterval(timer);
    time = 60;
    mistakes = 0;
    totalMistakes = 0;
    totalCharsTyped = 0;
    totalWordsTyped = 0;
    userInput.value = "";
    userInput.disabled = true;
    document.getElementById("timer").innerText = "0s";
    document.getElementById("mistakes").innerText = "0";
    document.getElementById("wpm").innerText = "";
    document.getElementById("accuracy").innerText = "";
    document.querySelector(".result").style.display = "none";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    renderNewQuote();
    isTestRunning = false;
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};
