import * as THREE from 'three';
import { Renderer } from './components/Renderer';
import { player, initializePlayer } from './components/Player';
import { Camera } from './components/Camera';
import { DirectionalLight } from './components/DirectionalLight';
import { map, initializeMap } from './components/Map';
import { animateVehicle } from './animateVehicle';
import { animatePlayer } from './animatePlayer';
import { hitTest } from './hitTest';
import './style.css';
import './collectUserInput';

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = new Camera();
player.add(camera);

const scoreDom = document.getElementById('score');
const resultDom = document.getElementById('result-container');

initializeGame();

document.querySelector('#retry')?.addEventListener('click', initializeGame)

function initializeGame() {
    initializePlayer();
    initializeMap();

    // initialize UI
    if (scoreDom) scoreDom.innerText = '0';
    if (resultDom) resultDom.style.visibility = 'hidden';
}

const renderer = Renderer();
// renderer.render(scene, camera);
renderer.setAnimationLoop(animate);

function animate() {
    animateVehicle();
    animatePlayer();
    hitTest();

    renderer.render(scene, camera);
}