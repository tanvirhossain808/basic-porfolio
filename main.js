import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import typeFacFont from "three/examples/fonts/helvetiker_regular.typeface.json"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"


const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 1000);
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height)
})


camera.position.z = 2
camera.position.x = 1
camera.position.y = 1


const controls = new OrbitControls(camera, canvas);


/* 

*Fonts
*/
const fontLoader = new FontLoader();
fontLoader.load(
  "./public/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry(
      "Hello Tanvir Hossain",
      {
        font,
        size: .5,
        height: .2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: .03,
        bevelSize: .02,
        bevelOffset: 0,
        bevelSegments: 4
      }
    );
    const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
  }


);

controls.enableDamping = true
const renderer = new THREE.WebGLRenderer(
  { canvas: canvas }
);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
scene.add(camera);


renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  renderer.render(scene, camera)
  controls.update();

  window.requestAnimationFrame(tick)
}
tick();
