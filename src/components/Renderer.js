import * as THREE from 'three';

export function Renderer() {
  const canvas = document.querySelector('canvas.game');
  if (!canvas) {
    throw new Error('Canvas element not found');
  }
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  return renderer;
}