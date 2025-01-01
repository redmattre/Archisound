import * as THREE from 'three';
import { init, render, scene, control, debugGeo, debugGeo1, debugGeo2, LineaContinuaObj, debugGeo4 } from './setup.js';
import { standardMat, phongMat, normalMat, dashedMaterial, solidMaterial } from './materials.js';
import { loadObj, loadObjWithDashedEdges } from './loaders.js';


init();
render();
debugGeo();
// debugGeo1();
debugGeo2();
// LineaContinuaObj();
loadObjWithDashedEdges('parkinglot.obj', solidMaterial);