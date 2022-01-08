import gsap from './node_modules/gsap/index.js';
import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import * as dat from './node_modules/dat.gui/build/dat.gui.module.js';
import { GLTFLoader } from  'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';

//VARS
const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);
let mouseX = 0;
// let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
// let windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove );


//Renderer/Scene Serttings
renderer.setClearColor(0xffffff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap ; // default THREE.PCFShadowMap
let fogColor = new THREE.Color(0xF8F8F8);
scene.background = 0xF8F8F8;
scene.fog = new THREE.Fog( 0xffffff, 10, 50 )



// Floor
const plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add( plane );

// CUBE TEST 
// const cube = new THREE.BoxGeometry(1,1,1);
// const cubeeMaterial = new THREE.MeshStandardMaterial({ 
//     roughness: 0.9,
//     color: 0xf3f3f3,
//     metalness: 0.1,
//     bumpScale: 0.0005
// });
// const cubeMesh = new THREE.Mesh(cube, cubeeMaterial); 

// cubeMesh.receiveShadow  = true;
// cubeMesh.castShadow = true;

// cubeMesh.position.y = 1.5;
// scene.add(cubeMesh);


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
        desktopModel.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        desktopModel.receiveShadow  = true;
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
        phoneModel.position.x = 0.2;
        phoneModel.position.y = 1.5;
        phoneModel.position.z = -1;
        phoneModel.rotation.y = 0;
        // phoneModel.rotation.z = 3.03;
        phoneModel.scale.x = 0.015;
        phoneModel.scale.y = 0.015;
        phoneModel.scale.z = 0.015;
        phoneModel.castShadow = true;
        phoneModel.receiveShadow  = true;
        phoneModel.children[0].children[0].children[0].traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
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
        laptopModel.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        laptopModel.receiveShadow  = true;
    }


}, undefined, function ( error ) {

	console.error( error );

} );




// LIGHTS
//Ambient
const ambientLight = new THREE.AmbientLight(
    0xffffff, 0.8
);
scene.add(ambientLight);

//DIR
const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( 0, 10, 3 );
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048; // default
dirLight.shadow.mapSize.height = 2048; // defaul
dirLight.shadow.camera.top = 5;
dirLight.shadow.camera.bottom = - 5;
dirLight.shadow.camera.left = - 5;
dirLight.shadow.camera.right = 5;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
scene.add( dirLight );


//Hemi
const color = 0xFFFFFF;
const skyColor = 0xF7F1F1;  // light blue
const groundColor = 0x999999;  // brownish orange
const intensity = 0.5;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);


//Camera & Orbit
// const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.z = 3;
camera.position.y = 1.5;
camera.position.x = 0;


camera.lookAt(-0.5, 1, -3);
// orbit.target.set(-0.5, 1, -3);


// Light helpers

// const helper = new THREE.CameraHelper( lightDir.shadow.camera );
// const helper2 = new THREE.CameraHelper( backLight.shadow.camera );
// scene.add( helper );
// scene.add( helper2 );


//Animation loop
let frame = 0;
function animate() {
    frame += 0.001
    requestAnimationFrame( animate );
    camera.position.x += ( mouseX - camera.position.x ) * .035;
    // camera.position.z += ( - mouseY - camera.position.y ) * .005;
    camera.lookAt(-0.5, 1, -3);
    if(phoneModel){
        phoneModel.rotation.y += Math.cos(frame)/ 1000;
        phoneModel.rotation.z += Math.sin(frame)/ 100000;
    }
    if (laptopModel) {
        laptopModel.rotation.z += Math.sin(frame)/ 5000;
        laptopModel.rotation.y += Math.cos(frame)/ 5000;
    }

    renderer.render( scene, camera );
};

animate()

// FUNCTIONS


function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 1000;
    // mouseY = ( event.clientY - windowHalfY ) / 1000;

}