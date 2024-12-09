let activeCameraIndex = 0; // Indice della camera attiva

// Modifica del codice di gestione dei tasti per cambiare la visualizzazione
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case '1':
            activeCameraIndex = 0; // Prospettiva 1
            break;
        case '2':
            activeCameraIndex = 1; // Vista dall'alto
            break;
        case '3':
            activeCameraIndex = 2; // Vista laterale destra
            break;
        case '4':
            activeCameraIndex = 3; // Vista frontale
            break;
    }

    // Cambia la camera attiva
    updateActiveCamera();
});

// Funzione per aggiornare la camera attiva
function updateActiveCamera() {
    const activeCamera = cameras[activeCameraIndex];

    // Aggiorna l'OrbitControls con la nuova camera
    orbit.object = activeCamera;
    orbit.update();

    // Rende la scena con la nuova camera
    render();
}

// Rendering con la camera attiva
function render() {
    // Usa solo la camera attiva per il rendering
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
    renderer.setScissorTest(true);

    const camera = cameras[activeCameraIndex];
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
}