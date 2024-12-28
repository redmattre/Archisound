import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { standardMat, phongMat } from './materials.js';

let cameraPersp, cameraOrtho, currentCamera, camera;
export let scene, renderer, control, orbit, orbitOrtho;
let rendererBackgoundColor = 0xf5f5f5; //inizia bianco

export function init() {

    //Scene setup
	scene = new THREE.Scene();
	scene.add( new THREE.GridHelper( 5, 20, 0x888888, 0x444444 ) );

	//Camere
	const aspect = window.innerWidth / window.innerHeight;
	const frustumSize = 4;
	cameraPersp = new THREE.PerspectiveCamera( 50, aspect, 0.2, 200 );
	cameraOrtho = new THREE.OrthographicCamera( - frustumSize * aspect, frustumSize * aspect, frustumSize, - frustumSize, 0.1, 200 );
	currentCamera = cameraPersp; //default camera
	currentCamera.position.set( 5, 1.5, 5 );

    //Lighting
	const ambientLight = new THREE.AmbientLight(0xe7e7e7, 1);
    scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Evidenzia forme
	directionalLight.position.set(5, 10, 7.5); // Una posizione sopra e leggermente di lato
	directionalLight.castShadow = true; // Se vuoi ombre
	scene.add(directionalLight);

	//luce "torcia"
	const pointLight = new THREE.PointLight(0xffffff, 1);
    cameraPersp.add(pointLight); //forse la luce solamente dalla perspective
    // cameraOrtho.add(pointLight);
	scene.add(currentCamera);

	//Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(rendererBackgoundColor);
	document.body.appendChild( renderer.domElement );

    //Controlli scena prospettiva
    orbit = new OrbitControls( cameraPersp, renderer.domElement );
	orbit.update();

    //Controlli scena ortogonale
    orbitOrtho = new OrbitControls( cameraOrtho, renderer.domElement );
	orbitOrtho.enableRotate = false;
	orbitOrtho.enablePan = false;
	orbitOrtho.enableZoom = true;
	orbitOrtho.update();

    initTransformControls();

    window.addEventListener( 'resize', onWindowResize );
}

export function render() {
    renderer.render(scene, currentCamera);
	requestAnimationFrame(render);
}

export function debugGeo() {
    // const geometry = new THREE.TorusKnotGeometry(1, 0.3, 256, 32);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = phongMat;
    const mesh = new THREE.Mesh(geometry, material);
    // control.attach(mesh);
    scene.add(mesh);
}

function initTransformControls() {
    control = new TransformControls( cameraPersp, renderer.domElement );

	control.setTranslationSnap(0.05);
	control.setRotationSnap(THREE.MathUtils.degToRad(15));
	control.setScaleSnap(0.05);

	control.addEventListener( 'dragging-changed', function ( event ) {

		orbit.enabled = ! event.value;

	} );

	const gizmo = control.getHelper();
	scene.add( gizmo );
}

function onWindowResize() {

	const aspect = window.innerWidth / window.innerHeight;

	cameraPersp.aspect = aspect;
	cameraPersp.updateProjectionMatrix();

	cameraOrtho.left = cameraOrtho.bottom * aspect;
	cameraOrtho.right = cameraOrtho.top * aspect;
	cameraOrtho.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}