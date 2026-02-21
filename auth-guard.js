// Blocks direct access to protected pages unless home verification is completed.
(function () {
    const VERIFIED_KEY = "wd_home_verified";
    const VERIFIED_AT_KEY = "wd_home_verified_at";
    const RETURN_KEY = "wd_after_verify";
    const VERIFICATION_MAX_AGE_MS = 30 * 60 * 1000; // 30 minutes
    const PROTECTED_ROUTES = new Set([
        "quiz",
        "timeline",
        "babyname",
        "pictureplay"
    ]);

    const path = (window.location.pathname || "").toLowerCase();
    const parts = path.split("/").filter(Boolean);
    const lastPart = parts.length ? parts[parts.length - 1] : "index.html";
    const currentRoute = lastPart.replace(/\.html$/, "");

    if (!PROTECTED_ROUTES.has(currentRoute)) return;

    let isVerified = false;
    try {
        const verified = window.sessionStorage.getItem(VERIFIED_KEY) === "1";
        const verifiedAt = Number(window.sessionStorage.getItem(VERIFIED_AT_KEY));

        if (verified && Number.isFinite(verifiedAt)) {
            const isExpired = Date.now() - verifiedAt > VERIFICATION_MAX_AGE_MS;
            if (!isExpired) {
                isVerified = true;
            } else {
                window.sessionStorage.removeItem(VERIFIED_KEY);
                window.sessionStorage.removeItem(VERIFIED_AT_KEY);
            }
        } else {
            window.sessionStorage.removeItem(VERIFIED_KEY);
            window.sessionStorage.removeItem(VERIFIED_AT_KEY);
        }
    } catch (e) {
        isVerified = false;
    }

    if (isVerified) return;

    try {
        const nextPage = window.location.pathname + window.location.search + window.location.hash;
        window.sessionStorage.setItem(RETURN_KEY, nextPage);
    } catch (e) {
        // Ignore storage errors and still redirect.
    }

    window.location.replace("index.html");
})();
