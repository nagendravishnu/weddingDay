// TOGETHER TIMER
const startDate = new Date("2022-01-01T00:00:00");

function updateTogetherTimer() {
    const now = new Date();
    let diff = Math.floor((now - startDate) / 1000);

    const days = Math.floor(diff / 86400);
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    document.getElementById("togetherTimer").textContent =
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

setInterval(updateTogetherTimer, 1000);
updateTogetherTimer();

// QUIZ LOGIC
let timer;
let timeLeft = 30;
let attempts = 0;
const correctAnswer = "blackey+0706997";

function startQuiz() {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");
    startTimer();
}

function startTimer() {
    timeLeft = 30;
    document.getElementById("quizTimer").textContent = timeLeft + "s";

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("quizTimer").textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up 💔");
            location.reload();
        }
    }, 1000);
}

function submitAnswer() {
    const value = document.getElementById("answerInput").value.trim();
    attempts++;

    if (value === correctAnswer) {
        clearInterval(timer);
        document.getElementById("quizScreen").classList.add("hidden");
        document.getElementById("successScreen").classList.remove("hidden");
        return;
    }

    if (attempts === 1) {
        document.getElementById("hintBtn").classList.remove("hidden");
    }

    if (attempts === 3) {
        document.getElementById("callBtn").classList.remove("hidden");
    }

    alert("Wrong answer 😢");
}

function showHint() {
    document.getElementById("hintText").classList.remove("hidden");
}

function togglePassword() {
    const input = document.getElementById("answerInput");
    input.type = input.type === "password" ? "text" : "password";
}
