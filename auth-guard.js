// Blocks direct access to protected pages unless home verification is completed.
(function () {
    const VERIFIED_KEY = "wd_home_verified";
    const RETURN_KEY = "wd_after_verify";
    const PROTECTED_PAGES = new Set([
        "quiz.html",
        "timeline.html",
        "babyname.html",
        "pictureplay.html",
        "messages.html"
    ]);

    const currentPage = (window.location.pathname.split("/").pop() || "").toLowerCase();

    if (!PROTECTED_PAGES.has(currentPage)) return;

    let isVerified = false;
    try {
        isVerified = window.sessionStorage.getItem(VERIFIED_KEY) === "1";
    } catch (e) {
        isVerified = false;
    }

    if (isVerified) return;

    try {
        const nextPage = currentPage + window.location.search + window.location.hash;
        window.sessionStorage.setItem(RETURN_KEY, nextPage);
    } catch (e) {
        // Ignore storage errors and still redirect.
    }

    window.location.replace("index.html");
})();
