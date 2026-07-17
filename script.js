import * as THREE from "three";

// =====================
// Scene
// =====================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// =====================
// Camera
// =====================

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0,8,15);

// =====================
// Renderer
// =====================

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// =====================
// Lights
// =====================

const ambientLight = new THREE.AmbientLight(
0xffffff,
1
);

scene.add(ambientLight);

const sun = new THREE.DirectionalLight(
0xffffff,
2
);

sun.position.set(20,30,10);

sun.castShadow = true;

scene.add(sun);

// =====================
// Ground
// =====================

const ground = new THREE.Mesh(

new THREE.PlaneGeometry(300,300),

new THREE.MeshStandardMaterial({

color:0x2E8B57

})

);

ground.rotation.x = -Math.PI/2;

ground.receiveShadow = true;

scene.add(ground);

// =====================
// Animate
// =====================

function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera);

}

animate();

// =====================
// Resize
// =====================

window.addEventListener("resize",()=>{

camera.aspect =
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
// =====================
// FOREST (100 TREES)
// =====================

for (let i = 0; i < 100; i++) {

    // Tree Trunk
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.4, 3, 8),
        new THREE.MeshStandardMaterial({
            color: 0x8B4513
        })
    );

    // Tree Leaves
    const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(2, 4, 8),
        new THREE.MeshStandardMaterial({
            color: 0x0B6623
        })
    );

    // Random Position
    const x = (Math.random() - 0.5) * 280;
    const z = (Math.random() - 0.5) * 280;

    trunk.position.set(x, 1.5, z);
    leaves.position.set(x, 5, z);

    trunk.castShadow = true;
    leaves.castShadow = true;

    scene.add(trunk);
    scene.add(leaves);
}
// ==========================
// PLAYER
// ==========================

const player = new THREE.Mesh(

    new THREE.BoxGeometry(1,2,1),

    new THREE.MeshStandardMaterial({
        color:0x0066ff
    })

);

player.position.set(0,1,0);

player.castShadow = true;

scene.add(player);

// ==========================
// KEYBOARD
// ==========================

const keys = {};

window.addEventListener("keydown",(event)=>{
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup",(event)=>{
    keys[event.key.toLowerCase()] = false;
});

// ==========================
// PLAYER SPEED
// ==========================

const speed = 0.25;
function animate(){

    requestAnimationFrame(animate);

    // Movement

    if(keys["w"]){
        player.position.z -= speed;
    }

    if(keys["s"]){
        player.position.z += speed;
    }

    if(keys["a"]){
        player.position.x -= speed;
    }

    if(keys["d"]){
        player.position.x += speed;
    }

    // Camera Follow

    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 15;
    camera.lookAt(player.position);

    renderer.render(scene,camera);

}
import { GLTFLoader } from "https://unpkg.com/three@0.166.1/examples/jsm/loaders/GLTFLoader.js";
const loader = new GLTFLoader();

let player;

loader.load(
    "models/player.glb",

    function(gltf){

        player = gltf.scene;

        player.scale.set(1,1,1);

        player.position.set(0,0,0);

        scene.add(player);

        document.getElementById("loading").style.display = "none";

    },

    undefined,

    function(error){

        console.log(error);

    }

);
if(player){

    if(keys["w"]) player.position.z -= speed;
    if(keys["s"]) player.position.z += speed;
    if(keys["a"]) player.position.x -= speed;
    if(keys["d"]) player.position.x += speed;

    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 15;

    camera.lookAt(player.position);

}
// =========================
// ENEMIES
// =========================

const enemies = [];

for (let i = 0; i < 10; i++) {

    const enemy = new THREE.Mesh(

        new THREE.BoxGeometry(1, 2, 1),

        new THREE.MeshStandardMaterial({
            color: 0xff0000
        })

    );

    enemy.position.set(

        (Math.random() - 0.5) * 100,
        1,
        (Math.random() - 0.5) * 100

    );

    enemy.castShadow = true;

    scene.add(enemy);

    enemies.push(enemy);

}
// =========================
// ENEMY AI
// =========================

if (player) {

    enemies.forEach((enemy) => {

        enemy.lookAt(player.position);

        enemy.position.x += (player.position.x - enemy.position.x) * 0.003;

        enemy.position.z += (player.position.z - enemy.position.z) * 0.003;

    });

}
// =========================
// ATTACK
// =========================

let attack = false;

window.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        attack = true;

        setTimeout(() => {

            attack = false;

        }, 200);

    }

});
const enemies = [];

