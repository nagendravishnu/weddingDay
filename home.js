// Together timer
const startDate = new Date("2018-02-14T00:00:00");

setInterval(() => {
    const now = new Date();
    let diff = Math.floor((now - startDate) / 1000);

    const d = Math.floor(diff / 86400);
    diff %= 86400;
    const h = Math.floor(diff / 3600);
    diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = diff % 60;

    document.getElementById("togetherTimer").textContent =
        `${d} Days ${h} Hours ${m} Minutes ${s} Seconds`;
}, 1000);

let time = 30;
let timer;
let attempts = 0;

function startVerification() {
    document.getElementById("startBox").classList.add("hidden");
    document.getElementById("verifyBox").classList.remove("hidden");

    timer = setInterval(() => {
        time--;
        document.getElementById("verifyTimer").textContent = time + "s";
        if (time <= 0) location.reload();
    }, 1000);
}

function togglePassword() {
    const input = document.getElementById("answer");
    input.type = input.type === "password" ? "text" : "password";
}

function checkAnswer() {
    attempts++;
    const val = document.getElementById("answer").value;

    if (val === "blackey+0706997") {
        clearInterval(timer);
        document.getElementById("verifyBox").classList.add("hidden");
        document.getElementById("successBox").classList.remove("hidden");
        return;
    }

    if (attempts === 1)
        document.getElementById("hintBtn").classList.remove("hidden");

    if (attempts >= 3)
        document.getElementById("callBtn").classList.remove("hidden");
}

function showHint() {
    document.getElementById("hintText").textContent = "⬛(-k) 🔑 🎂";
}
