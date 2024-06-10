import * as BABYLON from 'babylonjs';

const canvas = document.getElementById('action-canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';

// Инициализация движка
const engine = new BABYLON.Engine(canvas, true);

// Инициализация сцены и привязка к движку
const scene = new BABYLON.Scene(engine);

// Инициализация камеры
const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 10, new BABYLON.Vector3(0, 0, -10), scene);

// Инициализация освещения
const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;

// Инициализация текстуры сцены
const material = new BABYLON.StandardMaterial('material', scene);
material.diffuseTexture = new BABYLON.Texture('./img/blue_sky.png', scene);
// material.specularColor = new BABYLON.Color3(0, 0, 0);
// material.ambientColor = new BABYLON.Color3(0, 0, 0);
// material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);

// Инициализация модели
const sphere = new BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 2, segments: 32}, scene);
sphere.material = material;
sphere.position = new BABYLON.Vector3(0, 0, 0);
sphere.rotation = new BABYLON.Vector3(0, 0, 0);
sphere.scaling = new BABYLON.Vector3(1, 1, 1);

// Запуск движка
engine.runRenderLoop(() => {
  scene.render();
});

