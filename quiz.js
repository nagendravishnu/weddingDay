const SCORE_MAP = {
    green: 5,
    orange: 3,
    blue: 1,
    red: 0
};

const questions = [
    {
        q: "When did this start? It's not a trick question but you have to guess hard",
        a: [
            { t: "2018", c: "green" },
            { t: "2022", c: "blue" },
            { t: "1997", c: "orange" },
            { t: "2025", c: "red" }
        ]
    },
    {
        q: "I know you joined Infosys on Dec 9, can you guess when did I join TCS?",
        a: [
            { t: "Jan 2", c: "red" },
            { t: "Jan 6", c: "green" },
            { t: "Jan 8", c: "red" },
            { t: "Jan 10", c: "red" }
        ]
    },
    {
        q: "What's the name of my grandmother?",
        a: [
            { t: "Chellathal", c: "red" },
            { t: "Ponnamal", c: "green" },
            { t: "Both a & b", c: "red" },
            { t: "Neither a or b", c: "red" }
        ]
    },
    {
        q: "When does my driving license expire? You should know this 🤞",
        a: [
            { t: "2035", c: "blue" },
            { t: "2036", c: "orange" },
            { t: "2037", c: "green" },
            { t: "2038", c: "red" }
        ]
    },
    {
        q: "What does my mobile password add upto?",
        a: [
            { t: "15", c: "orange" },
            { t: "14", c: "red" },
            { t: "16", c: "green" },
            { t: "17", c: "blue" }
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
        endQuiz();
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
            score += SCORE_MAP[opt.c];

            document.getElementById("score").textContent = "Score: " + score;
            setTimeout(nextQuestion, 900);
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

function endQuiz() {
    clearInterval(timer);
    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");
    document.getElementById("finalScore").textContent = score;
}
