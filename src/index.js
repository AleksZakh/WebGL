import * as BABYLON from 'babylonjs';

const canvas = document.getElementById('action-canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';

// ============================================
// Создание мира
// ============================================

// Инициализация движка
const engine = new BABYLON.Engine(canvas, true);

// Инициализация сцены и привязка к движку
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.3, 1);
// scene.emissiveTexture = new BABYLON.Texture('./img/blue_sky.png', scene);
// scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin());


// Инициализация освещения
const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
// const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.3;
let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

let platforms = [];


const createPlatform = (zPos) => {
  let platform = new BABYLON.MeshBuilder.CreateBox('box', {
    width: 2,
    height: 0.5,
    depth: 2,
    wrap: true
  }, scene);
  platform.position = new BABYLON.Vector3(10, zPos/2, zPos*2);
  // Создание материала
  const boxMaterial = new BABYLON.StandardMaterial('material', scene);
  // boxMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3,);
  boxMaterial.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
  platform.material = boxMaterial;
  shadowGenerator.getShadowMap().renderList.push(platform);
  
  platforms.push(platform);
}

for (let i = 0; i < 5; i++) {
  createPlatform(i);  
}

let bridge = new BABYLON.MeshBuilder.CreateBox('box', {
  width: 20,
  height: 0.5,
  depth: 2,
  wrap: true
}, scene);
bridge.position = new BABYLON.Vector3(2, platforms[platforms.length - 1].position.y+0.2, platforms[platforms.length - 1].position.z+3);
bridge.material = new BABYLON.StandardMaterial('material', scene);
bridge.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
shadowGenerator.getShadowMap().renderList.push(bridge);

let supportRight = new BABYLON.MeshBuilder.CreateBox('box', {
  width: 0.5,
  height: 3,
  depth: 0.5,
  wrap: true
}, scene);
supportRight.position = new BABYLON.Vector3(10, platforms[platforms.length - 1].position.y-1.5, platforms[platforms.length - 1].position.z+1);
supportRight.material = new BABYLON.StandardMaterial('material', scene);
supportRight.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
shadowGenerator.getShadowMap().renderList.push(supportRight);

let supportCenter = new BABYLON.MeshBuilder.CreateBox('box', {
  width: 0.5,
  height: 3,
  depth: 0.5,
  wrap: true
}, scene);
supportCenter.position = new BABYLON.Vector3(1, platforms[platforms.length - 1].position.y-1.5, platforms[platforms.length - 1].position.z+2);
supportCenter.material = new BABYLON.StandardMaterial('material', scene);
supportCenter.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
shadowGenerator.getShadowMap().renderList.push(supportCenter);

let supportLeft = new BABYLON.MeshBuilder.CreateBox('box', {
  width: 0.5,
  height: 3,
  depth: 0.5,
  wrap: true
}, scene);
supportLeft.position = new BABYLON.Vector3(-7.5, platforms[platforms.length - 1].position.y-1.5, platforms[platforms.length - 1].position.z+3);
supportLeft.material = new BABYLON.StandardMaterial('material', scene);
supportLeft.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
shadowGenerator.getShadowMap().renderList.push(supportLeft);



// Инициализация камеры
const camera = new BABYLON.FreeCamera('Camera', new BABYLON.Vector3(-15, 10, -25), scene);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));

// Инициализация платформы
// let box = new BABYLON.Mesh.CreateBox('box', 2, scene);



// ============================================
// Логика
// ============================================

// Запуск движка
engine.runRenderLoop(() => {
  scene.render();
});

// ============================================
// Обработчики событий
// ============================================

// Изменение размера окна
window.addEventListener('resize', () => {
  engine.resize();
});


window.addEventListener('keydown', (event) => {
  if(event.key === 'ArrowRight') {
    camera.rotation.y -= 0.01;
    camera.rotation.x -= 0.01;
  }
  if(event.key === 'ArrowLeft') {
    camera.rotation.y += 0.01;
    camera.rotation.x += 0.01;
  }
});

let z = 0;
window.addEventListener('scroll', (event) => {
  if(event.deltaY > 0) {
    z += 0.1;
    camera.setTarget(new BABYLON.Vector3(0, 0, z));
    // camera.rotation.x += 0.01;
  } else {
    z -= 0.1;
    camera.setTarget(new BABYLON.Vector3(0, 0, z));
    // camera.rotation.x -= 0.01;
  } 
});

