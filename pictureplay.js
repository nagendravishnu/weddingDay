const CORRECT_PASSWORD = "Qsg7889934%^@^**";
const PICTURE_URL = "images/pictureplay1.jpg";

let currentDifficulty = 0;
let puzzlePieces = [];
let placedPieces = [];
let placementHistory = [];
let canvas;
let ctx;
let imageObj;
let draggedPiece = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Fisher-Yates shuffle utility
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function togglePicturePlayPassword() {
    const input = document.getElementById("pictureplayPassword");
    input.type = input.type === "password" ? "text" : "password";
}

function verifyPicturePlayPassword() {
    console.log("verifyPicturePlayPassword called");
    const password = (document.getElementById("pictureplayPassword").value || "").trim();
    const errorMsg = document.getElementById("passwordError");

    if (password === CORRECT_PASSWORD) {
        console.log("Password correct");
        errorMsg.style.display = "none";
        document.getElementById("passwordVerifyBox").classList.add("hidden");
        document.getElementById("difficultyBox").classList.remove("hidden");
    } else {
        console.log("Password incorrect", password);
        errorMsg.textContent = "❌ Incorrect password. Try again!";
        errorMsg.style.display = "block";
    }
}

class PuzzlePiece {
    constructor(x, y, width, height, index, canvas, imageObj) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = index;
        this.canvas = canvas;
        this.imageObj = imageObj;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isPlaced = false;
        this.element = null;
        this.correctX = x;      // Grid position X (which cell it belongs in)
        this.correctY = y;      // Grid position Y (which cell it belongs in)
        this.correctCol = null;
        this.correctRow = null;
        this.gridCol = 0;
        this.gridRow = 0;
        this.gridX = x;
        this.gridY = y;
    }

    draw(ctx) {
        if (!this.isPlaced) {
            ctx.drawImage(
                this.imageObj,
                this.correctX, this.correctY, this.width, this.height,
                this.x, this.y, this.width, this.height
            );
            ctx.strokeStyle = "#ff5f9e";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    createDOMElement() {
        const div = document.createElement("div");
        div.className = "puzzle-piece";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundImage = "url('" + PICTURE_URL + "')";
        div.style.backgroundPosition = "-" + this.correctX + "px -" + this.correctY + "px";
        div.style.backgroundSize = canvas.width + "px " + canvas.height + "px";
        
        // Make draggable from bottom area
        div.draggable = true;
        div.dataset.pieceIndex = this.index;
        
        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("pieceIndex", this.index);
        });
        
        div.addEventListener("dragend", (e) => {
            // After drag ends, keep draggable true if not locked
            if (!this.isPlaced) div.draggable = true;
        });

        // When user presses on a piece on the canvas, ensure it's draggable so it can be repositioned
        div.addEventListener("pointerdown", (e) => {
            if (!this.isPlaced) {
                div.draggable = true;
            }
        });

        // Double-click a piece on canvas to return it to the bottom pieces area
        div.addEventListener("dblclick", (e) => {
            if (div.parentElement && div.parentElement.id !== "puzzlePiecesArea") {
                returnPieceToTray(this);
            }
        });
        
        this.element = div;
        return div;
    }

    handleDragStart(e) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("pieceIndex", this.index);
    }

    handleDragEnd(e) {
    }
}

function startPuzzle(difficulty) {
    currentDifficulty = difficulty;
    document.getElementById("difficultyBox").classList.add("hidden");
    document.getElementById("puzzleSection").classList.remove("hidden");
    
    const diffText = {20: "Easy", 40: "Medium", 60: "Hard"}[difficulty];
    document.getElementById("puzzleTitle").textContent = `${diffText} - ${difficulty} Pieces`;
    document.getElementById("pieceCount").textContent = `Pieces: 0/${difficulty}`;
    
    initializePuzzle(difficulty);
}

