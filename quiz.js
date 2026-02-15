const quizData = [
  {
    question: "Where did we first meet?",
    answers: ["At work", "At a party", "Online", "By fate ❤️"],
    correct: 3
  },
  {
    question: "What’s our favorite thing to do together?",
    answers: ["Travel", "Watch movies", "Eat good food", "All of the above"],
    correct: 3
  },
  {
    question: "Who loves the other more?",
    answers: ["You", "Me", "Both equally ❤️", "Impossible to measure"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (index === quizData[currentQuestion].correct) {
    score++;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  resultEl.innerHTML = `You got ${score} / ${quizData.length} 💖<br><br>
  No matter the score, I choose you every day.`;
}

loadQuestion();
