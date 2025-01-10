import { scene, objToBeDetected } from './setup.js';

export function createMenu() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = ''; // Resetta il menu

    objToBeDetected.forEach((object) => {
        // Risali al parent
        const parent = object.parent && object.parent !== scene ? object.parent : object;

        const itemList = document.createElement('div');
        itemList.className = 'itemList';

        // Titolo con toggle visibilità
        const itemTitle = document.createElement('div');
        itemTitle.className = 'itemListTitle';
        const toggle = document.createElement('span');
        toggle.textContent = object.visible ? '⏿' : '⊗';
        toggle.style.cursor = 'pointer';
        toggle.addEventListener('click', () => {
            object.visible = !object.visible;
            toggle.textContent = object.visible ? '⏿' : '⊗';
        });
        itemTitle.appendChild(toggle);
        itemTitle.append(` - ${object.name}`); // Usa il nome del child
        itemList.appendChild(itemTitle);

        // Separator
        itemList.appendChild(document.createElement('hr'));

        // Posizione (usa il parent)
        const position = createEditableField('Position', parent.position, (value) => {
            parent.position.set(value.x, value.y, value.z);
        });
        itemList.appendChild(position);

        // Rotazione (usa il parent)
        const rotation = createEditableField('Rotation', parent.rotation, (value) => {
            parent.rotation.set(value.x, value.y, value.z);
        });
        itemList.appendChild(rotation);

        // Scala (usa il parent)
        const scale = createEditableField('Scale', parent.scale, (value) => {
            parent.scale.set(value.x, value.y, value.z);
        });
        itemList.appendChild(scale);

        menuList.appendChild(itemList);
    });
}

// Helper per creare campi editabili
function createEditableField(label, vector, onUpdate) {
    const container = document.createElement('div');
    container.className = `itemList${label}`;
    container.textContent = `${label.charAt(0)} `;

    ['x', 'y', 'z'].forEach((axis) => {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = vector[axis].toFixed(2);
        input.step = '0.1';
        input.style.width = '3rem';
        input.addEventListener('change', (e) => {
            vector[axis] = parseFloat(e.target.value);
            onUpdate(vector);
        });
        container.appendChild(input);
    });

    return container;
}

// Funzione per ottenere il nome dell'oggetto selezionato dal menu
export function getSelectedObjectName(itemIndex) {
    return objToBeDetected[itemIndex]?.name || null;
}

export function updateMenu() {
    const menuList = document.getElementById('menuList');
    const items = menuList.querySelectorAll('.itemList');

    items.forEach((item, index) => {
        const object = objToBeDetected[index];
        if (!object) return;

        // Risali al parent, oppure usa l'oggetto stesso se non ha un parent valido
        const parent = object.parent && object.parent !== scene ? object.parent : object;

        // Trova gli input della posizione, rotazione e scala
        const positionInputs = item.querySelectorAll('.itemListPosition input');
        const rotationInputs = item.querySelectorAll('.itemListRotation input');
        const scaleInputs = item.querySelectorAll('.itemListScale input');

        // Aggiorna i valori di posizione
        ['x', 'y', 'z'].forEach((axis, i) => {
            positionInputs[i].value = parent.position[axis].toFixed(2);
        });

        // Aggiorna i valori di rotazione
        ['x', 'y', 'z'].forEach((axis, i) => {
            rotationInputs[i].value = parent.rotation[axis].toFixed(2);
        });

        // Aggiorna i valori di scala
        ['x', 'y', 'z'].forEach((axis, i) => {
            scaleInputs[i].value = parent.scale[axis].toFixed(2);
        });
    });
}