function initializePuzzle(numPieces) {
    canvas = document.getElementById("puzzleCanvas");
    ctx = canvas.getContext("2d");
    
    imageObj = new Image();
    // Don't use crossOrigin for local files
    imageObj.onload = () => {
        console.log("Image loaded successfully:", PICTURE_URL);
        
        // Set canvas size
        canvas.width = Math.min(imageObj.width, 600);
        canvas.height = Math.min(imageObj.height, 400);
        
        // Display preview
        const previewDiv = document.getElementById("puzzlePreview");
        previewDiv.innerHTML = "";
        const previewImg = document.createElement("img");
        previewImg.src = PICTURE_URL;
        previewImg.style.maxWidth = "100%";
        previewImg.style.height = "auto";
        previewImg.style.borderRadius = "10px";
        previewDiv.appendChild(previewImg);
        
        // Scale image if needed
        const scaleX = canvas.width / imageObj.width;
        const scaleY = canvas.height / imageObj.height;
        
        createPuzzlePieces(numPieces, scaleX, scaleY);
        renderPuzzle();
    };
    
    imageObj.onerror = () => {
        console.error("Failed to load image:", PICTURE_URL);
        alert("Error loading image! Make sure pictureplay1.jpg exists in the images folder.");
        changeDifficulty();
    };
    
    imageObj.src = PICTURE_URL;
}

function createPuzzlePieces(numPieces, scaleX, scaleY) {
    puzzlePieces = [];
    placedPieces = [];
    placementHistory = [];
    hideCompletionMessage();
    
    // Calculate grid - determines number of cells
    const cols = Math.ceil(Math.sqrt(numPieces));
    const rows = Math.ceil(numPieces / cols);
    
    const pieceWidth = Math.floor(canvas.width / cols);
    const pieceHeight = Math.floor(canvas.height / rows);
    
    console.log("Creating pieces: " + numPieces + " pieces, Grid: " + cols + "x" + rows + ", Cell size: " + pieceWidth + "x" + pieceHeight);
    
    let index = 0;
    const piecesArea = document.getElementById("puzzlePiecesArea");
    piecesArea.innerHTML = "";
    const appendOrder = [];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (index >= numPieces) break;
            
            // Grid cell position (where piece should be placed)
            const cellX = col * pieceWidth;
            const cellY = row * pieceHeight;
            
            const piece = new PuzzlePiece(cellX, cellY, pieceWidth, pieceHeight, index, canvas, imageObj);
            piece.correctCol = col;
            piece.correctRow = row;
            piece.gridCol = null;
            piece.gridRow = null;
            piece.gridX = cellX;
            piece.gridY = cellY;
            puzzlePieces.push(piece);
            
            // create DOM element but don't append yet
            piece.createDOMElement();
            appendOrder.push(index);
            index++;
        }
    }

    // Shuffle the order so bottom pieces are randomized
    shuffleArray(appendOrder);
    for (const i of appendOrder) {
        piecesArea.appendChild(puzzlePieces[i].element);
    }
    
    // Store grid info for snap calculations
    // Compute displayed sizes (canvas may be styled/scaled in CSS)
    const canvasRect = canvas.getBoundingClientRect();
    const displayScaleX = canvasRect.width / canvas.width;
    const displayScaleY = canvasRect.height / canvas.height;

    window.puzzleGridInfo = {
        cols: cols,
        rows: rows,
        cellWidth: pieceWidth,           // internal canvas pixels
        cellHeight: pieceHeight,         // internal canvas pixels
        displayCellWidth: Math.floor(pieceWidth * displayScaleX),
        displayCellHeight: Math.floor(pieceHeight * displayScaleY),
        scaleX: displayScaleX,
        scaleY: displayScaleY,
        canvasRect: canvasRect
    };
    
    console.log("Pieces created: " + puzzlePieces.length);
    setupDragDrop();
    renderPuzzle();
    updateUndoButton();
}

function setupDragDrop() {
    const canvas = document.getElementById("puzzleCanvas");
    const canvasWrapper = document.querySelector(".puzzle-canvas-wrapper");
    
    // Canvas drag-over effect
    canvas.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    });
    
    canvasWrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    });
    // Allow drop on wrapper (pieces can be repositioned)
    canvasWrapper.addEventListener("drop", (e) => {
        e.preventDefault();
        
        // Get piece index from drag data
        const pieceIndex = parseInt(e.dataTransfer.getData("pieceIndex"));
        if (isNaN(pieceIndex)) return;
        
        const piece = puzzlePieces[pieceIndex];
        
        // Calculate wrapper position
        const wrapperRect = canvasWrapper.getBoundingClientRect();
        const canvas = document.getElementById("puzzleCanvas");
        const canvasRect = canvas.getBoundingClientRect();
        
        // Drop position relative to displayed canvas (raw client coords minus canvas top-left)
        let dropX = e.clientX - canvasRect.left;
        let dropY = e.clientY - canvasRect.top;
        
        // Constrain to displayed canvas bounds
        dropX = Math.max(0, Math.min(dropX, canvasRect.width - piece.width));
        dropY = Math.max(0, Math.min(dropY, canvasRect.height - piece.height));
        
        console.log("Drop at:", dropX, dropY, "- Piece", pieceIndex, "target:", piece.correctX, piece.correctY);

        positionPieceOnCanvas(pieceIndex, dropX, dropY);
    });

}

