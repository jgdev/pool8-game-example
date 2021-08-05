import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Game from "./pool8/game";

THREE.Cache.enabled = true;
const loadManager = new THREE.LoadingManager();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const light = new THREE.SpotLight(0xffffff, 0.9);
light.position.set(100, 0, 90);
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 1024; // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 0.005; // default
light.shadow.camera.far = 800;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0";
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 200;
controls.enablePan = true;
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const resources = {};

loadManager.onStart = () => {};
loadManager.onLoad = () => {
  console.log(resources);
  Game.getInstance({ renderer, scene, camera, light, resources }).init();
};

const fontLoader = new THREE.FontLoader(loadManager);
fontLoader.load(
  "/assets/fonts/droid/droid_serif_bold.typeface.json",
  (font) => {
    resources.DroidSerifBoldFont = font;
  }
);

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
