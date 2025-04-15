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
let character = createDetailedCharacter();
scene.add(character);

// Create a high-poly detailed character
function createDetailedCharacter() {
    // Group to hold all character parts
    const characterGroup = new THREE.Group();
    
    // Materials with more realistic properties
    const skinMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffcba4,
        roughness: 0.8,
        metalness: 0.1
    });
    
    const shirtMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3498db,
        roughness: 0.7, 
        metalness: 0.0
    });
    
    const pantsMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x34495e,
        roughness: 0.7,
        metalness: 0.1
    });
    
    const shoeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x222222,
        roughness: 0.4,
        metalness: 0.4
    });
    
    const hairMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.9,
        metalness: 0.1
    });
    
    // Head - more detailed with better subdivisions
    const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 1.4;
    head.castShadow = true;
    characterGroup.add(head);
    
    // Face features
    // Nose
    const noseGeometry = new THREE.ConeGeometry(0.05, 0.1, 8);
    const nose = new THREE.Mesh(noseGeometry, skinMaterial);
    nose.position.set(0, 1.4, 0.24);
    nose.rotation.x = -Math.PI / 2;
    nose.scale.set(0.8, 1, 0.8);
    nose.castShadow = true;
    characterGroup.add(nose);
    
    // Ears
    const earGeometry = new THREE.SphereGeometry(0.05, 8, 8, 0, Math.PI, 0, Math.PI);
    
    const leftEar = new THREE.Mesh(earGeometry, skinMaterial);
    leftEar.position.set(-0.25, 1.4, 0);
    leftEar.rotation.y = -Math.PI / 2;
    leftEar.castShadow = true;
    characterGroup.add(leftEar);
    
    const rightEar = new THREE.Mesh(earGeometry, skinMaterial);
    rightEar.position.set(0.25, 1.4, 0);
    rightEar.rotation.y = Math.PI / 2;
    rightEar.castShadow = true;
    characterGroup.add(rightEar);
    
    // Hair - more detailed with multiple parts
    const hairTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.1, 0.35), 
        hairMaterial
    );
    hairTop.position.y = 1.58;
    hairTop.castShadow = true;
    characterGroup.add(hairTop);
    
    // Side hair
    const sideHairGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.2);
    
    const leftSideHair = new THREE.Mesh(sideHairGeometry, hairMaterial);
    leftSideHair.position.set(-0.21, 1.45, 0);
    leftSideHair.castShadow = true;
    characterGroup.add(leftSideHair);
    
    const rightSideHair = new THREE.Mesh(sideHairGeometry, hairMaterial);
    rightSideHair.position.set(0.21, 1.45, 0);
    rightSideHair.castShadow = true;
    characterGroup.add(rightSideHair);
    
    // Back hair
    const backHair = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.2, 0.07),
        hairMaterial
    );
    backHair.position.set(0, 1.4, -0.18);
    backHair.castShadow = true;
    characterGroup.add(backHair);
    
    // Eyes - more detailed with eyelids
    const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 1.4, 0.21);
    characterGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 1.4, 0.21);
    characterGroup.add(rightEye);
    
    // Eyelids
    const eyelidGeometry = new THREE.SphereGeometry(0.055, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const eyelidMaterial = new THREE.MeshStandardMaterial({ color: 0xffcba4 });
    
    const leftEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
    leftEyelid.position.set(-0.1, 1.42, 0.21);
    leftEyelid.rotation.x = Math.PI / 8;
    characterGroup.add(leftEyelid);
    
    const rightEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
    rightEyelid.position.set(0.1, 1.42, 0.21);
    rightEyelid.rotation.x = Math.PI / 8;
    characterGroup.add(rightEyelid);
    
    // Pupils - make them look more natural
    const pupilGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.1, 1.4, 0.25);
    characterGroup.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.1, 1.4, 0.25);
    characterGroup.add(rightPupil);
    
    // Eyebrows
    const eyebrowGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.02);
    const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
    
    const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    leftEyebrow.position.set(-0.1, 1.48, 0.23);
    leftEyebrow.rotation.x = -Math.PI / 8;
    characterGroup.add(leftEyebrow);
    
    const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    rightEyebrow.position.set(0.1, 1.48, 0.23);
    rightEyebrow.rotation.x = -Math.PI / 8;
    characterGroup.add(rightEyebrow);
    
    // Mouth
    const mouthGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.01);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x994444 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.32, 0.24);
    characterGroup.add(mouth);
    
    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16);
    const neck = new THREE.Mesh(neckGeometry, skinMaterial);
    neck.position.y = 1.25;
    neck.castShadow = true;
    characterGroup.add(neck);
    
    // Torso - more detailed with better shape
    const torsoGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.25, 4, 4, 4);
    const torso = new THREE.Mesh(torsoGeometry, shirtMaterial);
    torso.position.y = 1;
    torso.castShadow = true;
    
    // Add subtle details to the torso
    const collarGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 16, 1, true);
    const collar = new THREE.Mesh(collarGeometry, shirtMaterial);
    collar.position.set(0, 1.25, 0);
    collar.castShadow = true;
    characterGroup.add(collar);
    
    // Shirt buttons
    const buttonGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 8);
    const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    
    for (let i = 0; i < 3; i++) {
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.position.set(0, 1.1 - i * 0.15, 0.13);
        button.rotation.x = Math.PI / 2;
        characterGroup.add(button);
    }
    
    characterGroup.add(torso);
    
    // Arms - more detailed with elbow joints
    // Upper arms
    const upperArmGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.3, 16);
    
    const leftUpperArm = new THREE.Mesh(upperArmGeometry, shirtMaterial);
    leftUpperArm.position.set(-0.3, 1.15, 0);
    leftUpperArm.rotation.z = Math.PI / 16;
    leftUpperArm.castShadow = true;
    characterGroup.add(leftUpperArm);
    
    const rightUpperArm = new THREE.Mesh(upperArmGeometry, shirtMaterial);
    rightUpperArm.position.set(0.3, 1.15, 0);
    rightUpperArm.rotation.z = -Math.PI / 16;
    rightUpperArm.castShadow = true;
    characterGroup.add(rightUpperArm);
    
    // Lower arms
    const lowerArmGeometry = new THREE.CylinderGeometry(0.07, 0.06, 0.3, 16);
    const handGeometry = new THREE.SphereGeometry(0.07, 16, 16);
    
    const leftLowerArm = new THREE.Mesh(lowerArmGeometry, skinMaterial);
    leftLowerArm.position.set(-0.35, 0.9, 0);
    leftLowerArm.rotation.z = Math.PI / 8;
    leftLowerArm.castShadow = true;
    characterGroup.add(leftLowerArm);
    
    const leftHand = new THREE.Mesh(handGeometry, skinMaterial);
    leftHand.position.set(-0.4, 0.72, 0);
    leftHand.scale.set(1, 0.8, 0.6);
    leftHand.castShadow = true;
    characterGroup.add(leftHand);
    
    const rightLowerArm = new THREE.Mesh(lowerArmGeometry, skinMaterial);
    rightLowerArm.position.set(0.35, 0.9, 0);
    rightLowerArm.rotation.z = -Math.PI / 8;
    rightLowerArm.castShadow = true;
    characterGroup.add(rightLowerArm);
    
    const rightHand = new THREE.Mesh(handGeometry, skinMaterial);
    rightHand.position.set(0.4, 0.72, 0);
    rightHand.scale.set(1, 0.8, 0.6);
    rightHand.castShadow = true;
    characterGroup.add(rightHand);
    
    // Legs - more detailed with knee joints
    // Upper legs
    const upperLegGeometry = new THREE.CylinderGeometry(0.09, 0.08, 0.3, 16);
    
    const leftUpperLeg = new THREE.Mesh(upperLegGeometry, pantsMaterial);
    leftUpperLeg.position.set(-0.15, 0.65, 0);
    leftUpperLeg.castShadow = true;
    characterGroup.add(leftUpperLeg);
    
    const rightUpperLeg = new THREE.Mesh(upperLegGeometry, pantsMaterial);
    rightUpperLeg.position.set(0.15, 0.65, 0);
    rightUpperLeg.castShadow = true;
    characterGroup.add(rightUpperLeg);
    
    // Lower legs
    const lowerLegGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.3, 16);
    
    const leftLowerLeg = new THREE.Mesh(lowerLegGeometry, pantsMaterial);
    leftLowerLeg.position.set(-0.15, 0.35, 0);
    leftLowerLeg.castShadow = true;
    characterGroup.add(leftLowerLeg);
    
    const rightLowerLeg = new THREE.Mesh(lowerLegGeometry, pantsMaterial);
    rightLowerLeg.position.set(0.15, 0.35, 0);
    rightLowerLeg.castShadow = true;
    characterGroup.add(rightLowerLeg);
    
    // Feet - more detailed
    const footGeometry = new THREE.BoxGeometry(0.12, 0.1, 0.25);
    
    const leftFoot = new THREE.Mesh(footGeometry, shoeMaterial);
    leftFoot.position.set(-0.15, 0.15, 0.05);
    leftFoot.castShadow = true;
    // Add some rounding to shoes
    leftFoot.geometry.translate(0, -0.05, 0.05);
    characterGroup.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeometry, shoeMaterial);
    rightFoot.position.set(0.15, 0.15, 0.05);
    rightFoot.castShadow = true;
    // Add some rounding to shoes
    rightFoot.geometry.translate(0, -0.05, 0.05);
    characterGroup.add(rightFoot);
    
    // Belt
    const beltGeometry = new THREE.BoxGeometry(0.52, 0.05, 0.27);
    const beltMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5d4037,
        roughness: 0.4, 
        metalness: 0.2 
    });
    const belt = new THREE.Mesh(beltGeometry, beltMaterial);
    belt.position.set(0, 0.8, 0);
    belt.castShadow = true;
    characterGroup.add(belt);
    
    // Belt buckle
    const buckleGeometry = new THREE.BoxGeometry(0.08, 0.03, 0.28);
    const buckleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37,
        roughness: 0.3,
        metalness: 0.7
    });
    const buckle = new THREE.Mesh(buckleGeometry, buckleMaterial);
    buckle.position.set(0, 0.8, 0.01);
    buckle.castShadow = true;
    characterGroup.add(buckle);
    
    // Name tag - "Andrey Mamaev"
    const textGeometry = new THREE.BoxGeometry(0.7, 0.14, 0.01);
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nameTag = new THREE.Mesh(textGeometry, textMaterial);
    nameTag.position.set(0, 1.8, 0);
    
    // Simple text using HTML
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 1024;
    textCanvas.height = 256;
    const textContext = textCanvas.getContext('2d');
    
    // Background with rounded corners
    textContext.fillStyle = 'rgba(0, 0, 0, 0.7)';
    roundRect(textContext, 10, 10, textCanvas.width - 20, textCanvas.height - 20, 20, true);
    
    // Text with stroke for better visibility
    textContext.fillStyle = 'white';
    textContext.font = 'bold 120px Arial';
    textContext.textAlign = 'center';
    textContext.textBaseline = 'middle';
    textContext.lineWidth = 8;
    textContext.strokeStyle = '#000000';
    textContext.strokeText('Andrey Mamaev', textCanvas.width/2, textCanvas.height/2);
    textContext.fillText('Andrey Mamaev', textCanvas.width/2, textCanvas.height/2);
    
    const textTexture = new THREE.CanvasTexture(textCanvas);
    nameTag.material.map = textTexture;
    nameTag.material.transparent = true;
    nameTag.material.needsUpdate = true;
    
    // Make nametag always face camera
    nameTag.userData.isBillboard = true;
    
    characterGroup.add(nameTag);
    
    // Store references for animation
    characterGroup.userData = {
        animationParts: {
            leftUpperArm,
            rightUpperArm,
            leftLowerArm,
            rightLowerArm,
            leftUpperLeg,
            rightUpperLeg,
            leftLowerLeg,
            rightLowerLeg,
            leftHand,
            rightHand,
            leftFoot,
            rightFoot
        }
    };
    
    // Position the entire character
    characterGroup.position.y = 0.2; // Slightly above ground
    
    return characterGroup;
}