function positionPieceOnCanvas(pieceIndex, x, y) {
    const piece = puzzlePieces[pieceIndex];
    const canvasWrapper = document.querySelector(".puzzle-canvas-wrapper");
    const grid = window.puzzleGridInfo;
    
    if (!grid) return;
    
    // Compute latest canvasRect and wrapperRect to account for layout changes
    const canvas = document.getElementById("puzzleCanvas");
    const canvasRect = canvas.getBoundingClientRect();
    const wrapperRect = canvasWrapper.getBoundingClientRect();

    // x,y are displayed coordinates relative to canvas top-left. Use displayed cell sizes
    const cellCol = Math.floor(x / grid.displayCellWidth);
    const cellRow = Math.floor(y / grid.displayCellHeight);
    
    // Constrain to valid grid bounds
    const validCol = Math.max(0, Math.min(cellCol, grid.cols - 1));
    const validRow = Math.max(0, Math.min(cellRow, grid.rows - 1));
    
    // Compute displayed cell top-left (for DOM positioning) relative to canvas top-left
    const cellX = validCol * grid.displayCellWidth;
    const cellY = validRow * grid.displayCellHeight;
    
    console.log("Piece", pieceIndex, "- Dropped in cell:", validCol, validRow, "Position:", cellX, cellY);
    
    // Check if this cell is already occupied by a DIFFERENT piece (on the canvas)
    let cellOccupied = false;
    for (const p of puzzlePieces) {
        if (p.index !== pieceIndex) {
            const parentId = p.element && p.element.parentElement ? p.element.parentElement.id : null;
            const onCanvas = parentId && parentId !== "puzzlePiecesArea";
            if (onCanvas && p.gridCol === validCol && p.gridRow === validRow) {
                cellOccupied = true;
                console.log("✗ Cell already occupied by piece", p.index);
                break;
            }
        }
    }
    
    if (cellOccupied) {
        console.log("Cannot place piece - cell taken!");
        return;
    }
    
    // Move piece from bottom to canvas if not already there
    if (!piece.element.parentElement || piece.element.parentElement.id === "puzzlePiecesArea") {
        canvasWrapper.appendChild(piece.element);
        piece.element.style.position = "absolute";
    }
    
    // Because piece.element is positioned inside the wrapper, compute offset of canvas within wrapper
    const canvasOffsetX = canvasRect.left - wrapperRect.left;
    const canvasOffsetY = canvasRect.top - wrapperRect.top;

    // Position at grid cell (use displayed sizes) and account for canvas offset inside wrapper
    piece.element.style.left = (cellX + canvasOffsetX) + "px";
    piece.element.style.top = (cellY + canvasOffsetY) + "px";
    piece.element.style.width = grid.displayCellWidth + "px";
    piece.element.style.height = grid.displayCellHeight + "px";
    
    // Check against the piece's real target cell (not its current cell).
    const isCorrectCell = (validCol === piece.correctCol && validRow === piece.correctRow);

    // Update piece position tracking
    piece.gridCol = validCol;
    piece.gridRow = validRow;
    piece.gridX = cellX;
    piece.gridY = cellY;
    
    if (isCorrectCell && !piece.isPlaced) {
        console.log("✓ Piece", pieceIndex, "placed in CORRECT cell!", validCol, validRow);
        piece.isPlaced = true;
        if (!placedPieces.includes(pieceIndex)) {
            placedPieces.push(pieceIndex);
        }
        placementHistory.push(pieceIndex);
        
        piece.element.style.opacity = "1";
        piece.element.style.zIndex = "1000";
        piece.element.draggable = false;
        piece.element.style.boxShadow = "0 0 20px rgba(255, 95, 158, 0.5)";
        piece.element.style.backgroundColor = "rgba(255, 95, 158, 0.1)";
        
        updatePieceCount();
        renderPuzzle();
        
        if (isPuzzleComplete()) {
            celebratePuzzleComplete();
        } else {
            hideCompletionMessage();
        }
    } else if (!piece.isPlaced) {
        console.log("Piece", pieceIndex, "placed in wrong cell - target:", piece.correctX, piece.correctY);
        piece.element.style.opacity = "0.8";
        piece.element.draggable = true;
        piece.element.style.zIndex = "10";
        piece.element.style.backgroundColor = "rgba(255, 143, 177, 0.05)";
    }

    updateUndoButton();
}

