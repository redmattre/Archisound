import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';


let scene, renderer, control, orbit;

let normalMesh = new THREE.MeshNormalMaterial();

let cameras = [];
const views = [];

init();
render();

function init() {

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//basic scene
	scene = new THREE.Scene();
	scene.add( new THREE.GridHelper( 5, 10, 0x888888, 0x444444 ) );

	const ambientLight = new THREE.AmbientLight( 0xffffff );
	scene.add( ambientLight );

	const light = new THREE.DirectionalLight( 0xffffff, 4 );
	light.position.set( 1, 1, 1 );
	scene.add( light );

	//camera stuff
	const aspect = window.innerWidth / window.innerHeight;
	const frustumSize = 5;

	views.push(
		{
			left: 0., 
			bottom: 0.5, 
			width: 0.5, 
			height: 0.5, 
			fov: 50, 
			position: [5, 5, 5],  // Vista prospettica
			lookAt: [0, 0, 0],
			// background: 0x555555 
			
		},
		{
			left: 0.5, 
			bottom: 0.5, 
			width: 0.5, 
			height: 0.5, 
			// fov: 50, 
			position: [0, 10, 0],  // Vista dall'alto (ortogonale, guardando in basso)
			lookAt: [0, 0, 0],
			// background: 0x333333 
		},
		{
			left: 0.5, 
			bottom: 0, 
			width: 0.5, 
			height: 0.5, 
			// fov: 50, 
			position: [10, 0, 0], // Vista laterale destra
			lookAt: [0, 0, 0],
			// background: 0x777777 
		},
		{
			left: 0, 
			bottom: 0, 
			width: 0.5, 
			height: 0.5, 
			// fov: 50, 
			position: [0, 0, 10], // Vista frontale
			lookAt: [0, 0, 0],
			// background: 0x999999 
		}
	);

	for (let i = 0; i < views.length; i++) {
		const view = views[i];
		let camera; // Dichiarata con let per permettere la riassegnazione
	
		const cameraPerspective = new THREE.PerspectiveCamera(view.fov, aspect, 0.1, 100);
		const cameraOrthogonal = new THREE.OrthographicCamera(
			-frustumSize * aspect,
			frustumSize * aspect,
			frustumSize,
			-frustumSize,
			0.1,
			100
		);
	
		if (i === 0) {
			camera = cameraPerspective; 
		} else {
			camera = cameraOrthogonal;
		}
	
		camera.position.set(...view.position);
		camera.lookAt(0, 0, 0);
		cameras.push(camera);
	}

	//controls
	orbit = new OrbitControls( cameras[0], renderer.domElement );
	orbit.update();
	orbit.addEventListener( 'change', render );

	control = new TransformControls( cameras[0], renderer.domElement );
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

    // Aggiorna la matrice di proiezione di ogni camera
    cameras.forEach((camera, index) => {
        if (camera.isPerspectiveCamera) {
            camera.aspect = aspect;
        } else if (camera.isOrthographicCamera) {
            const frustumSize = 5; // Mantieni il frustumSize coerente con quello usato in init()
            camera.left = -frustumSize * aspect;
            camera.right = frustumSize * aspect;
            camera.top = frustumSize;
            camera.bottom = -frustumSize;
        }
        camera.updateProjectionMatrix();
    });

    // Aggiorna il renderer per la nuova dimensione dello schermo
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Renderizza di nuovo la scena
    render();
}

function render() {
    for (let i = 0; i < views.length; i++) {
        const view = views[i];
        const camera = cameras[i];

        const left = Math.floor(window.innerWidth * view.left);
        const bottom = Math.floor(window.innerHeight * view.bottom);
        const width = Math.ceil(window.innerWidth * view.width); // Usa Math.ceil
        const height = Math.ceil(window.innerHeight * view.height);

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);
        renderer.setScissorTest(true);
        renderer.setClearColor(view.background);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
    }
}

//Keyboard Functions

let toggle;

window.addEventListener( 'keydown', function ( event ) {
	
	switch ( event.key ) {
		case '0':
			toggle = !toggle;
			toggle ? scene.remove( gizmo ) : scene.add( gizmo );
		case 'q':
			control.setSpace( control.space === 'local' ? 'world' : 'local' );
			break;

		case 'Shift':
			control.setTranslationSnap( 1 );
			control.setRotationSnap( THREE.MathUtils.degToRad( 15 ) );
			control.setScaleSnap( 0.25 );
			break;

		case 'w':
			control.setMode( 'translate' );
			break;

		case 'e':
			control.setMode( 'rotate' );
			break;

		case 'r':
			control.setMode( 'scale' );
			break;
		case 'v':
			const randomFoV = Math.random() + 0.1;
			const randomZoom = Math.random() + 0.1;

			cameraPersp.fov = randomFoV * 160;
			cameraOrtho.bottom = - randomFoV * 500;
			cameraOrtho.top = randomFoV * 500;

			cameraPersp.zoom = randomZoom * 5;
			cameraOrtho.zoom = randomZoom * 5;
			onWindowResize();
			break;

		case '+':
		case '=':
			control.setSize( control.size + 0.1 );
			break;

		case '-':
		case '_':
			control.setSize( Math.max( control.size - 0.1, 0.1 ) );
			break;

		case 'x':
			control.showX = ! control.showX;
			break;

		case 'y':
			control.showY = ! control.showY;
			break;

		case 'z':
			control.showZ = ! control.showZ;
			break;

		case ' ':
			control.enabled = ! control.enabled;
			break;

		case 'Escape':
			control.reset();
			break;

	}

} );

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