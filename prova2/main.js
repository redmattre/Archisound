import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, control, orbit, orbitOrtho;
let raycaster, mouse, hoveredObject, objToBeDetected;
let halo, architecture;

//optimization
let needsRaycastUpdate = true;
let lastHoveredObject = null;

window.addEventListener('mousemove', () => {
    needsRaycastUpdate = true; // Update on mouse move
});

//materiali (con controlli)

// Selezione degli switch
document.querySelectorAll('.switch input').forEach((checkbox) => {
	checkbox.addEventListener('change', (event) => {
		const isChecked = event.target.checked;
		const switchId = event.target.getAttribute('data-id');
		toggleSwitch(switchId, isChecked);
	});
});

// Materiali Three.js
let normalMesh = new THREE.MeshNormalMaterial({
	transparent: false,
	depthTest: true,
	wireframe: false,
	opacity: 0.8
});

let standardMesh = new THREE.MeshStandardMaterial({
	color: new THREE.Color(0xff0000),
	transparent: false,
	depthTest: true,
	wireframe: false,
	opacity: 0.8
});

let archMaterial = new THREE.LineBasicMaterial({
	color: new THREE.Color(0xffffff),
	transparent: true,
	depthTest: true,
	wireframe: true,
	// opacity: 0.5
});

// Funzione di toggle per gli switch
function toggleSwitch(id, state) {
	switch (id) {
		case 'transparency':
			// Cambia il parametro 'transparent' in entrambi i materiali
			normalMesh.transparent = state;
			standardMesh.transparent = state;
			normalMesh.needsUpdate = true;
			standardMesh.needsUpdate = true;
			break;

		case 'alphaTest':
			// Cambia il parametro 'depthTest' in entrambi i materiali
			normalMesh.depthTest = state;
			standardMesh.depthTest = state;
			normalMesh.needsUpdate = true;
			standardMesh.needsUpdate = true;
			break;

		case 'wireframe':
			normalMesh.wireframe = state;
			standardMesh.wireframe = state;
			normalMesh.needsUpdate = true;
			standardMesh.needsUpdate = true;
			break;

		default:
			console.log('Switch non riconosciuto');
	}
}

init();
render();

function init() {

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	
	// Raycaster e puntatore
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	objToBeDetected = []; //metti qui dentro gli oggetti da raycastare

	// Listener per movimento del mouse
	function onPointerMove(event) {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	window.addEventListener('pointermove', onPointerMove);

	//cameras
	const aspect = window.innerWidth / window.innerHeight;

	const frustumSize = 3;

	cameraPersp = new THREE.PerspectiveCamera( 50, aspect, 0.1, 100 );
	cameraOrtho = new THREE.OrthographicCamera( - frustumSize * aspect, frustumSize * aspect, frustumSize, - frustumSize, 0.1, 100 );
	currentCamera = cameraPersp; //default camera

	currentCamera.position.set( 5, 1.5, 5 );

	//scene setup
	scene = new THREE.Scene();
	scene.add( new THREE.GridHelper( 5, 20, 0x888888, 0x444444 ) );

	const ambientLight = new THREE.AmbientLight( 0xffffff );
	scene.add( ambientLight );

	const light = new THREE.DirectionalLight( 0xffffff, 4 );
	light.position.set( 1, 1, 1 );
	scene.add( light );

	//Controlli scena prospettiva
	orbit = new OrbitControls( cameraPersp, renderer.domElement );
	orbit.update();
	orbit.addEventListener( 'change', render );

	//controlli scena ortogonale
	orbitOrtho = new OrbitControls( cameraOrtho, renderer.domElement );
	orbitOrtho.enableRotate = false;
	orbitOrtho.enablePan = false;
	orbitOrtho.enableZoom = true;
	orbitOrtho.update();
	orbitOrtho.addEventListener( 'change', render );

	control = new TransformControls( cameraPersp, renderer.domElement );

	control.setTranslationSnap(0.25);
	control.setRotationSnap(THREE.MathUtils.degToRad(15));
	control.setScaleSnap(0.05);

	control.addEventListener( 'change', render );
	control.addEventListener( 'dragging-changed', function ( event ) {

		orbit.enabled = ! event.value;

	} );

	const gizmo = control.getHelper();
	scene.add( gizmo );

	window.addEventListener( 'resize', onWindowResize );

	//prova gruppo
	// const geometry = new THREE.BoxGeometry();
	// const material = normalMesh;

	// const cubeA = new THREE.Mesh( geometry, material );
	// cubeA.position.set( 1, 1, 0 );
	// cubeA.name = `CubeA`;

	// const cubeB = new THREE.Mesh( geometry, material );
	// cubeB.position.set( -1, -1, 0 );
	// cubeB.name = `CubeB`;

	// //create a group and add the two cubes
	// //These cubes can now be rotated / scaled etc as a group
	// const group = new THREE.Group();
	// group.add( cubeA );
	// group.add( cubeB );
	// group.name = `Gruppo Test`;

	// scene.add( group );
	// objToBeDetected.push(group)
	// control.attach(group);

    //aggiungi obj loader
    const loader = new OBJLoader();
    loader.load(
        'halo2_lowpoly.obj',
        function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material = normalMesh; // Apply the custom material
                    // child.name = "halo2";
                }
            });
            halo = object;
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    const loaderArch = new OBJLoader();
    loaderArch.load(
        'simpleroom.obj',
        function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material = archMaterial; // Apply the custom material
                    // child.name = "halo2";
                }
            });
            architecture = object;
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );
}

