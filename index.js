import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// setup the basics
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// (field of view)
const fov = 75;
// aspect ratio
const aspect = w / h;
//near camera pos
const near = 0.1;
//far camera pos
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//zooms out slightly (higher value = more zoom out)
camera.position.z = 3;

// creates the three.js scene I will use
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.007;

// allows a texture (in this case an image to be overlayed on our geometry)
const loader = new THREE.TextureLoader();
const texture = loader.load("Portrait.jpeg");
texture.colorSpace = THREE.SRGBColorSpace;

// these lines create a sphere with standard material colored orange
const geo = new THREE.SphereGeometry(1.2, 10, 10);
const nat = new THREE.MeshStandardMaterial({
  //   color: "orange",
  //   flatShading: true,
  map: texture,
});
const mesh = new THREE.Mesh(geo, nat);
scene.add(mesh);

// these lines create a wireframe around my sphere
const wireMat = new THREE.MeshBasicMaterial({
  color: "white",
  wireframe: true,
});
const wireMat2 = new THREE.MeshBasicMaterial({
  color: "blue",
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
const wireMesh2 = new THREE.Mesh(geo, wireMat2);
// scales the wireframe slightly away from touching the sphere
wireMesh.scale.setScalar(1.2);
wireMesh2.scale.setScalar(1.4);
mesh.add(wireMesh);
// mesh.add(wireMesh2);

// adds a basic lighting to the scene
const hemiLight = new THREE.HemisphereLight("white", "black");
scene.add(hemiLight);

// animates the sphere
function animate(t = 0) {
  requestAnimationFrame(animate);
  // these two lines rotate the sphere
  //   mesh.rotation.y = t * 0.0002;
  //   mesh.rotation.x = t * 0.0001;

  renderer.render(scene, camera);
  // allows for mouse and scroll use
  controls.update();
}
animate();