for (let i = 0; i < 10; i++) {

    const enemy = new THREE.Mesh(

        new THREE.BoxGeometry(1,2,1),

        new THREE.MeshStandardMaterial({
            color:0xff0000
        })

    );

    enemy.position.set(

        (Math.random()-0.5)*100,
        1,
        (Math.random()-0.5)*100

    );

    enemy.userData.health = 100;

    scene.add(enemy);

    enemies.push(enemy);

}
// =========================
// ATTACK DAMAGE
// =========================

if(player && attack){

    enemies.forEach((enemy)=>{

        const distance = player.position.distanceTo(enemy.position);

        if(distance < 3){

            enemy.userData.health -= 25;

            if(enemy.userData.health <= 0){

                scene.remove(enemy);

            }

        }

    });

}
// =========================
// PLAYER HEALTH & SCORE
// =========================

let playerHealth = 100;
let score = 0;
// =========================
// ENEMY ATTACK
// =========================

enemies.forEach((enemy)=>{

    if(player){

        const distance = player.position.distanceTo(enemy.position);

        if(distance < 1.5){

            playerHealth -= 0.1;

            document.getElementById("healthBar").style.width =
            playerHealth + "%";

            if(playerHealth <= 0){

                alert("GAME OVER");

                location.reload();

            }

        }

    }

});
scene.remove(enemy);
scene.remove(enemy);

score++;

console.log("Score : " + score);
// =====================
// COINS
// =====================

const coins = [];

let totalCoins = 0;

for(let i = 0; i < 30; i++){

    const coin = new THREE.Mesh(

        new THREE.CylinderGeometry(0.4,0.4,0.1,32),

        new THREE.MeshStandardMaterial({
            color:0xFFD700,
            metalness:1,
            roughness:0.2
        })

    );

    coin.rotation.x = Math.PI / 2;

    coin.position.set(

        (Math.random()-0.5)*250,
        0.5,
        (Math.random()-0.5)*250

    );

    scene.add(coin);

    coins.push(coin);

}
// =====================
// COLLECT COINS
// =====================

if(player){

    coins.forEach((coin)=>{

        if(!coin.visible) return;

        coin.rotation.z += 0.1;

        const distance =
        player.position.distanceTo(coin.position);

        if(distance < 1.2){

            coin.visible = false;

            totalCoins++;

            console.log("Coins : " + totalCoins);

        }

    });

}
// ==========================
// DAY & NIGHT
// ==========================

let time = 0;
// ==========================
// DAY & NIGHT ANIMATION
// ==========================

time += 0.002;

// Move the sun
sun.position.x = Math.sin(time) * 100;
sun.position.y = Math.cos(time) * 100;

// Change sky color
if (sun.position.y > 0) {

    scene.background = new THREE.Color(0x87CEEB); // Day

} else {

    scene.background = new THREE.Color(0x001133); // Night

}
import { GLTFLoader } from "https://unpkg.com/three@0.166.1/examples/jsm/loaders/GLTFLoader.js";
const loader = new GLTFLoader();

let playerModel;

loader.load(
    "models/player.glb",
    (gltf) => {

        playerModel = gltf.scene;

        playerModel.position.set(0, 0, 0);

        playerModel.scale.set(1, 1, 1);

        scene.add(playerModel);

        document.getElementById("loading").style.display = "none";
    },
    undefined,
    (error) => {
        console.error("Model could not be loaded:", error);
    }
);
if (playerModel) {

    if (keys["w"]) playerModel.position.z -= speed;
    if (keys["s"]) playerModel.position.z += speed;
    if (keys["a"]) playerModel.position.x -= speed;
    if (keys["d"]) playerModel.position.x += speed;

    camera.position.x = playerModel.position.x;
    camera.position.z = playerModel.position.z + 15;

    camera.lookAt(playerModel.position);
}
// ==========================
// MINI MAP
// ==========================

const mapCanvas = document.getElementById("mapCanvas");
const mapCtx = mapCanvas.getContext("2d");

mapCanvas.width = 200;
mapCanvas.height = 200;

function drawMiniMap(){

    mapCtx.fillStyle = "#1b5e20";
    mapCtx.fillRect(0,0,200,200);

    // Player
    if(player){

        mapCtx.fillStyle = "blue";

        mapCtx.beginPath();

        mapCtx.arc(100,100,5,0,Math.PI*2);

        mapCtx.fill();

    }

}
drawMiniMap();
const loader = new GLTFLoader();

loader.load(
    "models/player.glb",
    ...
);
loader.load("models/player.glb", ...);
loader.load(
    "models/player.glb",
    (gltf) => {
        playerModel = gltf.scene;
        scene.add(playerModel);

        document.getElementById("loading").style.display = "none";
    },
    undefined,
    (error) => {
        console.error(error);
    }
);