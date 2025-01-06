import * as THREE from 'three';
import { dashedMaterial, dashedMaterialB, dashedMaterialC, dashedMaterialD, goochMaterialAlpha, solidMaterial } from "./materials";
import { setRaycasterActive } from "./raycaster";
import { currentCamera, changeTheme, control, orbit, orbitOrtho, onWindowResize, ssuper, scene, renderer, changeGrid } from "./setup";

// SWITCHES
document.querySelectorAll('.switch input').forEach((checkbox) => {
	checkbox.addEventListener('change', (event) => {
		const isChecked = event.target.checked;
		const switchId = event.target.getAttribute('data-id');
		toggleSwitch(switchId, isChecked);
	});
});

let architectureTransparency = 0.7;

function toggleSwitch(id, state) {
	switch (id) {
		case 'lock':
            setRaycasterActive(!state); // Update the value
			break;

        case 'transparencyA':
            if (state) {
                goochMaterialAlpha.uniforms.opacity.value = architectureTransparency;
                // architectureTransparency = 0.5;
                // goochMaterialAlpha.transparent = true;
                isTransparent = true;
            } else {
                goochMaterialAlpha.uniforms.opacity.value = 1.;
                // architectureTransparency = 1.;
                // goochMaterialAlpha.transparent = false;
                isTransparent = false;
            }
            
            break;
        case 'serioso':
            if (state) {
                goochMaterialAlpha.uniforms.coolColor.value = new THREE.Color(0x000080);
                goochMaterialAlpha.uniforms.warmColor.value = new THREE.Color(0xF5F5DC);
            } else {
                goochMaterialAlpha.uniforms.coolColor.value = new THREE.Color(0x0077ff);
                goochMaterialAlpha.uniforms.warmColor.value = new THREE.Color(0xffaa00);
            }
            
            break;
        case 'theme':
            changeTheme(state);
            break;
        case 'grid':
            ssuper.visible = state;
            break;
        case 'zoneVisibility':
            if (state) {
                dashedMaterial.visible = true;
                dashedMaterialB.visible = true;
                dashedMaterialC.visible = true;
                dashedMaterialD.visible = true;
            } else {
                dashedMaterial.visible = false;
                dashedMaterialB.visible = false;
                dashedMaterialC.visible = false;
                dashedMaterialD.visible = false;
            }
		default:
			console.log('Switch non riconosciuto');
	}
}

// SLIDERS

document.querySelectorAll('.multitoggle input').forEach((range) => {
	range.addEventListener('change', (event) => {
		const valore = parseInt(event.target.value); // Converte in numero
		const sliderId = event.target.getAttribute('data-id');
		toggleSlider(sliderId, valore);
	});
});

function toggleSlider(id, val) {
    switch (id) {
        case 'gridsize':
            switch (val) {
                case 1:
                    changeGrid(5, 8);
                    break;
                case 2:
                    changeGrid(10, 16);
                    break;
                case 3:
                    changeGrid(20, 32);
                    break;
                case 4:
                    changeGrid(40, 64);
                    break;
                default:
                    console.log("Valore non riconosciuto.");
                    return;
            }
            break;
        case 'transArchVal':
            switch (val) {
                case 1:
                    architectureTransparency = 0.;
                    if (isTransparent) {goochMaterialAlpha.uniforms.opacity.value = 0.;}
                    break;
                case 2:
                    architectureTransparency = 0.2;
                    if (isTransparent) {goochMaterialAlpha.uniforms.opacity.value = 0.2;}
                    break;
                case 3:
                    architectureTransparency = 0.5;
                    if (isTransparent) {goochMaterialAlpha.uniforms.opacity.value = 0.5;}
                    break;
                case 4:
                    architectureTransparency = 0.7;
                    if (isTransparent) {goochMaterialAlpha.uniforms.opacity.value = 0.7;}
                    break;
                default:
                    console.log("Valore non riconosciuto.");
                    return;
            }
            break;

        default:
            console.log("ID non riconosciuto.");
    }
}

// BUTTONS

let counter = 1; // Definito al di fuori per mantenere lo stato tra i clic
let isTransparent = false;
let isVisible = false;

document.getElementById('addArch').addEventListener('click', (event) => {
    // Recupera lo stato del pulsante dal suo attributo data
    const isActive = event.target.getAttribute('data-active') === 'true';

    if (isActive) {
        // Disattiva
        goochMaterialAlpha.uniforms.opacity.value = 0;
        solidMaterial.visible = false;

        event.target.setAttribute('data-active', 'false'); // Aggiorna stato
    } else {
        // Attiva
        goochMaterialAlpha.uniforms.opacity.value = isTransparent ? architectureTransparency : 1;
        solidMaterial.visible = true;

        event.target.setAttribute('data-active', 'true'); // Aggiorna stato
    }
});