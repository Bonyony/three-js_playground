// this is th import for Three.js
import * as THREE from "three";
// this is OrbitControls, for moving the object with the mouse etc...
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// setup the basics
const w = window.innerWidth;
const h = window.innerHeight;
// sets up the canvas element. Best practice, but can be rendered without a canvas element
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
  alpha: true,
});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// (field of view)
const fov = 75;
// aspect ratio
const aspect = w / h;
//near camera pos
const near = 0.1;
//far camera pos
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//zooms out slightly (higher value = more zoom out)
camera.position.z = 14;

// creates the three.js scene I will use
const scene = new THREE.Scene();
// sets color to the entire background
scene.background = new THREE.Color("lightGray");

// // adds a strong fog effect where getting closer to the render lessens the fog
// {
//   const color = 0xffffff;
//   const density = 0.1;
//   scene.fog = new THREE.FogExp2(color, density);
// }
// Adds a weak fog effect, lets you pick where it begins
{
  const color = "#99c2cc";
  const near = 11;
  const far = 35;
  scene.fog = new THREE.Fog(color, near, far);
}

// Adds a plane of images
// {
//   const planeSize = 40;

//   const loader = new THREE.TextureLoader();
//   const texture = loader.load("PoolView.jpeg");
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   texture.magFilter = THREE.NearestFilter;
//   texture.colorSpace = THREE.SRGBColorSpace;
//   const repeats = planeSize / 2;
//   texture.repeat.set(repeats, repeats);

//   const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
//   const planeMat = new THREE.MeshBasicMaterial({
//     map: texture,
//     side: THREE.DoubleSide,
//   });
//   const mesh = new THREE.Mesh(planeGeo, planeMat);
//   mesh.rotation.x = Math.PI * -0.5;
//   scene.add(mesh);
// }

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
// makes the controls floatier...
// controls.enableDamping = true;
// controls.dampingFactor = 0.007;

// allows a texture (in this case an image to be overlayed on our geometry)
const loader = new THREE.TextureLoader();
const texture = loader.load("Portrait.jpeg");
texture.colorSpace = THREE.SRGBColorSpace;

// these lines create a sphere with standard material colored orange
const geo = new THREE.SphereGeometry(2, 10, 10);
const nat = new THREE.MeshStandardMaterial({
  //   color: "orange",
  //   flatShading: true,
  map: texture,
});
const mesh = new THREE.Mesh(geo, nat);
mesh.position.set(2, 0, -2);
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
mesh.add(wireMesh2);

// basic shapes to play with
{
  // Cube
  const cubeSize = 1.3;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
  const mesh2 = new THREE.Mesh(cubeGeo, cubeMat);
  mesh2.position.set(cubeSize + 2, cubeSize / 6, 3);
  scene.add(mesh2);
}
{
  // Sphere
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions
  );
  const loader = new THREE.TextureLoader();
  const texture = loader.load("PXL_20240416_213110075.jpeg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const sphereMat = new THREE.MeshPhongMaterial({ map: texture });
  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
  mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
  scene.add(mesh);

  function animate(t = 0) {
    requestAnimationFrame(animate);
    // these two lines make the sphere move through space
    // mesh.position.y = t * 0.0002;
    // mesh.position.x = t * 0.0002;
    // mesh.position.z = t * 0.0002;

    mesh.rotation.y = t * 0.0002;
    mesh.rotation.x = t * 0.0001;

    renderer.render(scene, camera);
    // allows for mouse and scroll use
    // controls.update();
  }
  animate();
}

// adds a basic lighting to the scene
const hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 1.5);
scene.add(hemiLight);

// adds directional lighting to the scene
// const light = new THREE.DirectionalLight(0xb1e1ff, 1.5);
// light.position.set(4, -10, 6);
// // the light will shine in the direction of the target
// light.target.position.set(5, 4, -8);
// scene.add(light);
// scene.add(light.target);

// animates the sphere
function animate(t = 0) {
  requestAnimationFrame(animate);
  // these two lines rotate the sphere
  mesh.rotation.y = t * 0.0002;
  mesh.rotation.x = t * 0.0001;
  wireMesh.rotation.y = -t * 0.0002;
  wireMesh.rotation.x = -t * 0.0001;
  wireMesh2.rotation.y = t * 0.0004;
  wireMesh2.rotation.x = t * 0.0002;

  renderer.render(scene, camera);
  // allows for mouse and scroll use
  // controls.update();
}
animate();
