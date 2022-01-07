import gsap from './node_modules/gsap/index.js';
import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import * as dat from './node_modules/dat.gui/build/dat.gui.module.js';
import { GLTFLoader } from  'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

console.log(GLTFLoader)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const fogColor = new THREE.Color(0xffffff);
 
scene.background = fogColor;
scene.fog = new THREE.Fog(fogColor, 0.025, 30);

// ADD obj to scene 
const loader = new GLTFLoader().setPath('./assets/models/monitor/');

//PLANE

const planeGeomtery = new THREE.PlaneGeometry(5009,5000, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xD3D3D3, 
    side: THREE.DoubleSide, 

});
const planeMesh = new THREE.Mesh(planeGeomtery, planeMaterial); // Final obj with geomtery (vertecies in space) and material
scene.add(planeMesh);
planeMesh.rotation.x = Math.PI /2

let desktopModel = null;
loader.load( 'scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
    if(!desktopModel) {
        desktopModel = gltf.scene;
        console.log(desktopModel);
        desktopModel.position.x = 2;
        desktopModel.position.y = 0;
        desktopModel.position.z = -2;
        desktopModel.rotation.y = 12.03 
    }

}, undefined, function ( error ) {

	console.error( error );

} );



const light = new THREE.DirectionalLight(
    0xffffff, 1
);

light.position.set(0, 1, 1);
scene.add(light);
// Backlight
const backLight = new THREE.DirectionalLight(
    0xffffff, 1
);

backLight.position.set(0, -1, -1);
scene.add(backLight);

new OrbitControls(camera, renderer.domElement);



camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 1.5;

camera.lookAt(0,0,0);

function animate() {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate()

