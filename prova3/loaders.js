import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { scene } from './setup.js';

export function loadObj(filename, material) {
    const loader = new OBJLoader();

    loader.load(
        filename,
        function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material = material; // Applica il materiale
                }
            });

            // Aggiungi l'oggetto alla scena
            scene.add(object);

            console.log(`Loaded ${filename} successfully.`);
        },
        function (xhr) {
            console.log(`${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`);
        },
        function (error) {
            console.error('An error happened', error);
        }
    );
}