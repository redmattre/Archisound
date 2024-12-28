import * as THREE from 'three';

export let normalMat = new THREE.MeshNormalMaterial({
	transparent: false,
	depthTest: true,
	wireframe: false,
	opacity: 0.8
});

export let standardMat = new THREE.MeshStandardMaterial({
	color: new THREE.Color("green"),
	transparent: true,
	depthTest: true,
	wireframe: true,
	opacity: 0.8
});

export let phongMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color("orange"),
    shininess: 100,
    emissive: 0x000000,
    specular: 0x111111,
    transparent: false,
    wireframe: false,
    opacity: 0.5
});