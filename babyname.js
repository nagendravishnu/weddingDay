// Baby name generator script (clean global definitions)
const CORRECT_PASSWORD = "Qsg7889934%^@^**";

const boyNames = [
    "Sachin Tendulkar",
    "Ilayathalapathy Vijay",
    "Naruto",
    "Vishnu Jr",
    "Goku"
];

const girlNames = [
    "Aadhya",
    "Ira",
    "Myra",
    "Anaya",
    "Saanvi",
    "Diya",
    "Kiara",
    "Aarohi",
    "Ishita",
    "Veda",
    // Tamil / South-Indian modern names
    "Thenmozhi",
    "Thamarai",
    "Iniya",
    "Nila",
    "Poonguzhal",
    "Vennila",
    "Tamizhini",
    "Malar",
    "Kavitha",
    "Kalpana"
];

let selectedGender = null;
let boyIndex = 0; // sequential index for boys (circular)

function toggleBabynamePassword() {
    const input = document.getElementById("babynamePassword");
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
}

function verifyBabynamePassword() {
    const pwd = (document.getElementById("babynamePassword").value || "").trim();
    const err = document.getElementById("babyPasswordError");
    if (!err) return;
    if (pwd === CORRECT_PASSWORD) {
        err.style.display = "none";
        const pv = document.getElementById("passwordVerifyBox");
        const gb = document.getElementById("generatorBox");
        if (pv) pv.classList.add("hidden");
        if (gb) gb.classList.remove("hidden");
    } else {
        err.textContent = "❌ Incorrect password";
        err.style.display = "block";
    }
}

function selectGender(g) {
    selectedGender = g;
    const nameArea = document.getElementById("nameArea");
    const display = document.getElementById("nameDisplay");
    const indexEl = document.getElementById("nameIndex");
    if (nameArea) nameArea.classList.remove("hidden");
    if (display) display.textContent = "";
    if (indexEl) indexEl.textContent = "";
    if (display) {
        if (g === 'boy') display.classList.add('circle');
        else display.classList.remove('circle');
    }
}

function getNextBoyName() {
    const name = boyNames[boyIndex];
    const idx = boyIndex;
    boyIndex = (boyIndex + 1) % boyNames.length;
    return { name, idx };
}

function getRandomGirlName() {
    return girlNames[Math.floor(Math.random() * girlNames.length)];
}

function nextName() {
    if (!selectedGender) return;
    const thinking = document.getElementById("thinking");
    const display = document.getElementById("nameDisplay");
    const indexEl = document.getElementById("nameIndex");
    if (thinking) thinking.classList.remove("hidden");
    if (display) display.textContent = "";
    if (indexEl) indexEl.textContent = "";
    setTimeout(() => {
        if (thinking) thinking.classList.add("hidden");
        if (!display) return;
        if (selectedGender === 'boy') {
            const res = getNextBoyName();
            display.textContent = res.name;
            if (indexEl) indexEl.textContent = `${res.idx + 1} / ${boyNames.length}`;
            const long = res.name.length > 18;
            if (long) {
                display.classList.add('large');
                display.style.width = '320px';
                display.style.height = 'auto';
                display.style.fontSize = '18px';
                display.style.padding = '18px';
                display.style.borderRadius = '12px';
                display.classList.remove('circle');
            } else {
                display.classList.remove('large');
                display.classList.add('circle');
                display.style.width = '';
                display.style.height = '';
                display.style.fontSize = '';
                display.style.padding = '';
                display.style.borderRadius = '';
            }
        } else {
            const name = getRandomGirlName();
            display.textContent = name;
            if (indexEl) indexEl.textContent = '';
            display.classList.remove('circle', 'large');
            display.style.width = '';
            display.style.height = '';
            display.style.fontSize = '';
            display.style.padding = '';
            display.style.borderRadius = '';
        }
    }, 2000);
}

// Expose functions for inline onclick handlers
window.verifyBabynamePassword = verifyBabynamePassword;
window.toggleBabynamePassword = toggleBabynamePassword;
window.selectGender = selectGender;
window.nextName = nextName;

// Safety: bind unlock button in case inline handler fails
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('babyUnlockBtn');
    if (btn) btn.addEventListener('click', verifyBabynamePassword);
});