function hideCompletionMessage() {
    const box = document.getElementById("puzzleCompleteMessage");
    if (box) box.classList.add("hidden");
}

function showCompletionMessage() {
    const box = document.getElementById("puzzleCompleteMessage");
    if (!box) return;
    const diffText = {20: "Easy", 40: "Medium", 60: "Hard"}[currentDifficulty] || "";
    const heading = box.querySelector("h3");
    const para = box.querySelector("p");
    if (heading) heading.textContent = "Puzzle Completed!";
    if (para) para.textContent = `Perfect placement verified for ${diffText} mode (${currentDifficulty} pieces).`;
    box.classList.remove("hidden");
}

function updateUndoButton() {
    const undoBtn = document.getElementById("undoLastBtn");
    if (!undoBtn) return;
    undoBtn.disabled = placementHistory.length === 0;
}

function isPieceCorrectlyPlaced(piece) {
    if (!piece || !piece.element || !piece.element.parentElement) return false;
    const onCanvas = piece.element.parentElement.id !== "puzzlePiecesArea";
    return onCanvas &&
        piece.isPlaced &&
        piece.gridCol === piece.correctCol &&
        piece.gridRow === piece.correctRow;
}

function syncPlacedPieces() {
    placedPieces = puzzlePieces
        .filter(isPieceCorrectlyPlaced)
        .map((piece) => piece.index);
}

function isPuzzleComplete() {
    syncPlacedPieces();
    return currentDifficulty > 0 && placedPieces.length === currentDifficulty;
}

function returnPieceToTray(piece, removeFromHistory = true) {
    const piecesArea = document.getElementById("puzzlePiecesArea");
    if (!piecesArea || !piece || !piece.element) return;
    const wasPlaced = piece.isPlaced;

    piecesArea.appendChild(piece.element);
    piece.element.style.position = "static";
    piece.element.style.left = "";
    piece.element.style.top = "";
    piece.element.style.width = piece.width + "px";
    piece.element.style.height = piece.height + "px";
    piece.element.style.opacity = "1";
    piece.element.style.zIndex = "";
    piece.element.draggable = true;
    piece.element.style.boxShadow = "";
    piece.element.style.backgroundColor = "";

    piece.isPlaced = false;
    piece.gridCol = null;
    piece.gridRow = null;

    const placedIdx = placedPieces.indexOf(piece.index);
    if (placedIdx !== -1) placedPieces.splice(placedIdx, 1);
    if (wasPlaced && removeFromHistory) {
        for (let i = placementHistory.length - 1; i >= 0; i--) {
            if (placementHistory[i] === piece.index) {
                placementHistory.splice(i, 1);
                break;
            }
        }
    }

    hideCompletionMessage();
    updatePieceCount();
    updateUndoButton();
}

function undoLastPlacement() {
    if (!placementHistory.length) return;

    let pieceIndex = null;
    while (placementHistory.length) {
        const candidate = placementHistory.pop();
        const candidatePiece = puzzlePieces[candidate];
        if (candidatePiece && candidatePiece.isPlaced) {
            pieceIndex = candidate;
            break;
        }
    }

    if (pieceIndex === null) {
        updateUndoButton();
        return;
    }

    const piece = puzzlePieces[pieceIndex];
    returnPieceToTray(piece, false);
}

function updatePieceCount() {
    syncPlacedPieces();
    const pieceCount = document.getElementById("pieceCount");
    if (pieceCount) {
        pieceCount.textContent = `Pieces: ${placedPieces.length}/${currentDifficulty}`;
    }
}

function renderPuzzle() {
    if (!canvas || !ctx) {
        console.log("Canvas not initialized yet");
        return;
    }
    
    // Fill with white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw visible grid tiles
    const grid = window.puzzleGridInfo;
    if (grid) {
        ctx.strokeStyle = "#e0e0e0";
        ctx.lineWidth = 2;
        
        // Draw vertical lines
        for (let col = 0; col <= grid.cols; col++) {
            const x = col * grid.cellWidth;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let row = 0; row <= grid.rows; row++) {
            const y = row * grid.cellHeight;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Highlight grid cells lightly
        ctx.fillStyle = "rgba(255, 95, 158, 0.02)";
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                if ((row + col) % 2 === 0) {
                    ctx.fillRect(col * grid.cellWidth, row * grid.cellHeight, grid.cellWidth, grid.cellHeight);
                }
            }
        }
    }
}

