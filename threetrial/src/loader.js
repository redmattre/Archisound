import * as THREE from 'three';
import { scene } from "./main";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadGltfModel(filepath) {
    const loader = new GLTFLoader();

    // Ensure the path works in both dev and production (GitHub Pages)
    const fullPath = import.meta.env.BASE_URL + filepath;

    loader.load(
        fullPath,
        function (gltf) {
            const model = gltf.scene;

            // Position and scale adjustments (modify as needed)
            model.position.set(0, 0, 0);
            model.name = 'architettura';
            model.visible = true;

            // Add the model to the scene
            scene.add(model);

            console.log(`Loaded GLTF model: ${fullPath}`);
        },
        function (xhr) {
            console.log(`${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`);
        },
        function (error) {
            console.error('An error occurred while loading the GLTF model:', error);
        }
    );
}