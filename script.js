document.addEventListener("DOMContentLoaded", function () {
    const displayWordElement = document.getElementById("display-word");
    const guessInput = document.getElementById("guess");
    const guessButton = document.getElementById("guess-button");
    const feedbackText = document.getElementById("feedback-text");
    const attemptsElement = document.getElementById("attempts");

    let word = "";
    let guessedLetters = [];
    let attempts = 6;

    function chooseWord() {
        const words = ["python", "java", "javascript", "ruby", "php", "csharp", "swift", "html", "css"];
        return words[Math.floor(Math.random() * words.length)];
    }

    function displayWord(word, guessedLetters) {
        let display = "";
        for (const letter of word) {
            if (guessedLetters.includes(letter)) {
                display += letter;
            } else {
                display += "_";
            }
            display += " ";
        }
        return display.trim();
    }

    function updateDisplay() {
        displayWordElement.textContent = displayWord(word, guessedLetters);
        attemptsElement.textContent = attempts;
    }

    function checkWinLoss() {
        if (attempts === 0) {
            feedbackText.textContent = "Game Over! A palavra era: " + word;
            guessInput.disabled = true;
            guessButton.disabled = true;
        } else if (!displayWord(word, guessedLetters).includes("_")) {
            feedbackText.textContent = "Parabéns! Você acertou a palavra: " + word;
            guessInput.disabled = true;
            guessButton.disabled = true;
        }
    }

    function handleGuess() {
        const guess = guessInput.value.toLowerCase();
        if (guessedLetters.includes(guess)) {
            feedbackText.textContent = "Você já tentou essa letra. Tente outra.";
            guessInput.value = "";
            return;
        }

        guessedLetters.push(guess);

        if (word.includes(guess)) {
            feedbackText.textContent = "Boa! Essa letra está na palavra.";
        } else {
            feedbackText.textContent = "Ops! Essa letra não está na palavra.";
            attempts--;
        }

        guessInput.value = "";
        updateDisplay();
        checkWinLoss();
    }

    word = chooseWord();
    updateDisplay();

    guessButton.addEventListener("click", handleGuess);
});