function solvePuzzle() {
    const canvasWrapper = document.querySelector(".puzzle-canvas-wrapper");
    const grid = window.puzzleGridInfo;
    
    puzzlePieces.forEach((piece, index) => {
        if (!piece.isPlaced) {
            piece.isPlaced = true;
            if (!placedPieces.includes(index)) {
                placedPieces.push(index);
            }
            placementHistory.push(index);
            
            // Move to canvas if not already there
            if (piece.element.parentElement.id === "puzzlePiecesArea") {
                canvasWrapper.appendChild(piece.element);
                piece.element.style.position = "absolute";
            }
            
            // Position at correct grid cell
            const canvas = document.getElementById("puzzleCanvas");
            const canvasRect = canvas.getBoundingClientRect();
            const wrapperRect = canvasWrapper.getBoundingClientRect();
            const canvasOffsetX = canvasRect.left - wrapperRect.left;
            const canvasOffsetY = canvasRect.top - wrapperRect.top;
            const cellX = piece.correctCol * grid.displayCellWidth;
            const cellY = piece.correctRow * grid.displayCellHeight;

            piece.element.style.left = (cellX + canvasOffsetX) + "px";
            piece.element.style.top = (cellY + canvasOffsetY) + "px";
            piece.element.style.width = grid.displayCellWidth + "px";
            piece.element.style.height = grid.displayCellHeight + "px";
            piece.element.style.opacity = "1";
            piece.element.style.zIndex = "1000";
            piece.element.draggable = false;
            piece.element.style.boxShadow = "0 0 20px rgba(255, 95, 158, 0.5)";
            piece.element.style.backgroundColor = "rgba(255, 95, 158, 0.1)";
            piece.gridCol = piece.correctCol;
            piece.gridRow = piece.correctRow;
        }
    });
    
    renderPuzzle();
    updatePieceCount();
    updateUndoButton();
    celebratePuzzleComplete();
}

function resetPuzzle() {
    // Return all pieces to the bottom pieces area and reset state
    const piecesArea = document.getElementById("puzzlePiecesArea");
    const canvasWrapper = document.querySelector(".puzzle-canvas-wrapper");
    // Randomize order when resetting to prevent sequential placement
    const indices = puzzlePieces.map(p => p.index);
    shuffleArray(indices);
    indices.forEach(i => {
        const p = puzzlePieces[i];
        if (p && p.element) {
            piecesArea.appendChild(p.element);
            p.element.style.position = "static";
            p.element.style.left = "";
            p.element.style.top = "";
            p.element.style.width = p.width + "px";
            p.element.style.height = p.height + "px";
            p.element.style.opacity = "1";
            p.element.style.zIndex = "";
            p.element.draggable = true;
            p.element.style.boxShadow = "";
            p.element.style.backgroundColor = "";
            p.isPlaced = false;
            p.gridCol = null;
            p.gridRow = null;
        }
    });
    placedPieces = [];
    placementHistory = [];
    hideCompletionMessage();
    updatePieceCount();
    updateUndoButton();
    renderPuzzle();
}

function changeDifficulty() {
    document.getElementById("puzzleSection").classList.add("hidden");
    document.getElementById("difficultyBox").classList.remove("hidden");
    document.getElementById("puzzleCanvas").width = 0;
    document.getElementById("puzzleCanvas").height = 0;
    currentDifficulty = 0;
    puzzlePieces = [];
    placedPieces = [];
    placementHistory = [];
    hideCompletionMessage();
    updatePieceCount();
    updateUndoButton();
}

function celebratePuzzleComplete() {
    showCompletionMessage();
}


// Allow Enter key to submit password
document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("pictureplayPassword");
    if (passwordInput) {
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                verifyPicturePlayPassword();
            }
        });
    }
});

// Ensure functions are available on window for inline onclick handlers
window.verifyPicturePlayPassword = verifyPicturePlayPassword;
window.togglePicturePlayPassword = togglePicturePlayPassword;
window.undoLastPlacement = undoLastPlacement;


