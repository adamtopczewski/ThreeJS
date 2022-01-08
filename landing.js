import gsap from './node_modules/gsap/index.js';
import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import * as dat from './node_modules/dat.gui/build/dat.gui.module.js';
import { GLTFLoader } from  'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

console.log(GLTFLoader)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; // default THREE.PCFShadowMap
let fogColor = new THREE.Color(0xF8F8F8);
scene.background = fogColor;
// scene.fog = new THREE.FogExp2(fogColor, 0.05);



//PLANE

const planeGeomtery = new THREE.PlaneGeometry(5009,5000, 10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xF8F8F8, 
    side: THREE.DoubleSide, 

});
const planeMesh = new THREE.Mesh(planeGeomtery, planeMaterial); // Final obj with geomtery (vertecies in space) and material
scene.add(planeMesh);
planeMesh.rotation.x = Math.PI /2
// ADD obj to scene 
const loader = new GLTFLoader().setPath('./assets/models/monitor/');
let desktopModel = null;
loader.load( 'scene.glb', function ( gltf ) {
	scene.add( gltf.scene );
    if(!desktopModel) {
        desktopModel = gltf.scene;
        desktopModel.position.x = 1.5;
        desktopModel.position.y = 0;
        desktopModel.position.z = -2.8;
        desktopModel.rotation.y = 12.03 
        desktopModel.castShadow = true;
        desktopModel.scale.x = 1.3
        desktopModel.scale.y = 1.3
        desktopModel.scale.z = 1.3
    }

}, undefined, function ( error ) {

	console.error( error );

} );
loader.setPath('./assets/models/smartphone2/');
let phoneModel = null;
loader.load( 'scene.glb', function ( gltf ) {
    
	// scene.add( gltf.scenes[0] );
    scene.add( gltf.scene);
    if(!phoneModel) {
        phoneModel = gltf.scene;
        phoneModel.position.x = 1;
        phoneModel.position.y = 2;
        phoneModel.position.z = 0;
        phoneModel.rotation.y = 0;
        // phoneModel.rotation.z = 3.03;
        phoneModel.scale.x = 0.015;
        phoneModel.scale.y = 0.015;
        phoneModel.scale.z = 0.015;
        phoneModel.castShadow = true;
        console.log(phoneModel)
    }


}, undefined, function ( error ) {

	console.error( error );

} );


loader.setPath('./assets/models/laptop/');
let laptopModel = null;
loader.load( 'scene.glb', function ( gltf ) {
    
	// scene.add( gltf.scenes[0] );
    scene.add( gltf.scene);
    if(!laptopModel) {
        laptopModel = gltf.scene;
        laptopModel.position.x = 3;
        laptopModel.position.y = 2;
        // laptopModel.position.z = 0;
        // laptopModel.rotation.y = 0;
        laptopModel.rotation.z = 2;
        laptopModel.scale.x = 0.2
        laptopModel.scale.y = 0.2;
        laptopModel.scale.z = 0.2;
        laptopModel.castShadow = true;
    }


}, undefined, function ( error ) {

	console.error( error );

} );


const ambientLight = new THREE.AmbientLight(
    0xffffff, 0.8
);
// ambientLight.position.set(0, 1, 1);
scene.add(ambientLight);
const lightDir = new THREE.DirectionalLight(
    0xffffff, 1
);
lightDir.position.set(1.5, 3, 6);
lightDir.castShadow = true;
const helper = new THREE.DirectionalLightHelper( lightDir, 5 );
scene.add(helper);
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
let frame = 0;
function animate() {
    frame += 0.001
    requestAnimationFrame( animate );
    if(phoneModel){
        phoneModel.rotation.y += Math.cos(frame)/ 1000;
        // phoneModel.rotation.z += Math.sin(frame)/ 1000;
    }
    if (laptopModel) {
        laptopModel.rotation.z += Math.sin(frame)/ 10000;
        laptopModel.rotation.y += Math.cos(frame)/ 10000;
    }

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate()

