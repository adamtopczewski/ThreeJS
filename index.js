import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import * as dat from './node_modules/dat.gui/build/dat.gui.module.js';

// console.log(OrbitControls);

const gui = new dat.GUI();
const world = {
    plane: {
        width: 10,
        height: 10,
        widthSegments: 10,
        heightSegments: 10,
    }
}
gui.add(world.plane, 'width', 1, 20).onChange(generatePlane);
gui.add(world.plane, 'height', 1, 20).onChange(generatePlane);
gui.add(world.plane, 'widthSegments', 1, 50).onChange(generatePlane);
gui.add(world.plane, 'heightSegments', 1, 50).onChange(generatePlane);

function generatePlane() {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments);
    const {array} = planeMesh.geometry.attributes.position;
    for (let i=0; i < array.length; i+= 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];

        array[i + 2] = z + Math.random();
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Geomtery 
const planeGeomtery = new THREE.PlaneGeometry(10,10,10,10);
const planeMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide, flatShading: THREE.FlatShading})
const planeMesh = new THREE.Mesh(planeGeomtery, planeMaterial); // Final obj with geomtery (vertecies in space) and material
scene.add(planeMesh);

const {array} = planeMesh.geometry.attributes.position;

for (let i=0; i < array.length; i+= 3) {
    // console.log(i)
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
}


const light = new THREE.DirectionalLight(
    0xffffff, 1
);

light.position.set(0, 0, 1);
scene.add(light);
// Backlight
const backLight = new THREE.DirectionalLight(
    0xffffff, 1
);

backLight.position.set(0, 0, -1);
scene.add(backLight);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
//Animate
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
