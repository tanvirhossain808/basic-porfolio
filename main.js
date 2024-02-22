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
const textureleLoader = new THREE.TextureLoader();
const matCapTexture = textureleLoader.load("./matcaps/1.png")
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 1000);
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height)
})


camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1


const controls = new OrbitControls(camera, canvas);
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/* 

*Fonts
*/
const fontLoader = new FontLoader();
fontLoader.load(
  "./fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry(
      'Tanvir Hossain. \n web developer .',

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
    // console.log(textGeometry.computeBoundingBox())
    // textGeometry.translate(
    //   -(textGeometry.boundingBox.max.x - .02) * .5,
    //   - (textGeometry.boundingBox.max.y * .5 - .02) * .5,
    //   - (textGeometry.boundingBox.max.z * .5 - .03) * .5,
    // )
    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matCapTexture,
      wireframe: true
    });
    // textMaterial.wireframe = true


    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
    console.time("donut")
    const donutGeometry = new THREE.TorusGeometry(.3, .2, 20, 45)
    for (let i = 0; i <= 500; i++) {
      const donut = new THREE.Mesh(donutGeometry, textMaterial)
      donut.position.x = (Math.random() - .5) * 10
      donut.position.y = (Math.random() - .5) * 10
      donut.position.z = (Math.random() - .5) * 10
      donut.rotation.x = Math.random() * Math.PI
      donut.rotation.y = Math.random() * Math.PI
      const scale = Math.random()
      donut.scale.set(scale, scale, scale)
      scene.add(donut)
    }
    console.timeEnd('donut')
    console.log(textGeometry.boundingBox)
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
