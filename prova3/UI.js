import { goochMaterialAlpha, solidMaterial } from "./materials";
// import { setRaycasterActive } from "./raycaster";
import { currentCamera, changeTheme, control, orbit, orbitOrtho, onWindowResize } from "./setup";

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