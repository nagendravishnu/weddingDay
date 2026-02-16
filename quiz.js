const SCORE_MAP = {
    green: 5,
    orange: 3,
    blue: 1,
    red: 0
};

const textQuestions = [
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

const photoQuestions = [
    {
        q: "When and where did we take this photo?",
        img: "images/quiz6.jpg",
        a: [
            { t: "Chennai - Dec 10, 2022", c: "blue" },
            { t: "Coimbatore - sept 24, 2022", c: "orange" },
            { t: "Chennai - Jan 4, 2023", c: "red" },
            { t: "Coimbatore - Oct 1, 2022", c: "green" }
        ]
    },
    {
        q: "That was an exciting day, we went for a movie! Can you guess which one?",
        img: "images/quiz7.jpg",
        a: [
            { t: "Guardians of Galaxy Vol3", c: "orange" },
            { t: "Love Today", c: "red" },
            { t: "Ant Man 3", c: "blue" },
            { t: "Avatar 2", c: "green" }
        ]
    },
    {
        q: "What does this picture present for you?",
        img: "images/quiz8.jpg",
        a: [
            { t: "After First Kiss", c: "green" },
            { t: "After First Fight", c: "red" },
            { t: "After First Date", c: "orange" },
            { t: "After Speaking 8hrs straight", c: "blue" }
        ]
    },
    {
        q: "What does this picture present for you?",
        img: "images/quiz9.jpg",
        a: [
            { t: "After First Kiss", c: "red" },
            { t: "After First Fight", c: "green" },
            { t: "After First Date", c: "orange" },
            { t: "After Speaking 8hrs straight", c: "blue" }
        ]
    },
    {
        q: "Where does this photo was Taken",
        img: "images/quiz10.jpg",
        a: [
            { t: "Chennai", c: "blue" },
            { t: "Coimbatore", c: "orange" },
            { t: "Chittur", c: "red" },
            { t: "Palakkad", c: "green" }
        ]
    }
];

let isPhotoQuiz = false;
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
    const currentQuestions = isPhotoQuiz ? photoQuestions : textQuestions;
    
    if (index >= currentQuestions.length) {
        if (!isPhotoQuiz) {
            showPhotoTransition();
            return;
        } else {
            endQuiz();
            return;
        }
    }

    locked = false;
    time = 20;

    const timerEl = isPhotoQuiz ? "photoTimer" : "timer";
    const scoreEl = isPhotoQuiz ? "photoScore" : "score";
    const optionsEl = isPhotoQuiz ? "photoOptions" : "options";

    document.getElementById(timerEl).textContent = time + "s";
    document.getElementById(scoreEl).textContent = "Score: " + score;
    
    const currQuestion = currentQuestions[index];
    
    if (isPhotoQuiz) {
        document.getElementById("photoQuestion").textContent = currQuestion.q;
        document.getElementById("photoImage").src = currQuestion.img;
    } else {
        document.getElementById("question").textContent = currQuestion.q;
    }

    const options = document.getElementById(optionsEl);
    options.innerHTML = "";

    currQuestion.a.forEach(opt => {
        const div = document.createElement("div");
        div.className = "option-big";
        div.textContent = opt.t;

        div.onclick = () => {
            if (locked) return;
            locked = true;

            div.classList.add(opt.c);
            score += SCORE_MAP[opt.c];

            document.getElementById(scoreEl).textContent = "Score: " + score;
            setTimeout(nextQuestion, 900);
        };

        options.appendChild(div);
    });

    startTimer(timerEl);
}

function startTimer(timerEl = "timer") {
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        document.getElementById(timerEl).textContent = time + "s";
        if (time <= 0) nextQuestion();
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    index++;
    loadQuestion();
}

function showPhotoTransition() {
    clearInterval(timer);
    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("photoTransitionBox").classList.remove("hidden");
}

function startPhotoQuiz() {
    isPhotoQuiz = true;
    index = 0;
    document.getElementById("photoTransitionBox").classList.add("hidden");
    document.getElementById("photoQuizBox").classList.remove("hidden");
    loadQuestion();
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("photoQuizBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");
    document.getElementById("finalScore").textContent = score;
}
