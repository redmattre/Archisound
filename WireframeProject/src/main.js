import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createWireframeMaterial } from './wireframeMaterial.js';
import { addBarycentricCoordinates } from './utils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Creare la scena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Aggiungere gli OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;

// Luce
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Creare il materiale wireframe
const wireframeMaterial = createWireframeMaterial({ color: 0x111111, thickness: 1.5 });

// Creare il cubo
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// addBarycentricCoordinates(geometry);
// const cube = new THREE.Mesh(geometry, wireframeMaterial);
// scene.add(cube);

// Caricare un modello GLTF
const loader = new GLTFLoader();
loader.load('/modelli/ChiesaSuffragio.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            addBarycentricCoordinates(child.geometry);
            child.material = wireframeMaterial;
        }
    });
    scene.add(gltf.scene);
});

// Animazione
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Aggiorna gli OrbitControls
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();