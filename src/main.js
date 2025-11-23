import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10
);
camera.position.z = 2.5;
scene.add(camera);

// Geometry + material
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,   // ✅ fixed hex
  metalness: 0.5,
  roughness: 0.3,
  flatShading: true
});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

// Wireframe overlay
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// Light
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

// OrbitControls (✅ declared before use)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);

  mesh.rotation.y = t * 0.0001;
  mesh.rotation.x = t * 0.0001;

  // ✅ required for damping
  controls.update(); 
  renderer.render(scene, camera);
}
animate();
renderer.render(scene, camera)