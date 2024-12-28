import * as THREE from 'three';
import { init, render, scene, control, debugGeo } from './setup.js';
import { standardMat, phongMat, normalMat } from './materials.js';
import { loadObj } from './loaders.js';

init();
render();
// debugGeo();
loadObj('parkinglot.obj', normalMat);