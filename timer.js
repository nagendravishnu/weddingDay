// 🔴 CHANGE THIS DATE 🔴
// Format: new Date("YYYY-MM-DDTHH:MM:SS")
const startDate = new Date("2022-10-17T00:00:00"); // <-- EDIT ME

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const displayHours = hours % 24;
  const displayMinutes = minutes % 60;
  const displaySeconds = seconds % 60;

  document.getElementById("timer").innerHTML =
    `${days} Days ${displayHours} Hours ${displayMinutes} Minutes ${displaySeconds} Seconds`;
}

setInterval(updateTimer, 1000);
updateTimer();
