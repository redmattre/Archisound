import * as THREE from 'three';
import { init, render, scene, control, debugGeo, debugGeo1, LineaContinuaObj, debugGeo4 } from './setup.js';
import { standardMat, phongMat, normalMat, dashedMaterial, solidMaterial, goochMaterial, goochMaterialSp } from './materials.js';
import { loadObj, loadObjWithDashedEdges } from './loaders.js';


init();
render();
// debugGeo();
// debugGeo1();
// debugGeo2();
// LineaContinuaObj();
// loadObjWithDashedEdges('provaarch1.obj', solidMaterial);
loadObjWithDashedEdges('parkinglot.obj', solidMaterial);
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., -0.5, 0.5)
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., 0, 0.5)
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., 0.5, 0.5)
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., 1., 0.5)