function onWindowResize() {

	const aspect = window.innerWidth / window.innerHeight;

	cameraPersp.aspect = aspect;
	cameraPersp.updateProjectionMatrix();

	cameraOrtho.left = cameraOrtho.bottom * aspect;
	cameraOrtho.right = cameraOrtho.top * aspect;
	cameraOrtho.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	// render();

}

function onSettingsResize() {
    // Ottieni le dimensioni attuali del renderer
    const currentSize = new THREE.Vector2();
    renderer.getSize(currentSize);

    const currentWidth = currentSize.x;
    const currentHeight = currentSize.y;

    // Dimensioni target
    const targetWidth = window.innerWidth / 2;
    const targetHeight = window.innerHeight;

    const animationDuration = 250; // Durata in millisecondi
    const startTime = Date.now();

    function animateResize() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        // Interpolazione lineare tra dimensioni attuali e target
        const newWidth = currentWidth + (targetWidth - currentWidth) * progress;
        const newHeight = currentHeight + (targetHeight - currentHeight) * progress;

        // Ricalcola l'aspect ratio delle camere
        const aspect = newWidth / newHeight;

        cameraPersp.aspect = aspect;
        cameraPersp.updateProjectionMatrix();

        cameraOrtho.left = cameraOrtho.bottom * aspect;
        cameraOrtho.right = cameraOrtho.top * aspect;
        cameraOrtho.updateProjectionMatrix();

        // Aggiorna il renderer
        renderer.setSize(newWidth, newHeight);

        // Renderizza la scena
        renderNotRecursive();

        // Continua l'animazione se non è ancora completata
        if (progress < 1) {
            requestAnimationFrame(animateResize);
        }
    }

    animateResize();
}