// Helper function for drawing rounded rectangles
function roundRect(ctx, x, y, width, height, radius, fill) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
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

// Mobile control state
let currentControlType = 'buttons'; // 'buttons' or 'joystick'
let joystickActive = false;
let joystickVector = { x: 0, y: 0 };

// Keyboard event listeners
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

// Mobile button controls
const mobileButtons = {
    'btn-w': 'w',
    'btn-a': 'a',
    'btn-s': 's',
    'btn-d': 'd'
};

// Setup mobile button controls
Object.keys(mobileButtons).forEach(btnId => {
    const button = document.getElementById(btnId);
    if (button) {
        const keyName = mobileButtons[btnId];
        
        // Touch start
        button.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            keys[keyName] = true;
        });
        
        // Touch end
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            keys[keyName] = false;
        });
        
        // Mouse events for testing on desktop
        button.addEventListener('mousedown', () => {
            keys[keyName] = true;
        });
        
        button.addEventListener('mouseup', () => {
            keys[keyName] = false;
        });
        
        // Handle mouse leaving the button while pressed
        button.addEventListener('mouseleave', () => {
            keys[keyName] = false;
        });
    }
});

// Setup joystick controls
const joystickContainer = document.getElementById('joystick-container');
const joystickKnob = document.getElementById('joystick-knob');

