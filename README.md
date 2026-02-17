# WeddingDay Interactive Website

## Overview
This repository contains a small multi-page static website built with HTML, CSS and vanilla JavaScript. It was created as an interactive, personalized site for a couple's anniversary celebration. The site includes quizzes, a timeline, a picture puzzle, and a password-gated baby name generator.

The README documents what each page does, how the flows work, where important files live, how to run and test locally, deployment notes, and troubleshooting tips. If you open this README a year later, reading it should give you the necessary context to maintain, update, or re-deploy the site.

---

## High-level Features
- Home / verification flow: simple personality/knowledge verification before revealing site navigation.
- Quiz: 10 questions including five photo-based questions; shows final score and a password reveal for high scorers.
- Timeline: horizontally scrolling timeline of events (password gated in some versions).
- Picture Play: an image-splitting puzzle where users drag pieces to the canvas grid; supports multiple difficulty levels, shuffle, reset and solve helper.
- Baby Name Generator: password-gated; choose Boy or Girl, shows boy names sequentially (circular) and girl names randomly (includes Tamil names). 2s 'thinking' delay on suggestions.

---

## Passwords and Gating
- The single shared password used for gated pages (Timeline, Picture Play, Baby Name) is:

  Qsg7889934%^@^**

- The Home verification uses a different secret answer format. The expected answer (for the current code) is the dog name + birthday string: `blackey06071997`.

Note: These secrets are stored client-side in JS. This is appropriate for this static personal site but not for anything requiring real security.

---

## Page-by-page Guide

### index.html (Home)
- Files: `index.html`, `home.js`.
- Flow:
  - Start button shows a 30s verification box asking for a combined secret.
  - Correct answer reveals `successBox` with navigation links to other pages.
  - The photos button was removed; there are direct links now to Quiz, Timeline, Baby Name, and Picture Play.

### quiz.html
- Files: `quiz.html`, `quiz.js`, `quiz.css` (if present), or global `style.css`.
- Flow:
  - 10-question quiz with the last five using image-based choices.
  - Final results present a score percentage. If the score >= 70%, a secret or reward may be revealed (configured in `quiz.js`).

### timeline.html
- Files: `timeline.html`, `timeline.js`, `style.css`.
- Flow:
  - Displays a horizontal timeline of shared events.
  - Uses CSS scroll snapping / horizontal layout. Some parts are gated behind the shared password.

### pictureplay.html (Picture Play)
- Files: `pictureplay.html`, `pictureplay.js`, `style.css`, and images in `images/` (e.g., `pictureplay1.jpg`).
- Flow:
  - Password gate — user must enter the shared password to start.
  - Choose difficulty (grid size: e.g., 4x4, 5x5, etc.).
  - Canvas displays a preview grid; pieces are created as draggable DOM elements placed below the canvas.
  - Drag a piece onto the canvas — it snaps to the nearest grid cell. Each cell accepts only one piece.
  - Reset returns all pieces to the bottom area and reshuffles them (Fisher–Yates).
  - Double-click a placed piece to return it to the bottom area.

Implementation notes:
- The puzzle uses a canvas for grid visuals and DOM elements for the draggable pieces. Care has been taken to convert coordinates between the displayed canvas size and its internal pixel buffer.

### babyname.html (Baby Name Generator)
- Files: `babyname.html`, `babyname.js`, `style.css`.
- Flow:
  - Password-gated with the shared password above.
  - After unlocking, choose `Boy` (names are delivered sequentially in a circular list) or `Girl` (names chosen randomly; list includes modern Indian and Tamil names).
  - Press `Next` to reveal a name after a 2-second "Thinking..." animation. Long names expand the display box so they are readable.

---

## File Map (important files)
- `index.html` — Home page and verification flow
- `home.js` — Home page logic (timer, verification)
- `quiz.html`, `quiz.js` — Quiz UI and logic
- `timeline.html`, `timeline.js` — Timeline view and logic
- `pictureplay.html`, `pictureplay.js` — Picture Play puzzle UI + logic
- `babyname.html`, `babyname.js` — Baby Name generator UI + logic
- `style.css` — Global styles used by pages
- `images/` — Image assets used by the quiz and picture play

---

## How to run locally
Because this is a static site, you can open the HTML files directly in your browser. For best results (avoiding CORS issues and ensuring consistent behavior of relative asset loading), serve the folder with a tiny static server.

Quick options:

- Python 3 built-in server (from repository root):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/` in your browser.

- Node (http-server) — install once then run:

```bash
npm install -g http-server
http-server -p 8000
```

---

## Deploying
This project is static and can be deployed to GitHub Pages, Netlify, Vercel, or any static host.

- Netlify: drag-and-drop the site folder or connect the GitHub repository. Set publish directory to the repository root.
- GitHub Pages: push to a repository and enable Pages from the `main` branch (or `gh-pages`).

---

## Testing and Debugging
- Open the browser DevTools (F12) and check the Console for JS errors. The site stores logic in separate `.js` files; syntax errors will prevent event handlers from attaching.
- Common issues:
  - `ReferenceError: foo is not defined` — ensure the corresponding `.js` is included and that functions are attached to `window` if referenced by inline `onclick` attributes.
  - Puzzle misalignment — caused by canvas CSS sizing vs internal pixel buffer. The code computes a display scale to convert coordinates; if you change CSS sizes, test dragging and snapping.
  - Images not showing — ensure images in `images/` are present and referenced by correct filenames.

Helpful debug steps:
- Reload, open Console, perform the failing action, and paste error text here.
- For Picture Play, log drop coordinates and cell indices (the script already computes these in the `positionPieceOnCanvas` logic). If pieces don't snap correctly, paste those logs.

---

## Conventions and Notes for Future Maintainers
- Keep inline `onclick` usage minimal. Many handlers are exposed on `window` to support existing inline attributes; if you refactor to add `addEventListener` bindings, remove inline attributes for clarity.
- Passwords are client-side constants. Treat them as part of the UI, not secure secrets.
- Styling is centralized in `style.css`. To change the theme, edit gradients and color variables there.
- The site uses plain JS (no bundler). If you plan to add new tooling, consider introducing a small build step (Parcel/Vite) and move scripts to modules.

---

## Known Issues and TODO
- Manual cross-device testing recommended: picture puzzle drag/drop should be tested on touch devices.
- UX polish: add animations for name reveal, puzzle completion celebration, and better responsive behavior for very small screens.
- Consider removing inline `onclick` handlers and binding events in JS to make the codebase cleaner.

---

## Quick Troubleshooting Checklist
1. No JS behavior: open Console, check for syntax errors in the file referenced (e.g., `babyname.js`).
2. Password not working: verify you used the correct password (see above). Check for stray whitespace.
3. Images missing: confirm file names in `images/` and refresh cache.
4. Puzzle misplacement: check computed `displayCellWidth` / `displayCellHeight` in `pictureplay.js` and compare to actual DOM sizes.

---

## Credits
- Built as a private interactive site for a couple's anniversary. Helper: automated assistant edits and iterative debugging.

---

If you want, I can also:
- Add a short developer guide section with common console commands, test commands, and an automated checklist for release.
- Create a minimal `package.json` and a `start` script using `http-server`.


