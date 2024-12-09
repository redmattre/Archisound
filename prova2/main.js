import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, control, orbit, orbitOrtho;
let raycaster, mouse, hoveredObject;

let normalMesh = new THREE.MeshNormalMaterial();

init();
render();

function init() {

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const aspect = window.innerWidth / window.innerHeight;

	const frustumSize = 3;

	cameraPersp = new THREE.PerspectiveCamera( 50, aspect, 0.1, 100 );
	cameraOrtho = new THREE.OrthographicCamera( - frustumSize * aspect, frustumSize * aspect, frustumSize, - frustumSize, 0.1, 100 );
	currentCamera = cameraPersp; //default camera

	currentCamera.position.set( 5, 2.5, 5 );

	scene = new THREE.Scene();
	scene.add( new THREE.GridHelper( 5, 10, 0x888888, 0x444444 ) );

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
	control.addEventListener( 'change', render );
	control.addEventListener( 'dragging-changed', function ( event ) {

		orbit.enabled = ! event.value;

	} );

	const gizmo = control.getHelper();
	scene.add( gizmo );

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	const aspect = window.innerWidth / window.innerHeight;

	cameraPersp.aspect = aspect;
	cameraPersp.updateProjectionMatrix();

	cameraOrtho.left = cameraOrtho.bottom * aspect;
	cameraOrtho.right = cameraOrtho.top * aspect;
	cameraOrtho.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function render() {

	renderer.render( scene, currentCamera );

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
            onWindowResize();
            break;

        case '2':
            // Attiva la camera ortogonale dall'alto
            currentCamera = cameraOrtho;
            orbit.enabled = false; // Disabilita i controlli Orbit
			orbitOrtho.enabled = true;
            currentCamera.position.set(0, 5, 0); // Posizione dall'alto
            currentCamera.lookAt(0, 0, 0); // Guarda verso il centro della scena
            control.camera = currentCamera; // Aggiorna la camera nei controlli
            onWindowResize();
            break;

        case '3':
            // Attiva la camera ortogonale da di fronte
            currentCamera = cameraOrtho;
            orbit.enabled = false; // Disabilita i controlli Orbit
			orbitOrtho.enabled = true;
            currentCamera.position.set(0, 0, 5); // Posizione da di fronte
            currentCamera.lookAt(0, 0, 0); // Guarda verso il centro della scena
            control.camera = currentCamera; // Aggiorna la camera nei controlli
            onWindowResize();
            break;

        case '4':
            // Attiva la camera ortogonale da destra
            currentCamera = cameraOrtho;
            orbit.enabled = false; // Disabilita i controlli Orbit
			orbitOrtho.enabled = true;
            currentCamera.position.set(5, 0, 0); // Posizione da destra
            currentCamera.lookAt(0, 0, 0); // Guarda verso il centro della scena
            control.camera = currentCamera; // Aggiorna la camera nei controlli
            onWindowResize();
            break;
        // Aggiungi il resto delle tue azioni per altri tasti
        case 'q':
            control.setSpace(control.space === 'local' ? 'world' : 'local');
            break;

        case 'Shift':
            control.setTranslationSnap(1);
            control.setRotationSnap(THREE.MathUtils.degToRad(15));
            control.setScaleSnap(0.25);
            break;

        case 'w':
            control.setMode('translate');
            break;

        case 'e':
            control.setMode('rotate');
            break;

        case 'r':
            control.setMode('scale');
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

        case 'v':
            const randomFoV = Math.random() + 0.1;
            const randomZoom = Math.random() + 0.1;
            cameraPersp.fov = randomFoV * 160;
            cameraOrtho.bottom = -randomFoV * 500;
            cameraOrtho.top = randomFoV * 500;
            cameraPersp.zoom = randomZoom * 5;
            cameraOrtho.zoom = randomZoom * 5;
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

        // case 'x':
        //     control.showX = !control.showX;
        //     break;

        // case 'y':
        //     control.showY = !control.showY;
        //     break;

        // case 'z':
        //     control.showZ = !control.showZ;
        //     break;

        // case ' ':
        //     control.enabled = !control.enabled;
        //     break;

        case 'Escape':
            control.reset();
            break;
    }
});

window.addEventListener('dblclick', function () {
    // Salva il valore corrente dello zoom
    const currentZoom = currentCamera.zoom;

    if (currentCamera === cameraPersp) {
        // Resetta posizione e direzione per la camera prospettica
        currentCamera.position.set(5, 2.5, 5); // Posizione di default
        currentCamera.lookAt(0, 0, 0);         // Punta al centro della scena
    } else if (currentCamera === cameraOrtho) {
        // Resetta posizione per la camera ortogonale
        currentCamera.position.set(0, 5, 0);   // Posizione dall'alto di default
        currentCamera.lookAt(0, 0, 0);         // Punta al centro della scena
    }

    // Mantiene lo zoom attuale
    currentCamera.zoom = currentZoom;
    currentCamera.updateProjectionMatrix();

    // Resetta il pan
    orbit.target.set(0, 0, 0); // Reimposta il target al centro
    orbit.update();            // Aggiorna i controlli Orbit
});

window.addEventListener( 'keyup', function ( event ) {

	switch ( event.key ) {

		case 'Shift':
			control.setTranslationSnap( null );
			control.setRotationSnap( null );
			control.setScaleSnap( null );
			break;

	}

} );

// UI buttons functions

document.getElementById('addCubeButton').addEventListener('click', () => {
	const geometry = new THREE.BoxGeometry();
	const material = normalMesh;
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0.5, 0);
 	scene.add(mesh);

	// Attach transform controls to the cube
	control.attach(mesh);
});

document.getElementById('addSphereButton').addEventListener('click', () => {
	const geometry = new THREE.SphereGeometry();
	const material = normalMesh;
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0.5, 0);
	scene.add(mesh);

	// Attach transform controls to the cube
	control.attach(mesh);
});

document.getElementById('addSpeakerButton').addEventListener('click', () => {
	const geometry = new THREE.ConeGeometry();
	const material = normalMesh;
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0.5, 0);
	scene.add(mesh);

	// Attach transform controls to the cube
	control.attach(mesh);
});



//max stuff

window.max.bindInlet("hello", function(){
	max.outlet("from the other side!");
});