if (joystickContainer && joystickKnob) {
    // Get joystick container dimensions and center position
    const getJoystickBounds = () => {
        const containerRect = joystickContainer.getBoundingClientRect();
        return {
            left: containerRect.left,
            top: containerRect.top,
            width: containerRect.width,
            height: containerRect.height,
            centerX: containerRect.left + containerRect.width / 2,
            centerY: containerRect.top + containerRect.height / 2
        };
    };
    
    // Handle touch start
    joystickContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();
        joystickActive = true;
        updateJoystickPosition(e.touches[0].clientX, e.touches[0].clientY);
    });
    
    // Handle touch move
    document.addEventListener('touchmove', (e) => {
        if (joystickActive) {
            e.preventDefault();
            updateJoystickPosition(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
    
    // Handle touch end
    document.addEventListener('touchend', () => {
        joystickActive = false;
        resetJoystick();
    });
    
    // Handle touch cancel
    document.addEventListener('touchcancel', () => {
        joystickActive = false;
        resetJoystick();
    });
    
    // Function to update joystick position and calculate vector
    function updateJoystickPosition(clientX, clientY) {
        const bounds = getJoystickBounds();
        const radius = bounds.width / 2;
        const knobRadius = joystickKnob.offsetWidth / 2;
        
        // Calculate vector from center to touch point
        let deltaX = clientX - bounds.centerX;
        let deltaY = clientY - bounds.centerY;
        
        // Calculate distance from center
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Limit distance to container radius
        if (distance > radius - knobRadius) {
            const angle = Math.atan2(deltaY, deltaX);
            deltaX = Math.cos(angle) * (radius - knobRadius);
            deltaY = Math.sin(angle) * (radius - knobRadius);
        }
        
        // Update knob position
        joystickKnob.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
        
        // Normalize vector
        joystickVector.x = deltaX / (radius - knobRadius);
        joystickVector.y = deltaY / (radius - knobRadius);
    }
    
    // Reset joystick position and vector
    function resetJoystick() {
        joystickKnob.style.transform = 'translate(-50%, -50%)';
        joystickVector.x = 0;
        joystickVector.y = 0;
    }
}

// Toggle between control types
const controlToggle = document.getElementById('control-toggle');
const mobileButtonsContainer = document.getElementById('mobile-buttons');

if (controlToggle) {
    controlToggle.addEventListener('click', () => {
        if (currentControlType === 'buttons') {
            currentControlType = 'joystick';
            if (mobileButtonsContainer) mobileButtonsContainer.style.display = 'none';
            if (joystickContainer) joystickContainer.style.display = 'block';
            controlToggle.textContent = 'Кнопки WASD';
        } else {
            currentControlType = 'buttons';
            if (mobileButtonsContainer) mobileButtonsContainer.style.display = 'grid';
            if (joystickContainer) joystickContainer.style.display = 'none';
            controlToggle.textContent = 'Джойстик';
            
            // Reset all key states
            Object.keys(keys).forEach(key => {
                keys[key] = false;
            });
        }
    });
}

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
}

// Setup mobile controls visibility on load
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = isMobileDevice();
    
    if (controlToggle) controlToggle.style.display = isMobile ? 'block' : 'none';
    if (mobileButtonsContainer) mobileButtonsContainer.style.display = isMobile ? 'grid' : 'none';
    
    // Set initial control type
    if (isMobile) {
        currentControlType = 'buttons'; // Start with buttons by default
        if (controlToggle) controlToggle.textContent = 'Джойстик';
    }
});

