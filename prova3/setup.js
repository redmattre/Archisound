import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { standardMat, phongMat, dashedLineMat, dashedMaterial, solidMaterial, goochMaterial } from './materials.js';
import { loadObj } from './loaders.js';

export let scene, renderer, control, orbit, orbitOrtho;
export let objToBeDetected = [];
export let cameraPersp, cameraOrtho, currentCamera, camera;
let rendererBackgoundColor = 0xd6d6d6; //inizia bianco
// let rendererBackgoundColor = 0x000000; //inizia nero

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
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.autoClear = false;
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
    const geometry = new THREE.BoxGeometry(0.2,0.2,0.2);
	// const geometry = new THREE.SphereGeometry;
    const material = goochMaterial;
    const mesh = new THREE.Mesh(geometry, material);
	mesh.name = `debug-${scene.children.length}`
	mesh.isDashed = false;
    // control.attach(mesh);
    scene.add(mesh);
	objToBeDetected.push(mesh);
}

export function debugGeo1() {
    // const geometry = new THREE.TorusKnotGeometry(1, 0.3, 256, 32);
	const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const edges = new THREE.EdgesGeometry(geometry); // Crea una geometria di bordi
    const line = new THREE.LineSegments(edges, dashedLineMat);
    line.computeLineDistances(); // Necessario per il materiale LineDashedMaterial
    line.name = `debug-dashed-${scene.children.length}`;
	line.isDashed = true;
    scene.add(line);
    objToBeDetected.push(line);
}

export const zonaWIFI = new THREE.Group();

export function debugGeo2() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const edges = new THREE.EdgesGeometry(geometry); // Estrai gli edge del cubo

    // LineSegmentsGeometry compatibile con Line2
    const lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(edges);

    // Crea una LineSegments2 con il materiale dashed
    const line = new LineSegments2(lineGeometry, dashedMaterial);

    // Assicurati di abilitare il calcolo delle distanze (è richiesto per il dashed)
    line.computeLineDistances();
	line.name = `zonaWIFI`;
	line.isDashed = true;

	//parte della mesh
	const material = new THREE.MeshStandardMaterial({
		color: new THREE.Color(0xf25d00),
		transparent: true,
		depthTest: true,
		wireframe: false,
		opacity: 0.,
		visible: true
	});;
	const mesh = new THREE.Mesh(geometry, material);

    // scene.add(line);
	// scene.add(mesh);
	zonaWIFI.add(mesh);
	zonaWIFI.add(line);
	scene.add(zonaWIFI);
	objToBeDetected.push(line);
}


export function LineaContinuaObj() {
    const geometry = new THREE.BoxGeometry(1, 1, 1); 
	// const geometry = new THREE.TorusKnotGeometry(1, 0.3, 256, 32);
    const edges = new THREE.EdgesGeometry(geometry); // Estrai gli edge del cubo

    const lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(edges); // LineSegmentsGeometry compatibile
    const line = new LineSegments2(lineGeometry, solidMaterial); // Applica il materiale dashed

    scene.add(line); // Aggiungi alla scena
	line.name = "architettura";
	line.isDashed = true;
	objToBeDetected.push(line);
}

export function debugGeo4() {
    const geometry = loadObj('parkinglot.obj');
    const edges = new THREE.EdgesGeometry(geometry); // Estrai gli edge del cubo

    const lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(edges); // LineSegmentsGeometry compatibile
    const line = new LineSegments2(lineGeometry, solidMaterial); // Applica il materiale dashed

    scene.add(line); // Aggiungi alla scena
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