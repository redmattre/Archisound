import { goochMaterialAlpha, solidMaterial } from "./materials";
import { setRaycasterActive } from "./raycaster";
import { cameraOrtho, cameraPersp, changeTheme, control, currentCamera, orbit, orbitOrtho } from "./setup";

// SWITCHES
document.querySelectorAll('.switch input').forEach((checkbox) => {
	checkbox.addEventListener('change', (event) => {
		const isChecked = event.target.checked;
		const switchId = event.target.getAttribute('data-id');
		toggleSwitch(switchId, isChecked);
	});
});

let architectureTransparency = 1.;

function toggleSwitch(id, state) {
	switch (id) {
		case 'lock':
            setRaycasterActive(!state); // Update the value
			break;

        case 'transparencyA':
            if (state) {
                goochMaterialAlpha.uniforms.opacity.value = 0.5;
                architectureTransparency = 0.5;
            } else {
                goochMaterialAlpha.uniforms.opacity.value = 1.;
                architectureTransparency = 1.;
            }
            
            break;
        case 'theme':
            changeTheme(state);
            break;

		default:
			console.log('Switch non riconosciuto');
	}
}

// BUTTONS

let counter = 1; // Definito al di fuori per mantenere lo stato tra i clic


document.getElementById('addArch').addEventListener('click', () => {
    if (counter === 0) {
        // Cambia opacità di goochMaterialAlpha
        goochMaterialAlpha.uniforms.opacity.value = 0;

        // Nasconde il materiale solidMaterial
        solidMaterial.visible = false;

        counter = 1; // Cambia lo stato per il prossimo clic
    } else {
        // Cambia opacità di goochMaterialAlpha
        goochMaterialAlpha.uniforms.opacity.value = architectureTransparency;

        // Mostra il materiale solidMaterial
        solidMaterial.visible = true;

        counter = 0; // Cambia lo stato per il prossimo clic
    }
});

// KEYBOARD

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '1':
            // Attiva la camera prospettica
            currentCamera = cameraPersp;
            orbit.enabled = true; // Riabilita i controlli Orbit
			orbitOrtho.enabled = false;
            // currentCamera.position.set(5, 2.5, 5); 
            currentCamera.lookAt(0, 0, 0); // Guarda verso il centro della scena
            control.camera = currentCamera; // Aggiorna la camera nei controlli

			onWindowResize()
            
            break;

        case '2':
            // Attiva la camera ortogonale dall'alto
            currentCamera = cameraOrtho;
            orbit.enabled = false; // Disabilita i controlli Orbit
			orbitOrtho.enabled = true;
            currentCamera.position.set(0, 5, 0); // Posizione dall'alto
            currentCamera.lookAt(0, 0, 0); // Guarda verso il centro della scena
            control.camera = currentCamera; // Aggiorna la camera nei controlli
            
			onWindowResize()
            break;

        case '3':
            // Attiva la camera ortogonale da di fronte
            currentCamera = cameraOrtho;
            orbit.enabled = false; // Disabilita i controlli Orbit
			orbitOrtho.enabled = true;
            currentCamera.position.set(0, 0, 5); // Posizione da di fronte
            currentCamera.lookAt(0, 0, 0); // Guarda verso il centro della scena
            control.camera = currentCamera; // Aggiorna la camera nei controlli
            onWindowResize()

            break;

        case '4':
            // Attiva la camera ortogonale da destra
            currentCamera = cameraOrtho;
            orbit.enabled = false; // Disabilita i controlli Orbit
			orbitOrtho.enabled = true;
            currentCamera.position.set(5, 0, 0); // Posizione da destra
            currentCamera.lookAt(0, 0, 0); // Guarda verso il centro della scena
            control.camera = currentCamera; // Aggiorna la camera nei controlli
           
			onWindowResize()
            break;
        // Aggiungi il resto delle tue azioni per altri tasti
        case 'q':
            control.setSpace(control.space === 'local' ? 'world' : 'local');
            break;

        // case 'Shift':
        //     control.setTranslationSnap(1);
        //     control.setRotationSnap(THREE.MathUtils.degToRad(15));
        //     control.setScaleSnap(0.25);
        //     break;
        case 'g':
            control.setMode('translate');
			addControlsOnClick();
            break;

        case 'r':
            control.setMode('rotate');
			addControlsOnClick();
            break;

        case 's':
            control.setMode('scale');
			addControlsOnClick();
            break;

        case 'c':
            const position = currentCamera.position.clone();
            currentCamera = currentCamera.isPerspectiveCamera ? cameraOrtho : cameraPersp;
            currentCamera.position.copy(position);
            orbit.object = currentCamera;
            control.camera = currentCamera;
            currentCamera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
            onWindowResize();
            break;
        case 'Escape':
            control.detach();  // Disattiva TransformControls
            orbit.enabled = true; // Riabilita i controlli Orbit
			//eventualmente e
            break;
		case 'Backspace', 'x':
			deleteObjectOnClick();
			break;
            
    }
});