import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders.js';

export function createWireframeMaterial({ color = 0xff0000, thickness = 4.0 } = {}) {
    return new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            color: { value: new THREE.Color(color) },
            thickness: { value: thickness }
        }
    });
}