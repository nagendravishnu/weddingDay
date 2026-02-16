const CORRECT_PASSWORD = "Qsg7889934%^@^**";

const timelineData = [
    {
        date: "1997",
        title: "We Were Born",
        description: "Two souls came into this world. Destiny set in motion 👶",
        emoji: "👶"
    },
    {
        date: "2018",
        title: "We Become Friends",
        description: "Getting to know you... and realizing how special you are 👫",
        emoji: "👫"
    },
    {
        date: "2019",
        title: "First Meeting Outside",
        description: "We meet up outside for the first time. I was nervous but it was perfect 😊",
        emoji: "😊"
    },
    {
        date: "2020",
        title: "You Visited Chennai",
        description: "You visited me in Chennai. That was so special and unforgettable 🏖️",
        emoji: "🏖️"
    },
    {
        date: "2021",
        title: "Ultimate Rejection",
        description: "A bump in our journey, but we overcame it together 🤦‍♂️",
        emoji: "🤦‍♂️"
    },
    {
        date: "2022",
        title: "A Year of Magic",
        description: "This year was special for so many reasons and you know it ✨",
        emoji: "✨"
    },
    {
        date: "2023",
        title: "Closer Than Ever",
        description: "We were closer than ever, and love kept growing 💑",
        emoji: "💑"
    },
    {
        date: "2024",
        title: "The Proposal",
        description: "How's the engagement ring looking? Forever started here 💍",
        emoji: "💍"
    },
    {
        date: "2025",
        title: "We Got Married!",
        description: "The happiest day of our lives. I do, you do, we do forever 💒",
        emoji: "💒"
    },
    {
        date: "2026",
        title: "We Are Expecting",
        description: "The next chapter begins. Our love story expanding with new life coming 🤰",
        emoji: "🤰"
    }
];

let isScrolling = false;
let startX = 0;
let scrollLeft = 0;

function verifyTimelinePassword() {
    const password = document.getElementById("timelinePassword").value;
    const errorMsg = document.getElementById("passwordError");
    
    if (password === CORRECT_PASSWORD) {
        document.getElementById("passwordVerifyBox").classList.add("hidden");
        document.getElementById("timelineSection").classList.remove("hidden");
        initializeTimeline();
    } else {
        errorMsg.textContent = "❌ Incorrect password. Try again!";
        errorMsg.style.display = "block";
    }
}

function toggleTimelinePasswordView() {
    const input = document.getElementById("timelinePassword");
    input.type = input.type === "password" ? "text" : "password";
}

function initializeTimeline() {
    const container = document.getElementById("timelineContainer");
    container.innerHTML = "";
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement("div");
        timelineItem.className = "timeline-item";
        timelineItem.style.animationDelay = `${index * 0.1}s`;
        
        timelineItem.innerHTML = `
            <div class="timeline-card">
                <div class="timeline-emoji">${item.emoji}</div>
                <div class="timeline-date">${item.date}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-description">${item.description}</p>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
    
    setupScrolling();
}

function setupScrolling() {
    const container = document.getElementById("timelineContainer");
    
    // Mouse drag scrolling
    container.addEventListener("mousedown", (e) => {
        isScrolling = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = "grabbing";
    });
    
    container.addEventListener("mouseleave", () => {
        isScrolling = false;
        container.style.cursor = "grab";
    });
    
    container.addEventListener("mouseup", () => {
        isScrolling = false;
        container.style.cursor = "grab";
    });
    
    container.addEventListener("mousemove", (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });
    
    // Mousewheel scrolling
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });
    
    // Arrow keys scrolling
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            container.scrollLeft -= 300;
        } else if (e.key === "ArrowRight") {
            container.scrollLeft += 300;
        }
    });
    
    // Set initial cursor
    container.style.cursor = "grab";
}

// Allow Enter key to submit password
document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("timelinePassword");
    if (passwordInput) {
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                verifyTimelinePassword();
            }
        });
    }
});
