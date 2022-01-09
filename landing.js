import gsap from './node_modules/gsap/index.js';
import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import * as dat from './node_modules/dat.gui/build/dat.gui.module.js';
import { GLTFLoader } from  'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';


//VARS
let scene , camera, renderer, orbit;
let desktopModel, phoneModel, laptopModel;
let plane;
let mouseX = 0;
// let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
// let windowHalfY = window.innerHeight / 2;

function init() {
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    document.body.appendChild( renderer.domElement );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    // const cameraHelper = new THREE.CameraHelper(camera);
    // scene.add(cameraHelper);

    //Renderer/Scene Serttings
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap ; // default THREE.PCFShadowMap
    let fogColor = new THREE.Color(0xF8F8F8);
    scene.background = 0xF8F8F8;
    scene.fog = new THREE.Fog( 0xffffff, 0.25, 50 )
    configureObjects();
}

function configureObjects() {
    // Floor
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: true , flatShading: true } ) );
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
    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enabled = false;
    orbit.enableDamping = true;


    camera.position.z = 60;
    camera.position.y = 1.5;
    camera.position.x = 0;

    camera.lookAt(-0.5, 1.5, -3);
    // orbit.target.set(-0.5, 1, -3);


    // Light helpers

    // const helper = new THREE.CameraHelper( lightDir.shadow.camera );
    // const helper2 = new THREE.CameraHelper( backLight.shadow.camera );
    // scene.add( helper );
    // scene.add( helper2 );
}

function loadObjects(){
    let p1 = loadModel('./assets/models/monitor/scene.glb').then(result => {  desktopModel = result.scene;});
    let p2 = loadModel('./assets/models/smartphone2/fixed_origin.glb').then(result => {  phoneModel = result.scene; });
    let p3 = loadModel('./assets/models/laptop/scene.glb').then(result => {  laptopModel = result.scene; });

    Promise.all([p1,p2,p3]).then(() => {
        // DESKTOP CONFIG
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
        // PHONE CONFIG
        phoneModel.position.x = 0;
        phoneModel.position.y = 1.5;
        phoneModel.position.z = -1.6;
        phoneModel.rotation.y = 0.123;
        // phoneModel.rotation.z = 3.03;
        phoneModel.scale.x = 0.015;
        phoneModel.scale.y = 0.015;
        phoneModel.scale.z = 0.015;
        // phoneModel.castShadow = true;
        // phoneModel.receiveShadow  = true;
        phoneModel.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        // var bbox = new THREE.BoxHelper(phoneModel, 0xff0000);
        // scene.add(bbox)
        // LAPTOP CONFIG
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
        //add model to the scene
        scene.add(desktopModel);
        scene.add(phoneModel);
        scene.add(laptopModel);
        
        animateElements();
        animate();
        animateCamera();
     });
}


//Animation loop
let frame = 0;
function animate() {
    frame += 0.001
    requestAnimationFrame( animate );
    // camera.position.x += ( mouseX - camera.position.x ) * .035;
    // camera.position.z += ( - mouseY - camera.position.y ) * .005;
    orbit.object.position.x += ( mouseX - camera.position.x ) * .35;
    orbit.update();
    // orbit.position.z += ( - mouseY - camera.position.y ) * .005;
    camera.lookAt(-0.5, 1.5, -3);
    if(phoneModel){
        phoneModel.rotation.y += Math.cos(frame)/ 1000;
        phoneModel.rotation.z += Math.sin(frame)/ 1000;
    }
    if (laptopModel) {
        laptopModel.rotation.z += Math.sin(frame)/ 5000;
        laptopModel.rotation.y += Math.cos(frame)/ 5000;
    }
    renderer.render( scene, camera );
};


// Helper FUNCTIONS

// loader models
function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

const animateElements = () => {
    //continue the process
    let canvas = document.querySelector('canvas');
    gsap.timeline({ 
        // defaults: { duration: 0.9 }
    })
    .to(canvas, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.inOut"
    })
    .to('#app', {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut"
    }, 0.9)
    .to('#wrapper', {
        top: '0%',
        duration: 0.4,
        ease: "power2.inOut"
    }, 0.9);
}

const animateCamera = () => {
    const tl = gsap.timeline({ repeat: 0, defaults: { ease: "easeIn" } });
    gsap.to(camera.position, {
      z: "3",
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        gsap.set(camera.position, { z: "3" });
      }
    }).delay(0.2);
    // return tl.timeScale(0.575);
};


function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 1000;
    // mouseY = ( event.clientY - windowHalfY ) / 1000;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    // windowHalfY = window.innerHeight / 2;
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

document.addEventListener( 'mousemove', onDocumentMouseMove );
window.addEventListener( 'resize', onWindowResize );
window.addEventListener( 'load', function(){
    init();
    loadObjects();
    let theme = 'light';
    const btn = document.querySelector('#dark-mode');
    btn.addEventListener('click', () =>{


        if(theme === 'light') {
            gsap.to('body', {color: 'white', duration: 0.2, ease: 'power2.inOut'});
            gsap.to('.text-transformJS', {color: 'white', duration: 0.2, ease: 'power2.inOut'});
            gsap.to('.btn-toChangeBgJS', {background: 'white', color: 'black', duration: 0.2, ease: 'power2.inOut'});
            gsap.to('.btn-toChangeBgJS span', { color: 'black', duration: 0.2, ease: 'power2.inOut'});

            scene.background = new THREE.Color(0x121212);
            scene.fog = new THREE.Fog( 0x121212, 0.25, 50 );
            plane.material.color = new THREE.Color(0x121212);

            // gsap.to(scene, {
            //     background: new THREE.Color(0x121212),
            //     fog: new THREE.Fog( 0x121212, 0.25, 50 ),
            //     duration: 0.3,
            //     ease: 'power2.out',
            // });
            // gsap.to(plane.material, {
            //     color: new THREE.Color(0x121212),
            //     duration: 0.3,
            //     ease: 'power2.out',
            // });
            theme = 'dark';
        } else {

            gsap.to('body', {color: 'black', duration: 0.2, ease: 'power2.inOut'});
            gsap.to('.text-transformJS', {color: 'black', duration: 0.2, ease: 'power2.inOut'});
            gsap.to('.btn-toChangeBgJS', {background: 'rgb(33, 33, 33)', color: 'white', duration: 0.2, ease: 'power2.inOut'});
            gsap.to('.btn-toChangeBgJS span', {color: 'white', duration: 0.2, ease: 'power2.inOut'});

            scene.background = new THREE.Color(0xF8F8F8);
            scene.fog = new THREE.Fog( 0xF8F8F8, 0.25, 50 )
            plane.material.color = new THREE.Color(0x999999);

            theme = 'light';
        }

    }) 
})