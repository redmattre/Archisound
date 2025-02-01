import * as THREE from 'three';

export function addBarycentricCoordinates(geometry) {
    const count = geometry.attributes.position.count;
    const barycentric = [];

    for (let i = 0; i < count; i += 3) {
        barycentric.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    const array = new Float32Array(barycentric);
    geometry.setAttribute('barycentric', new THREE.BufferAttribute(array, 3));
}