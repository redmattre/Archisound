import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

let scene, renderer, control, orbit;
let normalMesh = new THREE.MeshNormalMaterial();



init();
render();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(5, 10, 0x888888, 0x444444));

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Define views and cameras
    const aspect = window.innerWidth / window.innerHeight;

    views.push(
        { left: 0, bottom: 0.5, width: 0.5, height: 0.5, fov: 50, position: [5, 2.5, 5], background: 0x333333 },
        { left: 0.5, bottom: 0.5, width: 0.5, height: 0.5, fov: 50, position: [5, 0, 5], background: 0x555555 },
        { left: 0, bottom: 0, width: 0.5, height: 0.5, fov: 50, position: [0, 2.5, 5], background: 0x777777 },
        { left: 0.5, bottom: 0, width: 0.5, height: 0.5, fov: 50, position: [5, 2.5, 0], background: 0x999999 }
    );

    for (let i = 0; i < views.length; i++) {
        const view = views[i];
        const camera = new THREE.PerspectiveCamera(view.fov, aspect, 0.1, 100);
        camera.position.set(...view.position);
        camera.lookAt(0, 0, 0);
        cameras.push(camera);
    }

    // Controls
    orbit = new OrbitControls(cameras[0], renderer.domElement); // Bind orbit controls to the first camera
    orbit.update();
    orbit.addEventListener('change', render);

    control = new TransformControls(cameras[0], renderer.domElement);
    control.addEventListener('change', render);
    control.addEventListener('dragging-changed', function (event) {
        orbit.enabled = !event.value;
    });
    scene.add(control);

    window.addEventListener('resize', onWindowResize);

    // Add event listeners for UI buttons
    setupUIButtons();
}

function setupUIButtons() {
    document.getElementById('addCubeButton').addEventListener('click', () => {
        const geometry = new THREE.BoxGeometry();
        const material = normalMesh;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0.5, 0);
        scene.add(mesh);
        control.attach(mesh);
    });

    document.getElementById('addSphereButton').addEventListener('click', () => {
        const geometry = new THREE.SphereGeometry();
        const material = normalMesh;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0.5, 0);
        scene.add(mesh);
        control.attach(mesh);
    });

    document.getElementById('addSpeakerButton').addEventListener('click', () => {
        const geometry = new THREE.ConeGeometry();
        const material = normalMesh;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0.5, 0);
        scene.add(mesh);
        control.attach(mesh);
    });
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    for (let camera of cameras) {
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function render() {
    for (let i = 0; i < views.length; i++) {
        const view = views[i];
        const camera = cameras[i];

        const left = Math.floor(window.innerWidth * view.left);
        const bottom = Math.floor(window.innerHeight * view.bottom);
        const width = Math.floor(window.innerWidth * view.width);
        const height = Math.floor(window.innerHeight * view.height);

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);
        renderer.setScissorTest(true);
        renderer.setClearColor(view.background);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
    }
}

// Keyboard controls (add any extra logic if needed)
// ...