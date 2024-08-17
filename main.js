import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Setup
let spaceship;
let textMesh;
let textMesh1;
let hue = 0;
let angle = 8; // Angle to determine the spaceship's position in the orbit
const orbitRadius = 1.5; // Radius of the orbit
const orbitRadiusMoon = 11.5;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


const loader = new GLTFLoader();
loader.load('spaceship.glb', function (gltf) {
    spaceship = gltf.scene; // Assign the loaded spaceship to the global variable
    spaceship.position.set(0, 0, 8); // Position the spaceship
    spaceship.scale.set(0.05,0.05,0.05)
    scene.add(spaceship);
}, undefined, function (error) {
    console.error(error);
});

const floader = new THREE.FontLoader();
floader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new THREE.TextGeometry('Ameel Valjee', {
    font: font,
    size: 2,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.05,
    bevelOffset: 0,
    bevelSegments: 10
});
const textGeometry1 = new THREE.TextGeometry('Welcome to my Universe', {
  font: font,
  size: 1,
  height: 0.2,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.001,
  bevelSize: 0.001,
  bevelOffset: 0,
  bevelSegments: 5
});

// Cool gradient-like reflective material
const textMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xccccff, // Slight tint for the glass
  metalness: 0.01,  // Low metalness gives it a glassy rather than metallic look
  roughness: 1, // Lower roughness makes it more reflective and smooth
  transmission: 0.9, // Full transmission makes it transparent like glass
  opacity: 1, // Set opacity to less than 1 for some transparency
  transparent: true, // Enable transparency
  ior: 1.2, // Index of refraction similar to glass
  reflectivity: 1.5, // High reflectivity for realistic reflections
  clearcoat: 1.0, // Adds a clear coating layer
  clearcoatRoughness: 0.1 // Slight roughness on the coating
});
textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);
scene.add(textMesh);
scene.add(textMesh1);
textMesh.position.set(-7.5, 1, -10); // Adjust position as needed
textMesh.castShadow = true; // Adjust position as needed
textMesh1.position.set(-7.5, -1, -7); // Adjust position as needed
textMesh1.castShadow = true; // Adjust position as needed

});


// Torus


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xccccff, // Slight tint for the glass
  metalness: 0.01,  // Low metalness gives it a glassy rather than metallic look
  roughness: 1, // Lower roughness makes it more reflective and smooth
  transmission: 0.7, // Full transmission makes it transparent like glass
  opacity: 1, // Set opacity to less than 1 for some transparency
  transparent: true, // Enable transparency
  ior: 1.2, // Index of refraction similar to glass
  reflectivity: 1.5, // High reflectivity for realistic reflections
  clearcoat: 1.0, // Adds a clear coating layer
  clearcoatRoughness: 0.1 // Slight roughness on the coating
});
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const sunGeometry = new THREE.SphereGeometry(3, 32, 32);

// Sun material with emissive glow
const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffdd00,
    emissive: 0xffdd00, // Makes the sun emit light
    emissiveIntensity: 1, // Controls the intensity of the glow
});





    // create earthgeometry
const earthgeometry = new THREE.SphereGeometry(1,32,32);

    const earthmaterial = new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture('earthmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('earthbump.jpg'),
        bumpScale: 0.3,
    });

    const earthmesh = new THREE.Mesh(earthgeometry,earthmaterial);

    scene.add(earthmesh);
    earthmesh.rotateY(-0.1)
    earthmesh.position.set(0,0,5)

    const cloudgeometry =  new THREE.SphereGeometry(1.01,32,32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('earthCloud.png'),
        transparent: true
    });

    const cloudmesh = new THREE.Mesh(cloudgeometry,cloudmaterial);

    scene.add(cloudmesh);
    cloudmesh.position.set(0,0,5)

  
    const marsgeometry = new THREE.SphereGeometry(4,32,32);

    const marsmaterial = new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture('mars.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('earthbump.jpg'),
        bumpScale: 0.5,
    });

    const marsmesh = new THREE.Mesh(marsgeometry,marsmaterial);
    
    scene.add(marsmesh);
    marsmesh.position.set(-8,0,50)


// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);


function addfarStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xccccff, // Slight tint for the glass
    metalness: 0.01,  // Low metalness gives it a glassy rather than metallic look
    roughness: 1, // Lower roughness makes it more reflective and smooth
    transmission: 1.0, // Full transmission makes it transparent like glass
    opacity: 1, // Set opacity to less than 1 for some transparency
    transparent: false, // Enable transparency
    ior: 1.2, // Index of refraction similar to glass
    reflectivity: 1.5, // High reflectivity for realistic reflections
    clearcoat: 1.0, // Adds a clear coating layer
    clearcoatRoughness: 0 // Slight roughness on the coating
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(250));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(250).fill().forEach(addfarStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space4.jpg');
scene.background = spaceTexture;


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

const stargeometry =  new THREE.SphereGeometry(200,64,64);

const starmaterial = new THREE.MeshBasicMaterial({

    map: THREE.ImageUtils.loadTexture('galaxy.png'),
    side: THREE.BackSide
});

const starmesh = new THREE.Mesh(stargeometry,starmaterial);

scene.add(starmesh);


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  
  
  starmesh.rotation.y += 0.0005;
  camera.position.z = t * -0.01;
  if (camera.position.z > 18) {
    const temp = (camera.position.z /18)* 0.01;
    camera.position.z = t * -temp;
  }
  if (camera.position.z > 25) {
    const temp = (camera.position.z /20)* 0.01;
    camera.position.z = t * -temp;
  }

  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();
function onMouseClick(event) {
  // Convert mouse position to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update raycaster with camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Check if the ray intersects with the clickable box
  const intersects = raycaster.intersectObject(marsmesh);
  if (intersects.length > 0) {
    // Redirect to the desired URL when the box is clicked
    window.location.href = 'https://github.com/ameelvaljee'; // Replace with your URL
  }
}

// Add event listener for mouse clicks
window.addEventListener('click', onMouseClick);
// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  marsmesh.rotation.y -= 0.011;
  //marsmesh.rotation.z += 0.01;
  if (spaceship) { // Ensure the spaceship is loaded before rotating
    spaceship.rotation.y += 0.01; // Rotate around the Y-axis
    spaceship.rotation.x += 0.005; // Optional: Rotate around the X-axis
  }
  if (spaceship) { // Ensure the spaceship is loaded before animating
    angle += 0.01; // Increment the angle to create motion
    spaceship.position.x = orbitRadius * Math.cos(angle); // Update the X position
    spaceship.position.y = orbitRadius * Math.sin(angle+0.3); // Update the X position
    spaceship.position.z = 5+ orbitRadius * Math.sin(angle); // Update the Z position
  }

  
    if (camera.position.z > 6) {
      textMesh.visible = false; // Hide the text mesh
      textMesh1.visible = false;
    } else {
      textMesh.visible = true; // Show the text mesh
      textMesh1.visible = true;
    }
    hue += 0.001;
    if (hue > 1) hue = 0; // Reset hue back to 0 when it exceeds 1

    // Set the material color using HSL (Hue, Saturation, Lightness)
    textMesh.material.color.setHSL(hue, 1, 0.5); // Saturation and lightness are fixed

  
  cloudmesh.rotation.y -= 0.002;
  earthmesh.rotation.y += 0.003;
  moon.rotation.x += 0.005;
  moon.position.x = orbitRadiusMoon * Math.cos(angle*0.2); // Update the X position
 // Update the X position
  moon.position.z = - 5- orbitRadiusMoon * Math.sin(angle*0.2); 

  // controls.update();

  renderer.render(scene, camera);
}

animate();
