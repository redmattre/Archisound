// Variabili globali
let points = []; // Punti della curva
let closed = false; // Se la curva è chiusa
let position = 0; // Posizione del pallino lungo la curva
let stepSize = 0.01; // Incremento per passo

// Canvas setup
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Mantieni il canvas quadrato
function resizeCanvas() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = size;
    canvas.height = size;
    drawCurve(); // Ridisegna dopo il ridimensionamento
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Chiamato immediatamente per inizializzare

// Converti posizione del mouse in coordinate normalizzate [0, 1]
function getNormalizedMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    return { x, y };
}

// Converti coordinate normalizzate in coordinate canvas
function denormalizeCoords({ x, y }) {
    return { x: x * canvas.width, y: y * canvas.height };
}

// Disegna la curva
function drawCurve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    if (points.length > 1) {
        const start = denormalizeCoords(points[0]);
        ctx.moveTo(start.x, start.y);
        for (let i = 1; i < points.length; i++) {
            const point = denormalizeCoords(points[i]);
            ctx.lineTo(point.x, point.y);
        }
        if (closed) {
            ctx.closePath();
        }
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    drawBall();
}

// Disegna il pallino
function drawBall() {
    if (points.length < 2 || !closed) return;

    const interpolatedPoint = interpolatePosition(position);
    const canvasPoint = denormalizeCoords(interpolatedPoint);

    ctx.beginPath();
    ctx.arc(canvasPoint.x, canvasPoint.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Interpolazione della posizione sulla curva
function interpolatePosition(t) {
    if (!closed || points.length < 2) return { x: 0, y: 0 };

    const n = points.length;
    const segment = Math.floor(t * n);
    const localT = (t * n) % 1;
    const start = points[segment];
    const end = points[(segment + 1) % n];

    return {
        x: start.x + localT * (end.x - start.x),
        y: start.y + localT * (end.y - start.y),
    };
}

// Interazione con il mouse
let isDrawing = false;

canvas.addEventListener('mousedown', (e) => {
    if (closed) return;
    isDrawing = true;
    points.push(getNormalizedMousePos(e));
    drawCurve();
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    points.push(getNormalizedMousePos(e));
    drawCurve();
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Chiudi la curva
function closeCurve() {
    if (points.length > 2) {
        closed = true;
        drawCurve();
    }
}

// Pulsante per salvare il file
const saveToFileButton = document.createElement("button");
saveToFileButton.textContent = "Salva su File";
saveToFileButton.style.position = "absolute";
saveToFileButton.style.bottom = "10px";
saveToFileButton.style.left = "10px";
saveToFileButton.addEventListener("click", saveDrawingToFile);
document.body.appendChild(saveToFileButton);

// Input per caricare un file
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".json";
fileInput.style.position = "absolute";
fileInput.style.bottom = "10px";
fileInput.style.left = "120px";
fileInput.addEventListener("change", loadDrawingFromFile);
document.body.appendChild(fileInput);

// Salva il disegno in un file JSON
function saveDrawingToFile() {
    const data = JSON.stringify({
        points: points,
        closed: closed,
    }, null, 2); // Formatta JSON per leggibilità

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "disegno.json"; // Nome di default
    a.click();

    URL.revokeObjectURL(url); // Rilascia la memoria associata all'oggetto URL
}

// Carica il disegno da un file JSON
function loadDrawingFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            points = data.points || [];
            closed = data.closed || false;
            position = 0; // Reset posizione
            drawCurve();
            alert("Disegno caricato con successo!");
        } catch (error) {
            alert("Errore durante il caricamento del disegno!");
        }
    };
    reader.readAsText(file);
}

// Funzione per caricare il disegno da un file specifico
window.max.bindInlet("caricaDisegno", function (fileName) {
    const filePath = `./${fileName}`; // Percorso relativo al file

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nel caricamento del file: ${response.statusText}`);
            }
            return response.json(); // Legge il contenuto come JSON
        })
        .then(data => {
            points = data.points || [];
            closed = data.closed || false;
            position = 0; // Reset posizione
            drawCurve();
            // max.outlet("Disegno caricato con successo!");
        })
        .catch(error => {
            console.error(error);
            // max.outlet(`Errore: ${error.message}`);
        });
});

// Funzioni per Max MSP
window.max.bindInlet("passetto", function (step) {
    stepSize = step || stepSize;
    position = (position + stepSize) % 1;
    const interpolatedPoint = interpolatePosition(position);

    // Output normalizzato
    max.outlet(interpolatedPoint.x, interpolatedPoint.y);
    drawCurve();
});

window.max.bindInlet("chiudi", function () {
    closeCurve();
});

// // Salva il disegno in localStorage
// function saveDrawing() {
//     const data = JSON.stringify({
//         points: points,
//         closed: closed,
//     });
//     localStorage.setItem("drawing", data);
//     alert("Disegno salvato!");
// }

// // Carica il disegno da localStorage
// function loadDrawing() {
//     const data = localStorage.getItem("drawing");
//     if (!data) {
//         alert("Nessun disegno salvato!");
//         return;
//     }

//     const { points: savedPoints, closed: savedClosed } = JSON.parse(data);
//     points = savedPoints || [];
//     closed = savedClosed || false;
//     position = 0; // Reset posizione
//     drawCurve();
//     alert("Disegno caricato!");
// }

// // Aggiungi pulsanti per salvare e caricare
// const saveButton = document.createElement("button");
// saveButton.textContent = "Salva Disegno";
// saveButton.style.position = "absolute";
// saveButton.style.bottom = "10px";
// saveButton.style.left = "10px";
// saveButton.addEventListener("click", saveDrawing);
// document.body.appendChild(saveButton);

// const loadButton = document.createElement("button");
// loadButton.textContent = "Carica Disegno";
// loadButton.style.position = "absolute";
// loadButton.style.bottom = "10px";
// loadButton.style.left = "120px";
// loadButton.addEventListener("click", loadDrawing);
// document.body.appendChild(loadButton);