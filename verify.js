const CORRECT_ANSWER = "blackey+06071997";
let attempts = 0;
let timeLeft = 30;
let quizInterval;

function startQuiz() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  resetQuiz();
}

function resetQuiz() {
  clearInterval(quizInterval);
  timeLeft = 30;

  document.getElementById("quiz-timer").textContent = timeLeft;
  document.getElementById("answer").value = "";
  document.getElementById("error").textContent = "";
  document.getElementById("hint").textContent = "";

  startTimer();
}

function startTimer() {
  quizInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("quiz-timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(quizInterval);
      failedAttempt("Time's up 😭");
    }
  }, 1000);
}

function togglePassword() {
  const input = document.getElementById("answer");
  input.type = input.type === "password" ? "text" : "password";
}

function checkAnswer() {
  const input = document.getElementById("answer").value.trim();

  if (input === CORRECT_ANSWER) {
    clearInterval(quizInterval);
    document.getElementById("quiz-box").innerHTML =
      "<h2>Okay… it’s really you ❤️</h2>";
    return;
  }

  failedAttempt("Nope… try again 😅");
}

function failedAttempt(message) {
  attempts++;
  document.getElementById("error").textContent = message;

  if (attempts === 2) {
    document.getElementById("hintBtn").classList.remove("hidden");
  }

  if (attempts >= 3) {
    document.getElementById("callBtn").classList.remove("hidden");
  }

  setTimeout(resetQuiz, 1500);
}

function showHint() {
  document.getElementById("hint").textContent = "⬛(-k)🔑🎂";
}
