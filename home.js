// Together timer
const startDate = new Date("2022-10-16T00:00:00");
const VERIFIED_KEY = "wd_home_verified";
const VERIFIED_AT_KEY = "wd_home_verified_at";
const RETURN_KEY = "wd_after_verify";
const VERIFICATION_MAX_AGE_MS = 30 * 60 * 1000; // 30 minutes

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

function isHomeVerified() {
    try {
        const verified = sessionStorage.getItem(VERIFIED_KEY) === "1";
        const verifiedAt = Number(sessionStorage.getItem(VERIFIED_AT_KEY));

        if (!verified || !Number.isFinite(verifiedAt)) {
            sessionStorage.removeItem(VERIFIED_KEY);
            sessionStorage.removeItem(VERIFIED_AT_KEY);
            return false;
        }

        const isExpired = Date.now() - verifiedAt > VERIFICATION_MAX_AGE_MS;
        if (isExpired) {
            sessionStorage.removeItem(VERIFIED_KEY);
            sessionStorage.removeItem(VERIFIED_AT_KEY);
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
}

function startVerification() {
    const verifyBox = document.getElementById("verifyBox");
    if (!verifyBox.classList.contains("hidden")) return;

    document.getElementById("startBox").classList.add("hidden");
    verifyBox.classList.remove("hidden");
    time = 30;
    document.getElementById("verifyTimer").textContent = time + "s";
    clearInterval(timer);
    const answerInput = document.getElementById("answer");
    if (answerInput) answerInput.focus();

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

    if (val === "blackey06071997") {
        clearInterval(timer);

        try {
            sessionStorage.setItem(VERIFIED_KEY, "1");
            sessionStorage.setItem(VERIFIED_AT_KEY, String(Date.now()));
        } catch (e) {
            // Ignore storage issues and continue the flow.
        }

        let returnPage = "";
        try {
            returnPage = sessionStorage.getItem(RETURN_KEY) || "";
            if (returnPage) sessionStorage.removeItem(RETURN_KEY);
        } catch (e) {
            returnPage = "";
        }

        const normalizedReturn = returnPage.toLowerCase();
        if (
            returnPage &&
            normalizedReturn !== "index.html" &&
            normalizedReturn !== "/index.html" &&
            normalizedReturn !== "/"
        ) {
            window.location.href = returnPage;
            return;
        }

        document.getElementById("verifyBox").classList.add("hidden");
        document.getElementById("successBox").classList.remove("hidden");
        return;
    }

    if (attempts === 1)
        document.getElementById("hintBtn").classList.remove("hidden");

    if (attempts >= 3)
        document.getElementById("callBtn").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".header-nav a");
    navLinks.forEach((link) => {
        const href = (link.getAttribute("href") || "").toLowerCase();
        if (!href || href === "index.html") return;

        link.addEventListener("click", (event) => {
            if (isHomeVerified()) return;
            event.preventDefault();
            startVerification();
        });
    });
});

function showHint() {
    document.getElementById("hintText").textContent = "⬛(-k) 🔑 🎂";
}
