const questions = [
    {
        q: "When did this start?",
        a: [
            { t: "2018", s: 5, c: "green" },
            { t: "2022", s: 3, c: "orange" },
            { t: "1997", s: 1, c: "blue" },
            { t: "2025", s: 0, c: "red" }
        ]
    },
    {
        q: "Sample question",
        a: [
            { t: "a", s: 5, c: "green" },
            { t: "b", s: 3, c: "orange" },
            { t: "c", s: 1, c: "blue" },
            { t: "d", s: 0, c: "red" }
        ]
    }
];

let index = 0;
let score = 0;
let time = 20;
let timer;
let locked = false;

document.getElementById("accept").onchange = e =>
    document.getElementById("startQuiz").disabled = !e.target.checked;

document.getElementById("startQuiz").onclick = () => {
    document.getElementById("rulesBox").classList.add("hidden");
    document.getElementById("quizBox").classList.remove("hidden");
    loadQuestion();
};

function loadQuestion() {
    if (index >= questions.length) {
        alert(`Quiz done ❤️ Final score: ${score}`);
        return;
    }

    locked = false;
    time = 20;
    document.getElementById("timer").textContent = time + "s";
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("question").textContent = questions[index].q;

    const options = document.getElementById("options");
    options.innerHTML = "";

    questions[index].a.forEach(opt => {
        const div = document.createElement("div");
        div.className = "option-big";
        div.textContent = opt.t;

        div.onclick = () => {
            if (locked) return;
            locked = true;
            div.classList.add(opt.c);
            score += opt.s;
            document.getElementById("score").textContent = "Score: " + score;
            setTimeout(nextQuestion, 800);
        };

        options.appendChild(div);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").textContent = time + "s";
        if (time <= 0) nextQuestion();
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    index++;
    loadQuestion();
}
