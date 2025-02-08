import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector("#canvas");

const scene = new THREE.Scene();

// Camera with better FOV
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement

// Helpers
// scene.add(new THREE.AxesHelper(6));
// scene.add(new THREE.GridHelper(100, 20));


// helps to load texures
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// scene.background = textureLoader.load('./images/stars.jpg')
scene.background = cubeTextureLoader.load([
    './images/stars.jpg',
    './images/stars.jpg',
    './images/stars.jpg',
    './images/stars.jpg',
    './images/stars.jpg',
    './images/stars.jpg'
]);

// planets 
// sun
let sunGeometry = new THREE.SphereGeometry(5, 30, 30);
let sunTexture = new THREE.MeshBasicMaterial({ map: textureLoader.load('./images/sun.jpg') })
let sun = new THREE.Mesh(sunGeometry, sunTexture)
sun.position.set(0, 3, 0)
scene.add(sun)

// mercury
let mercuryGeometry = new THREE.SphereGeometry(0.4, 30, 30);
let mercuryTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/mercury.jpg') })
let mercury = new THREE.Mesh(mercuryGeometry, mercuryTexture)
mercury.position.set(7, 1.2, 0)


const mercuryOrbit = new THREE.Object3D()
mercuryOrbit.position.set(sun.position.x, sun.position.y, sun.position.z)
mercuryOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
mercuryOrbit.add(mercury)
scene.add(mercuryOrbit)


// // venus
let venusGeometry = new THREE.SphereGeometry(0.6, 30, 30);
let venusTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/venus.jpg') })
let venus = new THREE.Mesh(venusGeometry, venusTexture)
venus.position.set(10, 4.5, 0)


const venusOrbit = new THREE.Object3D()
venusOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
venusOrbit.add(venus)
scene.add(venusOrbit)


// earth
let earthGeometry = new THREE.SphereGeometry(0.9, 30, 30);
let earthTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/earth.jpg') })
let earth = new THREE.Mesh(earthGeometry, earthTexture)
earth.position.set(14, 0.9, 0)

const earthOrbit = new THREE.Object3D()
earthOrbit.position.set(sun.position.x, sun.position.y, sun.position.z)
earthOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
earthOrbit.add(earth)
scene.add(earthOrbit)


// mars
let marsGeometry = new THREE.SphereGeometry(0.6, 30, 30);
let marsTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/mars.jpg') })
let mars = new THREE.Mesh(marsGeometry, marsTexture)
mars.position.set(16, 1.5, 0)


const marsOrbit = new THREE.Object3D()
marsOrbit.position.set(sun.position.x, sun.position.y, sun.position.z)
marsOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
marsOrbit.add(mars)
scene.add(marsOrbit)

// jupiter
let jupiterGeometry = new THREE.SphereGeometry(1, 30, 30);
let jupiterTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/jupiter.jpg') })
let jupiter = new THREE.Mesh(jupiterGeometry, jupiterTexture)
jupiter.position.set(20, 1.8, 0)


const jupiterOrbit = new THREE.Object3D()
jupiterOrbit.position.set(sun.position.x, sun.position.y, sun.position.z)
jupiterOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
jupiterOrbit.add(jupiter)
scene.add(jupiterOrbit)


// saturn
let saturnGeometry = new THREE.SphereGeometry(1.2, 30, 30);
let saturnTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/saturn.jpg') })
let saturn = new THREE.Mesh(saturnGeometry, saturnTexture)
saturn.position.set(26, 1.6, 0)


const saturnOrbit = new THREE.Object3D()
saturnOrbit.position.set(sun.position.x, sun.position.y, sun.position.z)
saturnOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
saturnOrbit.add(saturn)
scene.add(saturnOrbit)

// saturn ring
const saturnRingGeometry = new THREE.RingGeometry(1.4, 2.5, 30);
let saturnRingTexture = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: textureLoader.load("./images/saturn ring.png") })
let saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingTexture)
saturnRing.rotateX(Math.PI * 0.3)
saturn.add(saturnRing)


// uranus
let uranusGeometry = new THREE.SphereGeometry(0.8, 30, 30);
let uranusTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/uranus.jpg') })
let uranus = new THREE.Mesh(uranusGeometry, uranusTexture)
uranus.position.set(31, 2.5, 0)


const uranusOrbit = new THREE.Object3D()
uranusOrbit.position.set(sun.position.x, sun.position.y, sun.position.z)
uranusOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
uranusOrbit.add(uranus)
scene.add(uranusOrbit)

// uranus ring
const uranusRingGeometry = new THREE.RingGeometry(0.1, 1.5, 30);
let uranusRingTexture = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: textureLoader.load("./images/uranus ring.png"), color: 0x505050 })
let uranusRing = new THREE.Mesh(uranusRingGeometry, uranusRingTexture)
uranusRing.rotateY(Math.PI * 0.3)
uranus.add(uranusRing)



// neptune
let neptuneGeometry = new THREE.SphereGeometry(0.7, 30, 30);
let neptuneTexture = new THREE.MeshStandardMaterial({ map: textureLoader.load('./images/neptune.jpg') })
let neptune = new THREE.Mesh(neptuneGeometry, neptuneTexture)
neptune.position.set(34, 2.5, 0)


const neptuneOrbit = new THREE.Object3D()
neptuneOrbit.position.set(sun.position.x, sun.position.y, sun.position.z)
neptuneOrbit.rotateY(Math.random() * 200 * Math.random() * 500)
neptuneOrbit.add(neptune)
scene.add(neptuneOrbit)

// lights 
// light for sun 
let sunLight = new THREE.PointLight(0xffffff, 500);
sunLight.position.set(0, 3.5, 0)
scene.add(sunLight)

// Animation loop

function animate() {
    requestAnimationFrame(animate);

    // rotation 
    sun.rotateY(0.001);

    mercury.rotateY(0.001)
    mercuryOrbit.rotateY(0.0098);

    venus.rotateY(-0.01)
    venusOrbit.rotateY(0.0060);

    earth.rotateY(-0.01)
    earthOrbit.rotateY(0.0046);

    mars.rotateY(-0.01)
    marsOrbit.rotateY(0.0026);

    jupiter.rotateY(-0.01)
    jupiterOrbit.rotateY(0.0010);

    saturnOrbit.rotateY(0.0005);

    uranusOrbit.rotateY(0.0004);

    neptuneOrbit.rotateY(0.0003);

    controls.update();
    renderer.render(scene, camera);
}
animate();



// when any point of object is hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        console.log('Hovered Object:', intersects[0].object);
    }
});


// Handle window resize
window.addEventListener('resize', () => {
    // Update camera aspect ratio and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});