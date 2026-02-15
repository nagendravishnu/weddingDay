// CHANGE THIS DATE
const startDate = new Date("2022-10-16T00:00:00");

function updateTogetherTimer() {
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  document.getElementById("together-timer").textContent =
    `${days} Days ${hours % 24} Hours ${minutes % 60} Minutes ${seconds % 60} Seconds`;
}

setInterval(updateTogetherTimer, 1000);
updateTogetherTimer();
