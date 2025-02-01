// Importa Three.js se utilizzi un ambiente con moduli JavaScript (opzionale)
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CustomBoundingBox } from '../../src/custom';
import { loadGltfModel } from './loader';


// Imposta la scena
export const scene = new THREE.Scene();
let objToBeDetected = [];

// Imposta la camera
const camera = new THREE.PerspectiveCamera(
    75, // Angolo di visione
    window.innerWidth / window.innerHeight, // Rapporto d'aspetto
    0.1, // Distanza minima visibile
    1000 // Distanza massima visibile
);
camera.position.z = 15; // Posiziona la camera più lontano per vedere l'oggetto

// Imposta il renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Variabile globale per l'oggetto selezionato
let selectedObject = null;

// Crea le geometrie native
const torusKnot1 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
torusKnot1.name = "TorusKnot1";
torusKnot1.position.x = -5;

const scatolone = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 20, 20),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
scatolone.name = "Sfera1";
scatolone.position.x = 0;

const scatolone3 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 3, 2),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
scatolone3.name = "Scatolone";
scatolone3.position.x = 5;

scene.add(torusKnot1, scatolone, scatolone3);
objToBeDetected.push(torusKnot1, scatolone, scatolone3);

//aggiungi un modello da fuori
loadGltfModel('src/models/GenericGallery.glb');

// Crea una bounding box personalizzata
const customBox = new CustomBoundingBox(torusKnot1, 0xff0000); // Inizialmente senza target
customBox.addToScene(scene);
customBox.hide(); // Assicurati che sia invisibile all'inizio

// Helper Box (inizialmente invisibile)
// const helperBox = new THREE.BoxHelper(torusKnot1, 0x054bfc);
// helperBox.visible = false;
// scene.add(helperBox);

// Luci
const ambientLight = new THREE.AmbientLight(0xe7e7e7, .5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, .5);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, .5);
directionalLight2.position.set(-5, 10, -7.5);
directionalLight2.castShadow = true;
scene.add(directionalLight2);

// Controlli
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Raycaster per la selezione degli oggetti
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Variabili per monitorare lo stato del mouse e dell'interazione
let isOrbiting = false;       // Per verificare se OrbitControls sono attivi
let isMouseMoving = false;    // Per rilevare movimento del mouse
let clickThreshold = 5;       // Soglia di movimento del mouse (in pixel)
let mouseDownPosition = { x: 0, y: 0 }; // Posizione iniziale del mouse

// Evento 'start' e 'end' degli OrbitControls
orbit.addEventListener('start', () => {
    isOrbiting = true;
});
orbit.addEventListener('end', () => {
    isOrbiting = false;
});

// Evento 'mousedown' per registrare la posizione iniziale del mouse
window.addEventListener("mousedown", (event) => {
    isMouseMoving = false; // Reset dello stato
    mouseDownPosition.x = event.clientX; // Posizione iniziale X
    mouseDownPosition.y = event.clientY; // Posizione iniziale Y
});

// Evento 'mousemove' per rilevare movimenti significativi del mouse
window.addEventListener("mousemove", (event) => {
    const dx = Math.abs(event.clientX - mouseDownPosition.x); // Spostamento X
    const dy = Math.abs(event.clientY - mouseDownPosition.y); // Spostamento Y

    // Se il movimento supera la soglia, segnala che il mouse si è mosso
    if (dx > clickThreshold || dy > clickThreshold) {
        isMouseMoving = true;
    }
});

// Evento 'mouseup' per determinare se il click deve essere ignorato
window.addEventListener("mouseup", (event) => {
    if (isMouseMoving || isOrbiting) {
        // Ignora il click se il mouse si è mosso o stavi orbitando
        isMouseMoving = false; // Reset dello stato
        return;
    }

    // Altrimenti, esegui la logica di selezione
    handleClick(event);
});

// Funzione per gestire il click
function handleClick(event) {
  // Calcola la posizione del mouse normalizzata
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Aggiorna il raycaster
  raycaster.setFromCamera(mouse, camera);

  // Controlla l'intersezione con gli oggetti
  const intersects = raycaster.intersectObjects(objToBeDetected);

  if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      selectedObject = clickedObject.name;

      // Associa la customBox al nuovo oggetto
      customBox.setTarget(clickedObject); // Metodo da aggiungere alla tua classe
      customBox.show(); // Mostra la bounding box
  } else {
      selectedObject = null;
      customBox.hide(); // Nascondi la bounding box
  }
  console.log("Selected Object:", selectedObject);
}

// Funzione di animazione
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Adatta la scena quando la finestra cambia dimensione
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Avvia l'animazione
animate();