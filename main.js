// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue background

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Orbit controls (for debugging)
const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.screenSpacePanning = false;
orbitControls.enabled = false; // Disable by default for player movement

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// Ground
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8cb369,
    roughness: 1,
    metalness: 0
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Character creation
let character = createSimpleCharacter();
scene.add(character);

// Load a more detailed character if available
// Uncomment this block if you have a specific model
/*
const loader = new GLTFLoader();
loader.load('models/andrey.glb', (gltf) => {
    character.visible = false; // Hide placeholder
    character = gltf.scene;
    character.scale.set(0.5, 0.5, 0.5);
    character.position.y = 0;
    character.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
        }
    });
    scene.add(character);
    console.log("Character loaded!");
}, undefined, (error) => {
    console.error('Error loading model:', error);
});
*/

// Create a simple character as fallback
function createSimpleCharacter() {
    // Group to hold all character parts
    const characterGroup = new THREE.Group();
    
    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffcba4 });
    const shirtMaterial = new THREE.MeshStandardMaterial({ color: 0x3498db });
    const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    const shoeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const hairMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 1.4;
    head.castShadow = true;
    characterGroup.add(head);
    
    // Hair
    const hairGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.3);
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 1.55;
    hair.castShadow = true;
    characterGroup.add(hair);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 1.4, 0.2);
    characterGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 1.4, 0.2);
    characterGroup.add(rightEye);
    
    // Pupils
    const pupilGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.1, 1.4, 0.24);
    characterGroup.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.1, 1.4, 0.24);
    characterGroup.add(rightPupil);
    
    // Torso
    const torsoGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.25);
    const torso = new THREE.Mesh(torsoGeometry, shirtMaterial);
    torso.position.y = 1;
    torso.castShadow = true;
    characterGroup.add(torso);
    
    // Arms
    const armGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
    
    const leftArm = new THREE.Mesh(armGeometry, shirtMaterial);
    leftArm.position.set(-0.325, 1, 0);
    leftArm.castShadow = true;
    characterGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, shirtMaterial);
    rightArm.position.set(0.325, 1, 0);
    rightArm.castShadow = true;
    characterGroup.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
    
    const leftLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    leftLeg.position.set(-0.15, 0.5, 0);
    leftLeg.castShadow = true;
    characterGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    rightLeg.position.set(0.15, 0.5, 0);
    rightLeg.castShadow = true;
    characterGroup.add(rightLeg);
    
    // Feet
    const footGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.25);
    
    const leftFoot = new THREE.Mesh(footGeometry, shoeMaterial);
    leftFoot.position.set(-0.15, 0.15, 0.05);
    leftFoot.castShadow = true;
    characterGroup.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeometry, shoeMaterial);
    rightFoot.position.set(0.15, 0.15, 0.05);
    rightFoot.castShadow = true;
    characterGroup.add(rightFoot);
    
    // Name tag - "Andrey"
    const textGeometry = new THREE.BoxGeometry(0.4, 0.08, 0.01);
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nameTag = new THREE.Mesh(textGeometry, textMaterial);
    nameTag.position.set(0, 1.75, 0);
    
    // Simple text using HTML
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 256;
    textCanvas.height = 64;
    const textContext = textCanvas.getContext('2d');
    textContext.fillStyle = 'black';
    textContext.font = 'bold 40px Arial';
    textContext.textAlign = 'center';
    textContext.fillText('Andrey', 128, 44);
    
    const textTexture = new THREE.CanvasTexture(textCanvas);
    nameTag.material.map = textTexture;
    nameTag.material.transparent = true;
    nameTag.material.needsUpdate = true;
    
    characterGroup.add(nameTag);
    
    // Position the entire character
    characterGroup.position.y = 0.2; // Slightly above ground
    
    return characterGroup;
}

// Movement variables
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

const velocity = {
    x: 0,
    z: 0
};

const speed = 0.05;
let walkingAnimation = 0;

// Key event listeners
document.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.key.toLowerCase())) {
        keys[event.key.toLowerCase()] = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.key.toLowerCase())) {
        keys[event.key.toLowerCase()] = false;
    }
});

// Animation function for walking
function animateWalking() {
    if (velocity.x !== 0 || velocity.z !== 0) {
        walkingAnimation += 0.1;
        
        // Get legs to animate
        if (character.children) {
            // Assuming legs are specific children indices
            const leftLeg = character.children[8]; // Update these indices based on the character structure
            const rightLeg = character.children[9];
            const leftArm = character.children[6];
            const rightArm = character.children[7];
            
            if (leftLeg && rightLeg && leftArm && rightArm) {
                leftLeg.rotation.x = Math.sin(walkingAnimation) * 0.5;
                rightLeg.rotation.x = Math.sin(walkingAnimation + Math.PI) * 0.5;
                leftArm.rotation.x = Math.sin(walkingAnimation + Math.PI) * 0.3;
                rightArm.rotation.x = Math.sin(walkingAnimation) * 0.3;
            }
        }
    } else {
        // Reset animations when not moving
        if (character.children) {
            character.children.forEach(child => {
                if (child.rotation) {
                    child.rotation.x = 0;
                }
            });
        }
    }
}

// Handle character facing direction
function updateCharacterRotation() {
    if (velocity.x !== 0 || velocity.z !== 0) {
        const angle = Math.atan2(velocity.x, velocity.z);
        character.rotation.y = angle;
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Process movement
    velocity.x = 0;
    velocity.z = 0;
    
    if (keys.w) velocity.z -= speed;
    if (keys.s) velocity.z += speed;
    if (keys.a) velocity.x -= speed;
    if (keys.d) velocity.x += speed;
    
    // Normalize diagonal movement
    if (velocity.x !== 0 && velocity.z !== 0) {
        velocity.x /= Math.sqrt(2);
        velocity.z /= Math.sqrt(2);
    }
    
    // Update character position
    character.position.x += velocity.x;
    character.position.z += velocity.z;
    
    // Update character rotation to face movement direction
    updateCharacterRotation();
    
    // Animate walking
    animateWalking();
    
    // Update camera to follow the character
    camera.position.x = character.position.x;
    camera.position.z = character.position.z + 5;
    camera.lookAt(character.position);
    
    orbitControls.update();
    renderer.render(scene, camera);
}

animate(); 