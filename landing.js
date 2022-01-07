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
 
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(fogColor, 0.025, 30);



//PLANE

const planeGeomtery = new THREE.PlaneGeometry(5009,5000, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xD3D3D3, 
    side: THREE.DoubleSide, 

});
const planeMesh = new THREE.Mesh(planeGeomtery, planeMaterial); // Final obj with geomtery (vertecies in space) and material
scene.add(planeMesh);
planeMesh.rotation.x = Math.PI /2
// ADD obj to scene 
const loader = new GLTFLoader().setPath('./assets/models/monitor/');
let desktopModel = null;
loader.load( 'scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
    if(!desktopModel) {
        desktopModel = gltf.scene;
        console.log(desktopModel);
        desktopModel.position.x = 1.5;
        desktopModel.position.y = 0;
        desktopModel.position.z = -1;
        desktopModel.rotation.y = 12.03 
        desktopModel.castShadow = true;
    }

}, undefined, function ( error ) {

	console.error( error );

} );
loader.setPath('./assets/models/phone/');
let phoneModel = null;
loader.load( 'scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
    if(!phoneModel) {
        phoneModel = gltf.scene;
        console.log(phoneModel);
        phoneModel.position.x = 2;
        phoneModel.position.y = -6.5;
        phoneModel.position.z = 3.9;
        phoneModel.rotation.y = 12.03;
        // phoneModel.rotation.z = 3.03;
        phoneModel.scale.x = 0.3
        phoneModel.scale.y = 0.3
        phoneModel.scale.z = 0.3
        phoneModel.castShadow = true;
        console.log(phoneModel)
    }

}, undefined, function ( error ) {

	console.error( error );

} );


const ambientLight = new THREE.AmbientLight(
    0xffffff, 0.5
);
// ambientLight.position.set(0, 1, 1);
scene.add(ambientLight);
const lightDir = new THREE.DirectionalLight(
    0xffffff, 1
);
lightDir.position.set(1.5, 3, 6);

scene.add(lightDir);
// Backlight
const backLight = new THREE.DirectionalLight(
    0xffffff, 0.8
);
const color = 0xFFFFFF;
const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xD3D3D3;  // brownish orange
const intensity = 0.8;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

// backLight.position.set(0, -1, -1);
// scene.add(backLight);

new OrbitControls(camera, renderer.domElement);



camera.position.z = 4;
camera.position.y = 0.8;
camera.position.x = 1.5;

camera.lookAt(0,0.8,0);

function animate() {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate()

