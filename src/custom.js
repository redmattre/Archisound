import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

export class CustomBoundingBox {
    constructor(object, color = 0xff0000, lineWidth = 2) {
        this.object = object; // L'oggetto su cui calcolare la bounding box
        this.color = color;   // Colore delle linee
        this.lineWidth = lineWidth; // Spessore delle linee
        this.lineSegments = null; // Contenitore per le linee
    
        // Inizializza la Box3
        this.box = new THREE.Box3(); // Aggiunto: inizializza un nuovo oggetto Box3
    
        this.createBoundingBox();
    }

    createBoundingBox() {
        // Calcola il bounding box dell'oggetto
        const box = new THREE.Box3().setFromObject(this.object);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        // Vertici del bounding box
        const vertices = [
            [box.min.x, box.min.y, box.min.z],
            [box.max.x, box.min.y, box.min.z],
            [box.max.x, box.min.y, box.max.z],
            [box.min.x, box.min.y, box.max.z],
            [box.min.x, box.max.y, box.min.z],
            [box.max.x, box.max.y, box.min.z],
            [box.max.x, box.max.y, box.max.z],
            [box.min.x, box.max.y, box.max.z],
        ];

        // Indici delle linee del bounding box
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
        ];

        // Crea la geometria
        const positions = [];
        for (const [start, end] of edges) {
            const v1 = vertices[start];
            const v2 = vertices[end];
            positions.push(...v1, ...v2);
        }

        const geometry = new LineSegmentsGeometry();
        geometry.setPositions(positions);

        // Crea il materiale con spessore personalizzato
        const material = new LineMaterial({
            color: this.color,
            linewidth: this.lineWidth, // Spessore in unità di schermo
        });

        material.resolution.set(window.innerWidth, window.innerHeight); // Risoluzione necessaria per calcolare lo spessore

        // Crea le linee
        this.lineSegments = new LineSegments2(geometry, material);
    }

    addToScene(scene) {
        if (this.lineSegments) {
            scene.add(this.lineSegments);
        }
    }

    update(margin = 0.1) { // Aggiungi un parametro di margine (valore predefinito 0.1)
        if (this.object && this.lineSegments) {
            const box = new THREE.Box3().setFromObject(this.object);
    
            // Applica il margine al bounding box
            box.expandByScalar(margin);
    
            const vertices = [
                [box.min.x, box.min.y, box.min.z],
                [box.max.x, box.min.y, box.min.z],
                [box.max.x, box.min.y, box.max.z],
                [box.min.x, box.min.y, box.max.z],
                [box.min.x, box.max.y, box.min.z],
                [box.max.x, box.max.y, box.min.z],
                [box.max.x, box.max.y, box.max.z],
                [box.min.x, box.max.y, box.max.z],
            ];
    
            const edges = [
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7],
            ];
    
            const positions = [];
            for (const [start, end] of edges) {
                const v1 = vertices[start];
                const v2 = vertices[end];
                positions.push(...v1, ...v2);
            }
    
            this.lineSegments.geometry.setPositions(positions);
        }
    }

    setTarget(object, margin = 0.1) { // Aggiungi un parametro di margine
        this.object = object;
        this.update(margin); // Chiama il metodo `update` con il margine
    }
    
    show() {
        if (this.lineSegments) {
            this.lineSegments.visible = true; // Mostra la bounding box
        }
    }
    
    hide() {
        if (this.lineSegments) {
            this.lineSegments.visible = false; // Nascondi la bounding box
        }
    }
}