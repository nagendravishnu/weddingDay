// Lightweight canvas rain animation for the Home page
(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'rainCanvasInternal';
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.documentElement.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let drops = [];
    let width = 0, height = 0, dpr = 1;

    function resize() {
        dpr = Math.max(1, window.devicePixelRatio || 1);
        width = Math.ceil(window.innerWidth);
        height = Math.ceil(window.innerHeight);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initDrops();
    }

    function initDrops() {
        drops = [];
        // Density relative to width (keep reasonable on small screens)
        const base = Math.max(40, Math.min(180, Math.floor(width / 6)));
        for (let i = 0; i < base; i++) {
            drops.push(createDrop(true));
        }
    }

    function createDrop(initial) {
        const x = Math.random() * width;
        const y = initial ? Math.random() * height : -10 - Math.random() * 100;
        const len = 8 + Math.random() * 18;
        const speed = 150 + Math.random() * 300; // pixels per second
        const alpha = 0.08 + Math.random() * 0.25;
        const thickness = 1 + Math.random() * 1.5;
        return { x, y, len, speed, alpha, thickness };
    }

    let last = performance.now();

    function step(now) {
        const dt = (now - last) / 1000; last = now;
        ctx.clearRect(0, 0, width, height);
        // subtle translucent overlay to blend with page background
        for (let i = 0; i < drops.length; i++) {
            const d = drops[i];
            d.y += d.speed * dt;
            if (d.y - d.len > height) {
                drops[i] = createDrop(false);
                continue;
            }
            ctx.beginPath();
            // slightly bluish and a bit brighter to show on dark backgrounds
            const alpha = Math.min(0.95, d.alpha * 1.3);
            ctx.strokeStyle = 'rgba(200,230,255,' + alpha + ')';
            ctx.lineWidth = d.thickness;
            ctx.moveTo(d.x, d.y - d.len);
            ctx.lineTo(d.x + 0.6, d.y);
            ctx.stroke();
        }

        requestAnimationFrame(step);
    }

    // small optimization: pause when page not visible
    document.addEventListener('visibilitychange', () => {
        last = performance.now();
    });

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(step);

})();
