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
let answeredQuestions = 0;

const fishingOverlay = document.getElementById("fishingOverlay");
const fishingLineWrap = document.getElementById("fishingLineWrap");
const fishingGirl = document.getElementById("fishingGirl");
const fishingProgress = document.getElementById("fishingProgress");

function getTotalQuestions() {
    return textQuestions.length + photoQuestions.length;
}

function updateFishingTheme() {
    if (!fishingOverlay || !fishingLineWrap || !fishingGirl || !fishingProgress) return;

    const totalQuestions = getTotalQuestions();
    const progress = Math.max(0, Math.min(1, answeredQuestions / totalQuestions));
    const lineHeight = fishingLineWrap.clientHeight;
    const girlHeight = fishingGirl.offsetHeight || 34;
    const maxClimb = Math.max(0, lineHeight - girlHeight - 8);
    const currentBottom = Math.round(progress * maxClimb);

    fishingGirl.style.bottom = currentBottom + "px";
    fishingProgress.style.bottom = currentBottom + "px";
    fishingProgress.textContent = Math.round(progress * 100) + "% close";
}

function showFishingTheme() {
    if (!fishingOverlay) return;
    fishingOverlay.classList.remove("hidden");
    updateFishingTheme();
}

function hideFishingTheme() {
    if (!fishingOverlay) return;
    fishingOverlay.classList.add("hidden");
}

window.addEventListener("resize", updateFishingTheme);

document.getElementById("accept").onchange = e =>
    document.getElementById("startQuiz").disabled = !e.target.checked;

document.getElementById("startQuiz").onclick = () => {
    isPhotoQuiz = false;
    index = 0;
    score = 0;
    answeredQuestions = 0;
    document.getElementById("rulesBox").classList.add("hidden");
    document.getElementById("quizBox").classList.remove("hidden");
    showFishingTheme();
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
    updateFishingTheme();
    
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
    if (answeredQuestions < getTotalQuestions()) answeredQuestions++;
    index++;
    loadQuestion();
}

function showPhotoTransition() {
    clearInterval(timer);
    hideFishingTheme();
    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("photoTransitionBox").classList.remove("hidden");
}

function startPhotoQuiz() {
    isPhotoQuiz = true;
    index = 0;
    document.getElementById("photoTransitionBox").classList.add("hidden");
    document.getElementById("photoQuizBox").classList.remove("hidden");
    showFishingTheme();
    loadQuestion();
}

function endQuiz() {
    clearInterval(timer);
    hideFishingTheme();
    document.getElementById("photoQuizBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");
    
    const totalQuestions = textQuestions.length + photoQuestions.length;
    const maxScore = totalQuestions * 5;
    const percentage = Math.round((score / maxScore) * 100);
    
    document.getElementById("finalScore").textContent = score + " / " + maxScore;
    document.getElementById("scorePercentage").textContent = percentage + "%";
    
    let message = "";
    if (percentage >= 90) message = "Outstanding! You know us so well 🌟";
    else if (percentage >= 80) message = "Excellent! You're amazing 💫";
    else if (percentage >= 70) message = "Great job! You did it! 🎉";
    else if (percentage >= 50) message = "Good effort! Better luck next time 💪";
    else message = "Keep trying! You'll do better 📚";
    
    document.getElementById("resultMessage").textContent = message;
    
    if (percentage >= 70) {
        document.getElementById("passwordSection").classList.remove("hidden");
        document.getElementById("passwordField").value = "Qsg7889934%^@^**";
        document.getElementById("timelineLink").classList.remove("hidden");
    }
}

function copyPassword() {
    const passwordField = document.getElementById("passwordField");
    passwordField.select();
    document.execCommand("copy");
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "✅ Copied!";
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}
