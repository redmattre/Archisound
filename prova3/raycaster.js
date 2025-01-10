import * as THREE from 'three';
import { renderer, objToBeDetected, currentCamera, scene, control } from './setup';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

export let raycaster = new THREE.Raycaster();
export let mouse = new THREE.Vector2();
export let isRaycasterActive = true;

export function setRaycasterActive(state) {
    isRaycasterActive = state;
}

export function getRaycasterActive() {
    return isRaycasterActive;
}

let outlinePass;
let composer;

// Variabile per tracciare l'oggetto attualmente con l'outline
let outlineObject = null;

// Intervallo per limitare la frequenza degli aggiornamenti
let lastUpdateTime = 0;
const updateInterval = 50; // Aggiorna ogni 100ms

// Inizializza il composer e l'outline pass
function initPostProcessing() {
    const renderPass = new RenderPass(scene, currentCamera);

    outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, currentCamera);
    outlinePass.edgeStrength = 10; // Regola la forza del contorno
    outlinePass.edgeGlow = 0; // Nessun bagliore
    outlinePass.edgeThickness = 5; // Spessore del contorno
    outlinePass.visibleEdgeColor.set('#ffffff'); // Colore del contorno visibile
    outlinePass.hiddenEdgeColor.set('#ffffff'); // Colore del contorno nascosto

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(outlinePass);
}

// Evento per ridimensionare il renderer e il composer
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Variabile per tracciare l'ultimo testo mostrato
let lastHoveredObject = null;

renderer.domElement.addEventListener('mousemove', (event) => {
    if (!isRaycasterActive) return;

    const now = Date.now();
    if (now - lastUpdateTime < updateInterval) return;
    lastUpdateTime = now;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, currentCamera);
    const intersects = raycaster.intersectObjects(objToBeDetected, true);

    if (intersects.length > 0) {
        let firstNonDashedObject = null;
    
        for (let i = 0; i < intersects.length; i++) {
            const intersectedObject = intersects[i].object;
            if (!intersectedObject.isDashed) {
                firstNonDashedObject = intersectedObject;
                break;
            }
        }
    
        if (firstNonDashedObject) {
            const newText = firstNonDashedObject.name || 'Oggetto non trattato';
            if (newText !== lastHoveredObject) {
                updateInfoText(newText);
                lastHoveredObject = newText;
            }
            outlineObject = firstNonDashedObject;
            outlinePass.selectedObjects = [outlineObject];
            window.addEventListener('keydown', function(event) {
              if (event.key === 'g' || event.key === 's' || event.key === 'r') {
                control.attach(firstNonDashedObject);
                outlineObject = null;
                outlinePass.selectedObjects = [];
                isRaycasterActive = false;
              }
            });
        } else {
            const dashedObject = intersects[0].object;
    
            const parentGroup = dashedObject.parent;
            if (parentGroup) {
                const invisibleMesh = parentGroup.children.find(child => child.isMesh);
                if (invisibleMesh) {
                    outlineObject = invisibleMesh;
                    outlinePass.selectedObjects = [outlineObject];
                    window.addEventListener('keydown', function(event) {
                      if (event.key === 'g' || event.key === 's' || event.key === 'r') {
                        control.attach(parentGroup);
                        outlineObject = null;
                        outlinePass.selectedObjects = [];
                        isRaycasterActive = false;
                      }
                    });
                }
            }
    
            const newText = dashedObject.name || 'Oggetto trattato';
            if (newText !== lastHoveredObject) {
                updateInfoText(newText);
                lastHoveredObject = newText;
            }
        }
    } else {
        // Nessun oggetto hoverato, non aggiorna il testo
        outlineObject = null;
        outlinePass.selectedObjects = [];
    }
});

// Funzione di rendering con il composer
function animate() {
    requestAnimationFrame(animate);
    composer.render();
}

// Funzione per aggiornare il div con le informazioni
const infoDiv = document.getElementById('infoDivTopLeft');
function updateInfoText(text) {
    infoDiv.textContent = text || '---';
}


// Inizializza post-processing e avvia il rendering
initPostProcessing();
animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '1': // Tasto 1: Camera prospettica
            initPostProcessing();
            animate();
            break;

        case '2': // Tasto 2: Camera ortogonale
            initPostProcessing();
            animate();
            break;
        case '3': // Tasto 2: Camera ortogonale
            initPostProcessing();
            animate();
            break;
        case '4': // Tasto 2: Camera ortogonale
            initPostProcessing();
            animate();
            break;
        case 'Escape':
            if (!isRaycasterActive) {
                isRaycasterActive = true;
            } 
            break;
    }

    // Aggiungi la nuova camera alla scena
    scene.add(currentCamera);

    // Forza il renderer a utilizzare la nuova camera
    renderer.render(scene, currentCamera);
});