function onSettingsResizeReverse() {
    // Ottieni le dimensioni attuali del renderer
    const currentSize = new THREE.Vector2();
    renderer.getSize(currentSize);

    const currentWidth = currentSize.x;
    const currentHeight = currentSize.y;

    // Dimensioni target (dimensioni complete)
    const targetWidth = window.innerWidth;
    const targetHeight = window.innerHeight;

    const animationDuration = 250; // Durata in millisecondi
    const startTime = Date.now();

    function animateResize() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        // Interpolazione lineare tra dimensioni attuali e target
        const newWidth = currentWidth + (targetWidth - currentWidth) * progress;
        const newHeight = currentHeight + (targetHeight - currentHeight) * progress;

        // Ricalcola l'aspect ratio delle camere
        const aspect = newWidth / newHeight;

        cameraPersp.aspect = aspect;
        cameraPersp.updateProjectionMatrix();

        cameraOrtho.left = cameraOrtho.bottom * aspect;
        cameraOrtho.right = cameraOrtho.top * aspect;
        cameraOrtho.updateProjectionMatrix();

        // Aggiorna il renderer
        renderer.setSize(newWidth, newHeight);

        // Renderizza la scena
        renderNotRecursive();

        // Continua l'animazione se non è ancora completata
        if (progress < 1) {
            requestAnimationFrame(animateResize);
        }
    }

    animateResize();
}

function render() {
    if (needsRaycastUpdate) {
        raycaster.setFromCamera(mouse, currentCamera);
        const intersects = raycaster.intersectObjects(objToBeDetected, true);
        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;
    
            if (hoveredObject !== lastHoveredObject) {
                const infoDiv = document.getElementById('infoDiv');
                infoDiv.textContent = `${hoveredObject.name}`;
                lastHoveredObject = hoveredObject;
            }
        } else {
            if (lastHoveredObject !== null) {
                const infoDiv = document.getElementById('infoDiv');
                infoDiv.textContent = ''; // Clear text when nothing is hovered
                lastHoveredObject = null;
            }
        }
        needsRaycastUpdate = false; // Reset flag
    }

    renderer.render(scene, currentCamera);
    requestAnimationFrame(render);
}

function renderNotRecursive() {

	raycaster.setFromCamera(mouse, currentCamera);
	const intersects = raycaster.intersectObjects(objToBeDetected, true);

	if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;

        // Mostra il nome dell'oggetto in un div
        const infoDiv = document.getElementById('infoDiv');
        infoDiv.textContent = `${hoveredObject.name}`;
    }

	renderer.render( scene, currentCamera );
	// requestAnimationFrame(render);

}

//Keyboard Functions

let toggle;

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
        case '+':
        case '=':
            control.setSize(control.size + 0.1);
            break;

        case '-':
        case '_':
            control.setSize(Math.max(control.size - 0.1, 0.1));
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

// window.addEventListener( 'keyup', function ( event ) {

// 	switch ( event.key ) {

// 		case 'Shift':
// 			control.setTranslationSnap( null );
// 			control.setRotationSnap( null );
// 			control.setScaleSnap( null );
// 			break;

// 	}

// } );

const navIcons = document.querySelectorAll('#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4');
const menu = document.getElementById("black-panel");
let settingsFlag = 1;

navIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        this.classList.toggle('open');
		const visualizzazione = document.getElementById('visualizzazione');
        
        if (settingsFlag % 2 === 0) {
            menu.style.opacity = 0;
            menu.style.pointerEvents = "none";
			
			visualizzazione.style.left = "44.8%";
			onSettingsResizeReverse();
        } else {
            menu.style.opacity = 1;
            menu.style.pointerEvents = "all";

			visualizzazione.style.left = "20.5%";
			onSettingsResize();
        }
        
        settingsFlag++;
    });
});

window.addEventListener('dblclick', function () {
    const currentZoom = currentCamera.zoom;

    if (currentCamera === cameraPersp) {
        currentCamera.position.set(5, 1.5, 5); // Posizione di default
        currentCamera.lookAt(0, 0, 0);
    } else if (currentCamera === cameraOrtho) {
        currentCamera.position.set(0, 1.5, 0); // Posizione dall'alto di default
        currentCamera.lookAt(0, 0, 0);
    }

    currentCamera.zoom = currentZoom;
    currentCamera.updateProjectionMatrix();

    orbit.target.set(0, 0, 0); // Reimposta il target al centro
    orbit.update();            // Aggiorna i controlli Orbit
});