// Animation function for walking
function animateWalking() {
    if (velocity.x !== 0 || velocity.z !== 0) {
        walkingAnimation += 0.1;
        
        // Get reference to animation parts
        if (character.userData && character.userData.animationParts) {
            const parts = character.userData.animationParts;
            
            // Legs animation
            parts.leftUpperLeg.rotation.x = Math.sin(walkingAnimation) * 0.5;
            parts.rightUpperLeg.rotation.x = Math.sin(walkingAnimation + Math.PI) * 0.5;
            
            parts.leftLowerLeg.rotation.x = Math.sin(walkingAnimation + Math.PI/4) * 0.25;
            parts.rightLowerLeg.rotation.x = Math.sin(walkingAnimation + Math.PI + Math.PI/4) * 0.25;
            
            // Feet animation
            parts.leftFoot.rotation.x = Math.sin(walkingAnimation) * 0.2;
            parts.rightFoot.rotation.x = Math.sin(walkingAnimation + Math.PI) * 0.2;
            
            // Arms animation - opposite to legs
            parts.leftUpperArm.rotation.x = Math.sin(walkingAnimation + Math.PI) * 0.5;
            parts.rightUpperArm.rotation.x = Math.sin(walkingAnimation) * 0.5;
            
            parts.leftLowerArm.rotation.x = Math.sin(walkingAnimation + Math.PI + Math.PI/4) * 0.3;
            parts.rightLowerArm.rotation.x = Math.sin(walkingAnimation + Math.PI/4) * 0.3;
            
            // Hands animation
            parts.leftHand.rotation.x = Math.sin(walkingAnimation + Math.PI) * 0.2;
            parts.rightHand.rotation.x = Math.sin(walkingAnimation) * 0.2;
        }
    } else {
        // Reset animations when not moving
        if (character.userData && character.userData.animationParts) {
            const parts = character.userData.animationParts;
            
            // Reset all rotation
            Object.values(parts).forEach(part => {
                if (part.rotation) {
                    part.rotation.x = 0;
                }
            });
            
            // Restore default slight rotations for arms
            parts.leftUpperArm.rotation.z = Math.PI / 16;
            parts.rightUpperArm.rotation.z = -Math.PI / 16;
            parts.leftLowerArm.rotation.z = Math.PI / 8;
            parts.rightLowerArm.rotation.z = -Math.PI / 8;
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
    
    // Update mobile controls visibility on resize
    const isMobile = isMobileDevice();
    if (controlToggle) controlToggle.style.display = isMobile ? 'block' : 'none';
    
    if (currentControlType === 'buttons') {
        if (mobileButtonsContainer) mobileButtonsContainer.style.display = isMobile ? 'grid' : 'none';
        if (joystickContainer) joystickContainer.style.display = 'none';
    } else {
        if (mobileButtonsContainer) mobileButtonsContainer.style.display = 'none';
        if (joystickContainer) joystickContainer.style.display = isMobile ? 'block' : 'none';
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Process movement
    velocity.x = 0;
    velocity.z = 0;
    
    // Process keyboard and button input
    if (keys.w) velocity.z -= speed;
    if (keys.s) velocity.z += speed;
    if (keys.a) velocity.x -= speed;
    if (keys.d) velocity.x += speed;
    
    // Process joystick input if active and using joystick controls
    if (currentControlType === 'joystick' && (joystickVector.x !== 0 || joystickVector.y !== 0)) {
        velocity.x = joystickVector.x * speed;
        velocity.z = joystickVector.y * speed;
    }
    
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
    
    // Make nametag face camera
    character.traverse((node) => {
        if (node.userData && node.userData.isBillboard) {
            node.quaternion.copy(camera.quaternion);
        }
    });
    
    orbitControls.update();
    renderer.render(scene, camera);
}

animate(); 