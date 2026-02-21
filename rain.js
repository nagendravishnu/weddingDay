// Shared rain theme controller for all pages.
(function () {
    if (window.__wdRainThemeInitialized) return;
    window.__wdRainThemeInitialized = true;

    const STORAGE_KEY = "wd_rain_theme_enabled";
    const DEFAULT_ENABLED = true;

    function readEnabled() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw === null) return DEFAULT_ENABLED;
            return raw === "1";
        } catch (e) {
            return DEFAULT_ENABLED;
        }
    }

    function writeEnabled(enabled) {
        try {
            localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
        } catch (e) {
            // Ignore storage failures.
        }
    }

    let enabled = readEnabled();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let drops = [];
    let rafId = 0;
    let last = performance.now();

    const canvas = document.createElement("canvas");
    canvas.id = "rainCanvasInternal";
    canvas.className = "rain-canvas";
    document.documentElement.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "rainToggleBtn";
    toggleBtn.className = "rain-toggle-btn";
    document.body.appendChild(toggleBtn);

    function syncBodyTheme() {
        document.body.classList.toggle("night", enabled);
    }

    function updateToggleButton() {
        toggleBtn.dataset.rainEnabled = enabled ? "1" : "0";
        toggleBtn.textContent = enabled ? "Rain On" : "Rain Off";
        toggleBtn.setAttribute("aria-pressed", enabled ? "true" : "false");
        toggleBtn.title = enabled ? "Disable rain theme" : "Enable rain theme";
    }

    function resize() {
        if (!enabled) return;
        dpr = Math.max(1, window.devicePixelRatio || 1);
        width = Math.ceil(window.innerWidth);
        height = Math.ceil(window.innerHeight);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initDrops();
    }

    function initDrops() {
        drops = [];
        const base = Math.max(40, Math.min(180, Math.floor(width / 6)));
        for (let i = 0; i < base; i++) {
            drops.push(createDrop(true));
        }
    }

    function createDrop(initial) {
        const x = Math.random() * width;
        const y = initial ? Math.random() * height : -10 - Math.random() * 100;
        const len = 8 + Math.random() * 18;
        const speed = 150 + Math.random() * 300;
        const alpha = 0.08 + Math.random() * 0.25;
        const thickness = 1 + Math.random() * 1.5;
        return { x, y, len, speed, alpha, thickness };
    }

    function render(now) {
        if (!enabled) {
            rafId = 0;
            return;
        }

        const dt = (now - last) / 1000;
        last = now;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < drops.length; i++) {
            const d = drops[i];
            d.y += d.speed * dt;
            if (d.y - d.len > height) {
                drops[i] = createDrop(false);
                continue;
            }
            ctx.beginPath();
            const alpha = Math.min(0.95, d.alpha * 1.3);
            ctx.strokeStyle = "rgba(200,230,255," + alpha + ")";
            ctx.lineWidth = d.thickness;
            ctx.moveTo(d.x, d.y - d.len);
            ctx.lineTo(d.x + 0.6, d.y);
            ctx.stroke();
        }

        rafId = requestAnimationFrame(render);
    }

    function startRain() {
        canvas.style.display = "block";
        resize();
        last = performance.now();
        if (!rafId) rafId = requestAnimationFrame(render);
    }

    function stopRain() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
    }

    function setEnabled(nextEnabled) {
        enabled = !!nextEnabled;
        writeEnabled(enabled);
        syncBodyTheme();
        updateToggleButton();
        if (enabled) {
            startRain();
        } else {
            stopRain();
        }
    }

    toggleBtn.addEventListener("click", function () {
        setEnabled(!enabled);
    });

    document.addEventListener("visibilitychange", function () {
        last = performance.now();
    });

    window.addEventListener("resize", function () {
        if (enabled) resize();
    });

    syncBodyTheme();
    updateToggleButton();
    if (enabled) {
        startRain();
    } else {
        stopRain();
    }
})();