// window.addEventListener('click', function (event) {
// 	raycaster.setFromCamera(mouse, currentCamera);
//     const intersects = raycaster.intersectObjects(objToBeDetected, true);

//     if (intersects.length > 0) {
        
//     } else {
//         orbit.enabled = true;  // Riabilita OrbitControls
//         control.detach();     // Disattacca TransformControls
//     }
// });

// Funzione per aggiornare il testo del div
function updateInfoText(text) {
    infoDiv.textContent = text || '---';
}

// Aggiungi un evento mousemove
window.addEventListener('mousemove', (event) => {
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

// Aggiungi un listener per il click del mouse
function addControlsOnClick() {
    raycaster.setFromCamera(mouse, currentCamera);
    const intersects = raycaster.intersectObjects(objToBeDetected, true);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // Attiva i controlli Orbit e disabilita TransformControls
        orbit.enabled = true; // Abilita i controlli Orbit
        control.detach();     // Rimuovi il TransformControls se presente

        // Attacca TransformControls all'oggetto cliccato
        control.attach(clickedObject);
        scene.add(control);
    } else {
        // Se non è stato cliccato nessun oggetto, disattiva i controlli
        orbit.enabled = true;  // Riabilita OrbitControls
        control.detach();     // Disattacca TransformControls
    }
}

function deleteObjectOnClick() {
    // Imposta il raycaster dalla posizione del mouse e dalla camera corrente
    raycaster.setFromCamera(mouse, currentCamera);

    // Trova gli oggetti intersecati
    const intersects = raycaster.intersectObjects(objToBeDetected, true);

    if (intersects.length > 0) {
        // Prendi il primo oggetto intersecato
        const intersectedObject = intersects[0].object;

        // Rimuovi l'oggetto dal suo genitore
        if (intersectedObject.parent) {
            intersectedObject.parent.remove(intersectedObject);
        }

        // Liberare memoria (opzionale, ma raccomandato)
        if (intersectedObject.geometry) {
            intersectedObject.geometry.dispose();
        }
        if (intersectedObject.material) {
            if (Array.isArray(intersectedObject.material)) {
                intersectedObject.material.forEach(mat => mat.dispose());
            } else {
                intersectedObject.material.dispose();
            }
        }

        console.log("Oggetto eliminato:", intersectedObject.name || intersectedObject.id);
    } else {
        console.log("Nessun oggetto intersecato.");
    }
}

//funzioni per creare gruppo///////////////////////////////////////////////////////////////////////////////
let isShiftPressed = false;
let group = null;

// Aggiungi un event listener per il tasto premuto (keydown)
window.addEventListener('keydown', function (event) {
    if (event.key === 'Shift' && !isShiftPressed) {
        isShiftPressed = true; // Imposta lo stato di Shift a true

        // Rimuovi il vecchio gruppo (se esiste) senza alterare gli oggetti
        if (group) {
            // Sposta tutti gli oggetti del gruppo nella scena mantenendo le trasformazioni globali
            while (group.children.length > 0) {
                const child = group.children[0];

                // Salva le trasformazioni globali
                const worldPosition = new THREE.Vector3();
                const worldQuaternion = new THREE.Quaternion();
                const worldScale = new THREE.Vector3();

                child.getWorldPosition(worldPosition); // Salva la posizione globale
                child.getWorldQuaternion(worldQuaternion); // Salva la rotazione globale
                child.getWorldScale(worldScale); // Salva la scala globale

                // Rimuovi l'oggetto dal gruppo
                group.remove(child);
                scene.add(child); // Aggiungi l'oggetto alla scena

                // Ripristina le trasformazioni globali
                child.position.copy(worldPosition);
                child.quaternion.copy(worldQuaternion);
                child.scale.copy(worldScale);

                // Assicurati che resti in `objToBeDetected`
                if (!objToBeDetected.includes(child)) {
                    objToBeDetected.push(child);
                }
            }

            // Rimuovi il gruppo dalla scena
            scene.remove(group);
        }

        // Crea un nuovo gruppo vuoto
        group = new THREE.Group();
        scene.add(group); // Aggiungi il nuovo gruppo alla scena
		// group.name = `Cubo-${scene.children.length}`;
		objToBeDetected.push(group);
    }
});

// Aggiungi un event listener per il tasto rilasciato (keyup)
window.addEventListener('keyup', function (event) {
    if (event.key === 'Shift') {
        isShiftPressed = false; // Imposta lo stato di Shift a false
        onShiftReleased(); // Azione da eseguire al rilascio di Shift
    }
});

// Aggiungi un event listener per il click del mouse
window.addEventListener('click', function (event) {
    if (isShiftPressed) {
        onShiftClick(event); // Azione da eseguire quando si fa click con Shift premuto
    }
});

// Funzione da eseguire quando si fa click con Shift premuto
function onShiftClick(event) {
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

        // Aggiungi l'oggetto al nuovo gruppo
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

// Funzione da eseguire quando si rilascia Shift
// Funzione da eseguire quando si rilascia Shift
function onShiftReleased() {
    if (group) {
        if (group.children.length < 2) {
            // Restituisci gli oggetti alla scena se il gruppo non è valido
            while (group.children.length > 0) {
                const child = group.children[0];

                // Salva le trasformazioni globali
                const worldPosition = new THREE.Vector3();
                const worldQuaternion = new THREE.Quaternion();
                const worldScale = new THREE.Vector3();

                child.getWorldPosition(worldPosition);
                child.getWorldQuaternion(worldQuaternion);
                child.getWorldScale(worldScale);

                // Rimuovi dal gruppo e aggiungi alla scena
                group.remove(child);
                scene.add(child);

                // Ripristina le trasformazioni globali
                child.position.copy(worldPosition);
                child.quaternion.copy(worldQuaternion);
                child.scale.copy(worldScale);

                // Reinserisci l'oggetto in objToBeDetected
                if (!objToBeDetected.includes(child)) {
                    objToBeDetected.push(child);
                }
            }

            // Rimuovi il gruppo dalla scena
            scene.remove(group);
            group = null; // Resetta il gruppo
            console.log('Il gruppo è stato eliminato perché conteneva meno di due oggetti.');
        } else {
            // Se il gruppo è valido, collega i controlli
            control.attach(group);
            console.log('Gruppo valido, controlli collegati.');
        }
    }
}

// UI buttons functions

document.getElementById('addCubeButton').addEventListener('click', () => {
	const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
	const material = normalMesh;
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0.5, 0);
	mesh.name = `Cubo-${scene.children.length}`
 	scene.add(mesh);
	objToBeDetected.push(mesh);
	// render();
});

document.getElementById('addSphereButton').addEventListener('click', () => {
	const geometry = new THREE.SphereGeometry(0.125, 10, 10);
	const material = normalMesh;
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0.5, 0);
	mesh.name = `Sfera-${scene.children.length}`
	scene.add(mesh);
	objToBeDetected.push(mesh);
	// render();
});

