import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpinValidPosition";
import { metaData as rows, addRows } from "./Map";

export const player = Player();
function Player() {
  const player = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  body.position.z = 10;
  body.castShadow = true;
  body.receiveShadow = true;

  player.add(body);
  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(2, 4, 2),
    new THREE.MeshLambertMaterial({
      color: 0xf0619a,
      flatShading: true,
    })
  );
  cap.position.z = 21;
  cap.castShadow= true;
  cap.receiveShadow = true;
  player.add(cap);

  const rightEye = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0, 2),
    new THREE.MeshLambertMaterial({
      color: "black",
      flatShading: true,
    })
  );
  rightEye.position.z = 17;
  rightEye.position.y = 8;
  rightEye.position.x = 3;
  player.add(rightEye);
  
  const leftEye = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0, 2),
    new THREE.MeshLambertMaterial({
      color: "black",
      flatShading: true,
    })
  );
  leftEye.position.z = 17;
  leftEye.position.y = 8;
  leftEye.position.x = -3;
  player.add(leftEye);

  const beakTop = new THREE.Mesh(
    new THREE.BoxGeometry(2, 4, 2),
    new THREE.MeshLambertMaterial({
      color: "yellow",
      flatShading: true,
    })
  );
  beakTop.position.z = 15;
  beakTop.position.y = 10;
  beakTop.castShadow= true;
  beakTop.receiveShadow = true;
  player.add(beakTop);

  const beakBottom = new THREE.Mesh(
    new THREE.BoxGeometry(1, 3, 1),
    new THREE.MeshLambertMaterial({
      color: "yellow",
      flatShading: true,
    })
  );
  beakBottom.position.z = 12.5;
  beakBottom.position.y = 9;
  beakBottom.castShadow= true;
  beakBottom.receiveShadow = true;
  player.add(beakBottom);


  const playerContainer = new THREE.Group();
  playerContainer.add(player);
  return playerContainer;
}


export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];


export function initializePlayer() {
  // Initialize the Three.js player object
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].position.z = 0;

  // Initialize metadata
  position.currentRow = 0;
  position.currentTile = 0;

  // Clear the moves queue
  movesQueue.length = 0;
}

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );
  if (!isValidMove) return;
  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === 'forward') position.currentRow += 1;
  if (direction === 'backward') position.currentRow -= 1;
  if (direction === 'left') position.currentTile -= 1;
  if (direction === 'right') position.currentTile += 1;

  // Add new rows if the player is running out of them
  if (position.currentRow > rows.length - 10) addRows();
  const scoreDom = document.getElementById("score");
  if (scoreDom && position.currentRow > scoreDom.innerText) {
    scoreDom.innerText = position.currentRow.toString();
  }
}
