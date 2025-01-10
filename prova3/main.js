import * as THREE from 'three';
import { init, render, scene, control } from './setup.js';
import { standardMat, phongMat, normalMat, dashedMaterial, solidMaterial, goochMaterial, goochMaterialSp, goochMaterialAlpha, goochMaterialArrow } from './materials.js';
import { loadObj, loadObjWithDashedEdges } from './loaders.js';


init();
render();
// debugGeo();
// debugGeo1();
// debugGeo2();
// LineaContinuaObj();
// loadObjWithDashedEdges('provaarch1.obj', solidMaterial);
loadObjWithDashedEdges('parkinglot.obj', solidMaterial);
// loadObj('arrow.obj', 'Freccia', goochMaterialArrow, 0.025, 0., 0., 0.5)
// loadObjWithDashedEdges('provaarch1.obj', solidMaterial);
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., -0.5, 0.5)
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., 0, 0.5)
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., 0.5, 0.5)
// loadObj('speaker3dec.obj', goochMaterialSp, 0.025, 0., 1., 0.5)