document.getElementById('addSpeakerButton').addEventListener('click', () => {
	const geometry = new THREE.ConeGeometry(0.125, 0.25, 20);
	const material = normalMesh;
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0.5, 0);
    mesh.rotation.x = Math.PI / -2;
	mesh.name = `Altoparlante-${scene.children.length}`
	scene.add(mesh);
	objToBeDetected.push(mesh);
	// render();
});

document.getElementById('addHaloButton').addEventListener('click', () => {
    const newHalo = halo.clone();
    const haloIndex = scene.children.filter(obj => obj.name.startsWith('Halo-')).length;
    newHalo.position.set(0, 0.5, 0);
    newHalo.name = `Halo-${haloIndex}`;
    newHalo.scale.set(0.125, 0.125, 0.125);

    // Update the names of child meshes
    newHalo.traverse((child) => {
        if (child.isMesh) {
            child.name = `HaloMesh-${haloIndex}`;
        }
    });

    scene.add(newHalo);
    objToBeDetected.push(newHalo);
});

document.getElementById('addCadFileButton').addEventListener('click', () => {
    if (!architecture) {
        console.error("Architecture model not loaded yet.");
        return;
    }

    // Clone the loaded object
    const newArch = architecture.clone();
    newArch.position.set(0, 0, 0);
    newArch.name = `Arch-${scene.children.length}`;

    // Create a group to hold both the edges and the transparent mesh
    const archGroup = new THREE.Group();

    newArch.traverse((child) => {
        if (child.isMesh) {
            // Edges Material (Lines)
            const edges = new THREE.EdgesGeometry(child.geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
            line.position.copy(child.position);
            line.rotation.copy(child.rotation);
            line.scale.copy(child.scale);

            archGroup.add(line); // Add the edges to the group

            // Transparent Grey Material
            const transparentMaterial = new THREE.MeshBasicMaterial({
                color: 0x808080, // Grey color
                opacity: 0.5,    // Transparency level
                transparent: true,
            });
            const transparentMesh = new THREE.Mesh(child.geometry, transparentMaterial);
            transparentMesh.position.copy(child.position);
            transparentMesh.rotation.copy(child.rotation);
            transparentMesh.scale.copy(child.scale);

            archGroup.add(transparentMesh); // Add the transparent mesh to the group
        }
    });

    scene.add(archGroup); // Add the group to the scene
    // objToBeDetected.push(archGroup); 

    // console.log(`Added group with edges and transparent material for ${newArch.name}`);
});

//max stuff

window.max.bindInlet("hello", function(){
	max.outlet("from the other side!");
});

window.max.bindInlet("meshlist", function(){
	sendMeshesToMax();
});

function sendMeshesToMax() {
    objToBeDetected.forEach((mesh) => {
        if (mesh.isMesh && mesh.name) {
            // Ottieni la posizione globale dell'oggetto
            const worldPosition = new THREE.Vector3();
            mesh.getWorldPosition(worldPosition);

            // Crea il messaggio con la sintassi richiesta
            const message = `dict set ${mesh.name} ${worldPosition.x} ${worldPosition.y} ${worldPosition.z}`;

            // Invia il messaggio a Max tramite l'outlet
            max.outlet(message);
        }
    });
}

//c'è qualcosa di strano perchè la z è in mezzo in realtà per qualche motivo
window.max.bindInlet("moveHalo", function(index, x, y, z) {
    // Construct the target object's name based on the index
    const targetName = `HaloMesh-${index}`;
    
    // Find the object in the scene by its name
    const targetObject = scene.getObjectByName(targetName);
    
    // If the object exists, move it to the specified position
    if (targetObject) {
        targetObject.position.set(x, y, z);
        // console.log(`Moved ${targetName} to position (${x}, ${y}, ${z})`);
    } else {
        // console.error(`Object with name ${targetName} not found in the scene.`);
    }
});

window.max.bindInlet("rotateHalo", function(index, x, y, z) {

    // Map 0-1 range to 0-2π radians (360 degrees)
    const xRotation = x * Math.PI * 2; // 0-1 mapped to 0-360° in radians
    const yRotation = y * Math.PI * 2;
    const zRotation = z * Math.PI * 2;

    // Construct the target object's name based on the index
    const targetName = `HaloMesh-${index}`;

    // Find the object in the scene by its name
    const targetObject = scene.getObjectByName(targetName);

    // If the object exists, set its rotation
    if (targetObject) {
        targetObject.rotation.set(xRotation, yRotation, zRotation);
        console.log(`Rotated ${targetName} to rotation (${xRotation}, ${yRotation}, ${zRotation})`);
    } else {
        console.error(`Object with name ${targetName} not found in the scene.`);
    }
});