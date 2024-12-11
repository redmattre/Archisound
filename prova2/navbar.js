// Funzione da eseguire quando si fa click con Shift premuto
function onShiftClick(event) {
    // group = new THREE.Group();

    // Imposta il raycaster dalla posizione del mouse e dalla camera corrente
    raycaster.setFromCamera(mouse, currentCamera);

    // Trova gli oggetti intersecati
    const intersects = raycaster.intersectObjects(objToBeDetected, true);

    if (intersects.length > 0) {
        // Prendi il primo oggetto intersecato
        const intersectedObject = intersects[0].object;

        // Salva le coordinate globali
        const worldPosition = new THREE.Vector3();
        intersectedObject.getWorldPosition(worldPosition);

        // Aggiungi il gruppo alla scena se non è già presente
        if (!scene.children.includes(group)) {
            scene.add(group);
        }

        // Aggiungi l'oggetto al gruppo
        group.add(intersectedObject);

        // Aggiorna la posizione relativa al gruppo
        intersectedObject.position.copy(group.worldToLocal(worldPosition));

        // Rimuovi l'oggetto da objToBeDetected per evitare future intersezioni
        const index = objToBeDetected.indexOf(intersectedObject);
        if (index !== -1) {
            objToBeDetected.splice(index, 1);
        }
    }
}