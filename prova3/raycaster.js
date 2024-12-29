import * as THREE from 'three';
import { renderer, objToBeDetected, currentCamera } from './setup';

export let raycaster = new THREE.Raycaster();
export let mouse = new THREE.Vector2();
let hoveredObject = null;

// aggiorna coordinate del mouse
// function onPointerMove(event) {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

// renderer.domElement.addEventListener( 'pointermove', onPointerMove );

console.log(renderer.domElement);
renderer.domElement.addEventListener('mousemove', (event) => {
    console.log('mousemove event detected'); // Questo dovrebbe essere visibile
});

renderer.domElement.addEventListener('mousemove', (event) => {
    // Converti le coordinate del mouse in spazio normalizzato (-1 a 1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Usa il raycaster per determinare l'oggetto sotto il puntatore
    raycaster.setFromCamera(mouse, currentCamera);
    const intersects = raycaster.intersectObjects(objToBeDetected, true);

    if (intersects.length > 0) {
        // Prendi il primo oggetto intersecato
        const firstObject = intersects[0].object;
        
        // Controlla se è diverso dall'oggetto già hoverato
        if (hoveredObject !== firstObject) {
            hoveredObject = firstObject;
            updateInfoText(`${hoveredObject.name || 'Senza Nome'}`);
        }
    } else {
        // Se nessun oggetto è selezionato, resetta
        hoveredObject = null;
        updateInfoText();
    }
});

const infoDiv = document.getElementById('infoDiv');

function updateInfoText(text) {
    infoDiv.textContent = text || '---';
}