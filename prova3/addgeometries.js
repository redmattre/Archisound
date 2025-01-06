import * as THREE from 'three';
import { loadObj } from './loaders.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { dashedMaterial, dashedMaterialB, dashedMaterialC, dashedMaterialD, goochMaterialSp } from './materials.js';
import { objToBeDetected, scene } from './setup.js';
import { color } from 'three/tsl';

const addSpeaker = document.getElementById('addCone');
const addHalo = document.getElementById('addHalo');
const addZone = document.getElementById('addZone');

let howManySpeakers = 0;

addSpeaker.addEventListener('click', (event) => {
    howManySpeakers++;
    let nome = `Altoparlante ${howManySpeakers}`
    loadObj('speaker3dec.obj', nome, goochMaterialSp, 0.025, 0., 0, 0.5);
});

let howManyHalos = 0;

addHalo.addEventListener('click', (event) => {
    howManyHalos++;
    let nome = `Aureola ${howManyHalos}`
    loadObj('halo2_lowpoly.obj', nome, goochMaterialSp, 0.08, 0., 0, 0.5);
});

let howManyZones = 0;

addZone.addEventListener('click', (event) => {
    howManyZones++;
    let color;
    let nome = `Zona ${howManyZones}`
    switch(howManyZones) {
        case 1:
            color = dashedMaterial;
            break;
        case 2:
            color = dashedMaterialB;
            break;
        case 3:
            color = dashedMaterialC;
            break;
        case 4:
            color = dashedMaterialD;
            break;
        default:
			color = dashedMaterial;
    }
    newZone(false, nome, color, 0., 0., 0.5);
});

function newZone(boolgeo, name, materiale, x, y, z) {

    const zonaWIFI = new THREE.Group();

    let geometry;

    if (!boolgeo) {
        geometry = new THREE.BoxGeometry(2, 1, 2);
        // console.log('qui ci sono!');
    } else {
        geometry = new THREE.SphereGeometry(0.25, 20, 20);
    }
    
    const edges = new THREE.EdgesGeometry(geometry); // Estrai gli edge del cubo

    // LineSegmentsGeometry compatibile con Line2
    const lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(edges);

    // Crea una LineSegments2 con il materiale dashed
    const line = new LineSegments2(lineGeometry, materiale);

    // Assicurati di abilitare il calcolo delle distanze (è richiesto per il dashed)
    line.computeLineDistances();
	line.name = `${name}`;
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
	zonaWIFI.position.set(x, z, y);
	scene.add(zonaWIFI);
	objToBeDetected.push(line);
}