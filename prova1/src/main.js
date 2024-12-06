//imports

import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

//SETUP////////////////////////////////////////////////////////////
const scene = new THREE.Scene();

const aspectRatio = 15.4 / 10;

//aggiungere oggetti, elementi
const geometry =  new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = mesh.clone();
const mesh3 = mesh.clone();

scene.add(mesh, mesh2, mesh3);

mesh2.position.x = -2;
mesh3.position.x = 2;

// mesh.position.x = 2;
// mesh.position.set(1, 0, -2);
// mesh.rotation.y = Math.PI / 4;
// mesh.rotation.x = Math.PI / 4;
// mesh.position.x += 1; //spostare di 1
// mesh.position.add(new THREE.Vector3(1, 0.5, 0));//aggiungere vettori
// const pos2 = new THREE.Vector3(1.5, 1.5, 0); //Vector 3 è un modo astratto di 3js per chiamare gli array mi sembra di capire, ci sono anche da 2 e da 4
// mesh.position.copy(pos2);
// mesh2.scale.multiplyScalar(1.2); //per andare a moltiplicare su tutti e 3

//setup helper
// const axesHelper = new THREE.AxesHelper(2);
// mesh.add(axesHelper.clone());
// mesh2.add(axesHelper.clone());
// mesh3.add(axesHelper.clone());

// mesh2.rotation.y = Math.PI * 0.25; //in radianti non gradi

//setup scena
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 10); //(FOV, ratio?, near, far) -> near e far determinano due limiti entro i quali gli oggetti vengono renderizzati come piani di vicinanza e lontananza dalla camera
camera.position.z = 4;

//setup renderer
const renderer = new THREE.WebGLRenderer();

//inserire nel DOM il canvas su cui renderizza il renderer
document.body.appendChild(renderer.domElement);

//funzione per canvas dinamico nelle dimensioni
function resizeCanvas() {
    const height = window.innerHeight * 0.9;
    const width = height * aspectRatio;

    // Update the renderer size
    renderer.setSize(width, height);
   
    // Update the camera aspect ratio
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas); // Resize when the window is resized

//ANIMAZIONI//////////////////////////////////////////////////////

function tic() {
    renderer.render(scene, camera); //genera render ad ogni tic

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    requestAnimationFrame(tic); //richiama ricorsivamente tic
}

//AZIONI//////////////////////////////////////////////////////////

// renderer.render(scene, camera);

requestAnimationFrame(tic);