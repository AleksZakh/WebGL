import * as BABYLON from 'babylonjs';
import "babylonjs-loaders/babylon.glTF2FileLoader.js";
import "babylonjs-loaders/babylon.stlFileLoader.js";
import { arrowUp, arrowDown, arrowLeft, arrowRight, arrowClockwise, arrowCounterclockwise, arrowDownLeft, arrowDownRight, arrowUpLeft, arrowUpRight, eye, personWalking, avtodorLogo } from "./icons.js";
import { el, setChildren, setAttr, setStyle } from "redom";
import{avtodorSpinner} from "./functions.js";

/**
 * BABYLON.Vector3(X, Y, Z)
 * координатне оси располагаются следующим образом:
 * "X": +вправо (-влево)
 * "Y": +вверх (-вниз)
 * "Z": +дальше (-ближе)
 */

const canvas = document.getElementById('action-canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';
let sceneObjectList = [];



  
avtodorSpinner('on');

// Инициализация движка
const engine = new BABYLON.Engine(canvas, true);

// Инициализация сцены и привязка к движку
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.3, 1);
scene.enablePhysics();
scene.collisionsEnabled = true;
const assumedFramesPerSecond = 60;
const earthGravity = -9.81;
scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0);
// scene.emissiveTexture = new BABYLON.Texture('./img/blue_sky.png', scene);
// scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin());
// console.log(BABYLON)
scene.createDefaultEnvironment({
  createSkybox: false,
  createGround: false,
  cameraContrast: 1.5,
  cameraExposure: 1,
  enableGroundShadow: true,
});
// Инициализация освещения
const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 20, 0), scene);
// const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.3;
let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

// Инициализация камер
const rotateCamera = new BABYLON.ArcRotateCamera("rotateCamera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene); // Параметры: название, альфа, бета, радиус, целевая позиция, сцена
rotateCamera.setPosition(new BABYLON.Vector3(0, 15, -50)); // Позиционирует камеру, перезаписывая альфа, бета, радиус
rotateCamera.setTarget(BABYLON.Vector3.Zero());
rotateCamera.attachControl(canvas,true); // Это прикрепляет камеру к холсту
rotateCamera.speed = 0.1;
rotateCamera.applyGravity = true;
rotateCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1); // установка эллипсоид вокруг камеры
rotateCamera.checkCollisions = true;

const universaCamera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-20, 2, -5), scene); // Параметры: название, положение, сцена
universaCamera.setTarget(new BABYLON.Vector3(10, 1, -10)); // Нацеливает камеру на определенную позицию. В этом случае в центр сцены
universaCamera.attachControl(canvas, true); // Прикрепляем камеру к холсту
universaCamera.speed = 0.05;
universaCamera.applyGravity = true;
universaCamera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
universaCamera.checkCollisions = true;

scene.activeCamera = rotateCamera;

// === фунуция "замыкания камеры на мышке" (нач.) ===
  let lockEnable = () => {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
    }
    canvas.removeEventListener("pointerup", lockEnable);
  };
// === фунуция "замыкания камеры на мышке" (кон.) ===


// === фунуция "освобождения камеры от мышке" (нач.) ===
  let lockRelease = () => {
    if(document.pointerLockElement !== canvas && document.mozPointerLockElement !== canvas) {      
      console.log("DO SOMETHING");
    }
  };
// === фунуция "освобождения камеры от мышке" (кон.) ===



main();

async function main() {
  const moveBtnList = document.querySelectorAll('#user-interface button');
  moveBtnList.forEach(btn => {
    switch (btn.id) {
      case 'step-leftUp-btn': btn.innerHTML = arrowUpLeft;      
        break;
      case 'step-up-btn': btn.innerHTML = arrowUp;
        break;
      case 'step-rightUp-btn': btn.innerHTML = arrowUpRight;
        break;
      case 'step-left-btn': btn.innerHTML = arrowLeft;
        break;
      case 'step-turnClockwise-btn': btn.innerHTML = arrowClockwise;
        break;
      case 'step-right-btn': btn.innerHTML = arrowRight;
        break;
      case 'step-downLeft-btn': btn.innerHTML = arrowDownLeft;
        break;
      case 'step-down-btn': btn.innerHTML = arrowDown;
        break;
      case 'step-downRight-btn': btn.innerHTML = arrowDownRight;
        break;

      case 'eye-btn': btn.innerHTML = eye;
        break;
      case 'move-btn': btn.innerHTML = personWalking;
        break;
    
      default:
        break;
    }
  })
  
  // ============================================
  // Создание мира
  // ============================================


  //---------- Инициализация поверхности земли ----------------
    for (let x = -10; x < 11; x++) {
      for (let z = -10; z < 20; z++) {
        groundCreate(x*10, 0, z*10);
      }
    }
    function groundCreate(xPos, yPos, zPos=0) {
      const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10, subdivisions: 4}, scene, true);
      ground.material = new BABYLON.StandardMaterial("ground", scene);
      ground.material.emissiveTexture = new BABYLON.Texture('./img/textura_greenland.jpg', scene);
      ground.applyGravity = true; //включение гравитации
      ground.receiveShadows = true; //пирём теней на земле
      ground.checkCollisions = true; //проверка столкновений
      ground._position = new BABYLON.Vector3(xPos, yPos, zPos);    
    }
  //---------- Инициализация поверхности земли ----------------



  //---------- Инициализация неба и воды  ----------------
    const skybox = new BABYLON.MeshBuilder.CreateBox('skyBox', {size: 1000}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('./img/TropicalSunnyDay', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.backFaceCulling = false;
    skybox.material = skyboxMaterial;
  //---------- Инициализация неба и воды  ----------------


  // ============================================
  // Создание объектов
  // ============================================

  // ============= МОСТ ====================
    let platforms = [];

    // ========== рисуем ступеньки ==============
    const createFrontRightSteps = (zPos) => {
      let railingHeight, yPod;
      if(zPos == 1 || zPos == 8){
        railingHeight =  4;
        yPod = 1;
      } else {
        railingHeight = 1.5;
        yPod = 0;
      }
      
      let platform = new BABYLON.MeshBuilder.CreateBox('box', { width: 4, height: 0.5, depth: 2, wrap: true }, scene);
      platform.position = new BABYLON.Vector3(13, zPos/2, zPos*2);
      // Создание материала
      const boxMaterial = new BABYLON.StandardMaterial('material', scene);
      // boxMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3,);
      boxMaterial.emissiveTexture = new BABYLON.Texture('./img/Textura_beton_1.png', scene);
      platform.material = boxMaterial;
      platform.checkCollisions = true; //включаем проверку столкновений
      shadowGenerator.getShadowMap().renderList.push(platform);
      platforms.push(platform);
      sceneObjectList.push(platform);
      platform.physicsImpostor = new BABYLON.PhysicsImpostor(platform, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      const railingLeft = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingLeft.position = new BABYLON.Vector3(11.2, (zPos/2)+1+yPod, zPos*2);
      railingLeft.material = new BABYLON.StandardMaterial('material', scene);
      railingLeft.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingLeft.physicsImpostor = new BABYLON.PhysicsImpostor(railingLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingLeft);
      railingLeft.checkCollisions = true;
      const railingRight = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingRight.position = new BABYLON.Vector3(14.8, (zPos/2)+1+yPod, zPos*2);
      railingRight.material = new BABYLON.StandardMaterial('material', scene);
      railingRight.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingRight.physicsImpostor = new BABYLON.PhysicsImpostor(railingRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingRight);
      railingRight.checkCollisions = true;
    }
    const createFrontLeftSteps = (zPos) => {
      let platform = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 4,
        height: 0.5,
        depth: 2,
        wrap: true
      }, scene);
      let railingHeight, yPod;
      if(zPos == 1 || zPos == 8){
        railingHeight =  4;
        yPod = 1;
      } else {
        railingHeight = 1.5;
        yPod = 0;
      }
      platform.position = new BABYLON.Vector3(-11, zPos/2, zPos*2);
      // Создание материала
      const boxMaterial = new BABYLON.StandardMaterial('material', scene);
      boxMaterial.emissiveTexture = new BABYLON.Texture('./img/Textura_beton_1.png', scene);
      platform.material = boxMaterial;
      platform.checkCollisions = true; //включаем проверку столкновений
      shadowGenerator.getShadowMap().renderList.push(platform);
      platforms.push(platform);
      sceneObjectList.push(platform);
      platform.physicsImpostor = new BABYLON.PhysicsImpostor(platform, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      const railingLeft = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingLeft.position = new BABYLON.Vector3(-9.2, (zPos/2)+1+yPod, zPos*2);
      railingLeft.material = new BABYLON.StandardMaterial('material', scene);
      railingLeft.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingLeft.physicsImpostor = new BABYLON.PhysicsImpostor(railingLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingLeft);
      railingLeft.checkCollisions = true;
      const railingRight = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingRight.position = new BABYLON.Vector3(-12.8, (zPos/2)+1+yPod, zPos*2);
      railingRight.material = new BABYLON.StandardMaterial('material', scene);
      railingRight.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingRight.physicsImpostor = new BABYLON.PhysicsImpostor(railingRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingRight);
      railingRight.checkCollisions = true;
    }
    const createRearRightSteps = (zPos) => {
      if(zPos === 0) zPos = zPos+0.1
      let rearStep = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 4,
        height: 0.5,
        depth: 2,
        wrap: true
      }, scene);
      let railingHeight, yPod;
      if(zPos == 1 || zPos == 8){
        railingHeight =  4;
        yPod = 1;
      } else {
        railingHeight = 1.5;
        yPod = 0;
      }
      rearStep.position = new BABYLON.Vector3(13, zPos/2, zPos*2*((22-zPos)/zPos));
      // Создание материала
      const boxMaterial = new BABYLON.StandardMaterial('material', scene);
      boxMaterial.emissiveTexture = new BABYLON.Texture('./img/Textura_beton_1.png', scene);
      rearStep.material = boxMaterial;
      rearStep.checkCollisions = true; //включаем проверку столкновений
      shadowGenerator.getShadowMap().renderList.push(rearStep);
      sceneObjectList.push(rearStep);
      rearStep.physicsImpostor = new BABYLON.PhysicsImpostor(rearStep, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      const railingLeft = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingLeft.position = new BABYLON.Vector3(11.2, (zPos/2)+1+yPod, zPos*2*((22-zPos)/zPos));
      railingLeft.material = new BABYLON.StandardMaterial('material', scene);
      railingLeft.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingLeft.physicsImpostor = new BABYLON.PhysicsImpostor(railingLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingLeft);
      railingLeft.checkCollisions = true;
      const railingRight = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingRight.position = new BABYLON.Vector3(14.8, (zPos/2)+1+yPod, zPos*2*((22-zPos)/zPos));
      railingRight.material = new BABYLON.StandardMaterial('material', scene);
      railingRight.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingRight.physicsImpostor = new BABYLON.PhysicsImpostor(railingRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingRight);
      railingRight.checkCollisions = true;
    }
    const createRearLeftSteps = (zPos) => {
      if(zPos === 0) zPos = zPos+0.1
      let rearStep = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 4,
        height: 0.5,
        depth: 2,
        wrap: true
      }, scene);
      let railingHeight, yPod;
      if(zPos == 1 || zPos == 8){
        railingHeight =  4;
        yPod = 1;
      } else {
        railingHeight = 1.5;
        yPod = 0;
      }
      rearStep.position = new BABYLON.Vector3(-11, zPos/2, zPos*2*((22-zPos)/zPos));
      // Создание материала
      const boxMaterial = new BABYLON.StandardMaterial('material', scene);
      boxMaterial.emissiveTexture = new BABYLON.Texture('./img/Textura_beton_1.png', scene);
      rearStep.material = boxMaterial;
      rearStep.checkCollisions = true;
      shadowGenerator.getShadowMap().renderList.push(rearStep);
      sceneObjectList.push(rearStep);
      rearStep.physicsImpostor = new BABYLON.PhysicsImpostor(rearStep, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      const railingLeft = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingLeft.position = new BABYLON.Vector3(-9.2, (zPos/2)+1+yPod, zPos*2*((22-zPos)/zPos));
      railingLeft.material = new BABYLON.StandardMaterial('material', scene);
      railingLeft.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingLeft.physicsImpostor = new BABYLON.PhysicsImpostor(railingLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingLeft);
      railingLeft.checkCollisions = true;
      const railingRight = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: railingHeight, depth: 0.2, wrap: true}, scene);
      railingRight.position = new BABYLON.Vector3(-12.8, (zPos/2)+1+yPod, zPos*2*((22-zPos)/zPos));
      railingRight.material = new BABYLON.StandardMaterial('material', scene);
      railingRight.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      railingRight.physicsImpostor = new BABYLON.PhysicsImpostor(railingRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      shadowGenerator.getShadowMap().renderList.push(railingRight);
      railingRight.checkCollisions = true;
    }
    for (let i = 0; i < 10; i++) {
      createFrontRightSteps(i);
      createFrontLeftSteps(i);
      createRearRightSteps(i);
      createRearLeftSteps(i);
    }

    function bridgeRailingsCreate(xPos, yPos, zPos) {
      const bridgeRailings = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 20.5,
        height: 0.2,
        depth: 0.2,
        wrap: true
      }, scene);
      bridgeRailings.position = new BABYLON.Vector3(xPos, yPos, zPos);
      bridgeRailings.material = new BABYLON.StandardMaterial('material', scene);
      bridgeRailings.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      
      shadowGenerator.getShadowMap().renderList.push(bridgeRailings);
      sceneObjectList.push(bridgeRailings);
      bridgeRailings.physicsImpostor = new BABYLON.PhysicsImpostor(bridgeRailings, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      bridgeRailings.checkCollisions = true;
    }

    function bridgeSideRailingsCreate(xPos, yPos, zPos) {
      const bridgeSideRailings = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 0.2,
        height: 0.2,
        depth: 4.8,
        wrap: true
      }, scene);
      bridgeSideRailings.position = new BABYLON.Vector3(xPos, yPos, zPos);
      bridgeSideRailings.material = new BABYLON.StandardMaterial('material', scene);
      bridgeSideRailings.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      
      shadowGenerator.getShadowMap().renderList.push(bridgeSideRailings);
      sceneObjectList.push(bridgeSideRailings);
      bridgeSideRailings.physicsImpostor = new BABYLON.PhysicsImpostor(bridgeSideRailings, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      bridgeSideRailings.checkCollisions = true;
    }

    bridgeRailingsCreate(1, 7, 19.5);
    bridgeRailingsCreate(1, 7, 24.5);

    bridgeSideRailingsCreate(15.5, 7, 21.8);
    bridgeSideRailingsCreate(-13.3, 7, 21.8);

    function glassCreate(posX, posY, posZ, rotateAngle = 0) {
      let glass = new BABYLON.MeshBuilder.CreateCylinder('cone', {
        diameter: 4,
        height: 22,
        enclose: true,
        arc: 0.5,
      }, scene);
      glass.position = new BABYLON.Vector3(0, 10, 0);
      glass.material = new BABYLON.StandardMaterial('material', scene);
      glass.material.emissiveColor = new BABYLON.Color3(0.2, 0.3, 0.45);
      glass.position = new BABYLON.Vector3(posX, posY, posZ );
      glass.rotate(BABYLON.Axis.X, rotateAngle, BABYLON.Space.WORLD);
      glass.hasVertexAlpha = true;
      glass.visibility = 0.8;
      // shadowGenerator.getShadowMap().renderList.push(glass);
      // glass.physicsImpostor = new BABYLON.PhysicsImpostor(glass, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 0 }, scene);
      glass.checkCollisions = true;  
    }

    let bridgeGlass = new BABYLON.MeshBuilder.CreateCylinder('cone', {
      diameter: 6,
      height: 29.5,
      enclose: true,
      arc: 0.5,
    }, scene);
    bridgeGlass.position = new BABYLON.Vector3(1, 9, 22);
    bridgeGlass.material = new BABYLON.StandardMaterial('material', scene);
    bridgeGlass.material.emissiveColor = new BABYLON.Color3(0.2, 0.3, 0.45);
    // bridgeGlass.position = new BABYLON.Vector3(posX, posY, posZ );
    bridgeGlass.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
    bridgeGlass.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
    bridgeGlass.hasVertexAlpha = true;
    bridgeGlass.visibility = 0.8;
    // shadowGenerator.getShadowMap().renderList.push(glass);
    // glass.physicsImpostor = new BABYLON.PhysicsImpostor(glass, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 0 }, scene);
    bridgeGlass.checkCollisions = true;  

    function railingsCreate(posX, posY, posZ, rotateAngle = 0) {
      const railingLeftUp = new BABYLON.MeshBuilder.CreateBox('box', { width: 0.2, height: 0.2, depth: 21, wrap: true}, scene);
      railingLeftUp.position = new BABYLON.Vector3(posX, posY, posZ);
      railingLeftUp.material = new BABYLON.StandardMaterial('material', scene);
      railingLeftUp.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
      shadowGenerator.getShadowMap().renderList.push(railingLeftUp);
      railingLeftUp.physicsImpostor = new BABYLON.PhysicsImpostor(railingLeftUp, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      railingLeftUp.checkCollisions = true;
      // railingLeftUp.applyGravity = true;
      railingLeftUp.rotate(BABYLON.Axis.X, rotateAngle, BABYLON.Space.WORLD);
    }

    railingsCreate(14.8, 4, 9, 2.9);
    railingsCreate(11.2, 4, 9, 2.9);
    railingsCreate(-9.2, 4, 9, 2.9);
    railingsCreate(-12.8, 4, 9, 2.9);
    railingsCreate(14.8, 4, 35, 0.25);
    railingsCreate(11.2, 4, 35, 0.25);
    railingsCreate(-9.2, 4, 35, 0.25);
    railingsCreate(-12.8, 4, 35, 0.25);

    glassCreate(13, 5.7, 9, 1.33);
    glassCreate(-11, 5.7, 9, 1.33);
    glassCreate(13, 5.7, 35, 1.83);
    glassCreate(-11, 5.7, 35, 1.83);

    
    let bridge = new BABYLON.MeshBuilder.CreateBox('box', {
      width: 30,
      height: 0.5,
      depth: 6,
      wrap: true
    }, scene);
    bridge.position = new BABYLON.Vector3(1, platforms[platforms.length - 1].position.y, platforms[platforms.length - 1].position.z+4);
    bridge.material = new BABYLON.StandardMaterial('material', scene);
    bridge.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
    bridge.checkCollisions = true;
    shadowGenerator.getShadowMap().renderList.push(bridge);
    sceneObjectList.push(bridge);
    bridge.physicsImpostor = new BABYLON.PhysicsImpostor(bridge, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    let supportRight1 = new BABYLON.MeshBuilder.CreateBox('box', {
      width: 0.5,
      height: 4.5,
      depth: 0.5,
      wrap: true
    }, scene);
    supportRight1.position = new BABYLON.Vector3(13, platforms[platforms.length - 1].position.y-2, platforms[platforms.length - 1].position.z+1.5);
    supportRight1.material = new BABYLON.StandardMaterial('material', scene);
    supportRight1.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
    supportRight1.checkCollisions = true;
    shadowGenerator.getShadowMap().renderList.push(supportRight1);
    sceneObjectList.push(supportRight1);
    supportRight1.physicsImpostor = new BABYLON.PhysicsImpostor(supportRight1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    let supportRight2 = new BABYLON.MeshBuilder.CreateBox('box', {
      width: 0.5,
      height: 4.5,
      depth: 0.5,
      wrap: true
    }, scene);
    supportRight2.position = new BABYLON.Vector3(13, platforms[platforms.length - 1].position.y-2, platforms[platforms.length - 1].position.z+6.5);
    supportRight2.material = new BABYLON.StandardMaterial('material', scene);
    supportRight2.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
    supportRight2.checkCollisions = true;
    shadowGenerator.getShadowMap().renderList.push(supportRight2);
    sceneObjectList.push(supportRight2);
    supportRight2.physicsImpostor = new BABYLON.PhysicsImpostor(supportRight2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    let supportCenter1 = new BABYLON.MeshBuilder.CreateBox('box', {
      width: 0.5,
      height: 4.5,
      depth: 0.5,
      wrap: true
    }, scene);
    supportCenter1.position = new BABYLON.Vector3(1, platforms[platforms.length - 1].position.y-2, platforms[platforms.length - 1].position.z+1.5);
    supportCenter1.material = new BABYLON.StandardMaterial('material', scene);
    supportCenter1.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
    supportCenter1.checkCollisions = true;
    shadowGenerator.getShadowMap().renderList.push(supportCenter1);
    sceneObjectList.push(supportCenter1);
    supportCenter1.physicsImpostor = new BABYLON.PhysicsImpostor(supportCenter1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    let supportCenter2 = new BABYLON.MeshBuilder.CreateBox('box', {
      width: 0.5,
      height: 4.5,
      depth: 0.5,
      wrap: true
    }, scene);
    supportCenter2.position = new BABYLON.Vector3(1, platforms[platforms.length - 1].position.y-2, platforms[platforms.length - 1].position.z+6.5);
    supportCenter2.material = new BABYLON.StandardMaterial('material', scene);
    supportCenter2.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
    supportCenter2.checkCollisions = true;
    shadowGenerator.getShadowMap().renderList.push(supportCenter2);
    sceneObjectList.push(supportCenter2);
    supportCenter2.physicsImpostor = new BABYLON.PhysicsImpostor(supportCenter2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    let supportLeft1 = new BABYLON.MeshBuilder.CreateBox('box', {
      width: 0.5,
      height: 4.5,
      depth: 0.5,
      wrap: true
    }, scene);
    supportLeft1.position = new BABYLON.Vector3(-11, platforms[platforms.length - 1].position.y-2, platforms[platforms.length - 1].position.z+1.5);
    supportLeft1.material = new BABYLON.StandardMaterial('material', scene);
    supportLeft1.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
    supportLeft1.checkCollisions = true;
    shadowGenerator.getShadowMap().renderList.push(supportLeft1);
    sceneObjectList.push(supportLeft1);
    supportLeft1.physicsImpostor = new BABYLON.PhysicsImpostor(supportLeft1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    let supportLeft2 = new BABYLON.MeshBuilder.CreateBox('box', {
      width: 0.5,
      height: 4.5,
      depth: 0.5,
      wrap: true
    }, scene);
    supportLeft2.position = new BABYLON.Vector3(-11, platforms[platforms.length - 1].position.y-2, platforms[platforms.length - 1].position.z+6.5);
    supportLeft2.material = new BABYLON.StandardMaterial('material', scene);
    supportLeft2.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);
    supportLeft2.checkCollisions = true;
    shadowGenerator.getShadowMap().renderList.push(supportLeft2);
    sceneObjectList.push(supportLeft2);
    supportLeft2.physicsImpostor = new BABYLON.PhysicsImpostor(supportLeft2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    function bridgeSupportCreate(xPos, yPos, zPos) {
      let bridgeSapport = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 0.3,
        height: 5,
        depth: 0.3,
        wrap: true
      }, scene);
      bridgeSapport.position = new BABYLON.Vector3(xPos, yPos, zPos);
      bridgeSapport.material = new BABYLON.StandardMaterial('material', scene);
      bridgeSapport.material.emissiveTexture = new BABYLON.Texture('./img/Textura_beton.png', scene);  
      bridgeSapport.physicsImpostor = new BABYLON.PhysicsImpostor(
        bridgeSapport,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {
          mass: 0
        }, scene);
      bridgeSapport.checkCollisions = true;
      
      shadowGenerator.getShadowMap().renderList.push(bridgeSapport);
      sceneObjectList.push(bridgeSapport);
      

      /**
       * railingLeftUp.physicsImpostor = new BABYLON.PhysicsImpostor(railingLeftUp, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      railingLeftUp.checkCollisions = true;
      // railingLeftUp.applyGravity = true;
      */
    }

    for (let i = 0; i < 4; i++) {
      bridgeSupportCreate(15.5, 7.2, 19.5+i*1.6);
    }
    for (let i = 1; i < 8; i++) {
      bridgeSupportCreate(14.5-i*3.4, 7.2, 19.5);  
    }
    for (let i = 0; i < 4; i++) {
      bridgeSupportCreate(-13.3, 7.2, 19.5+i*1.6);
    }
    for (let i = 0; i < 7; i++) {
      bridgeSupportCreate(-9.3+i*3.4, 7.2, 24.5);  
    }


  // ============= КОНЕЦ МОСТА =============

  // ============= Поверхность дороги =============
    let road = (zPoz) => { 
      BABYLON.SceneLoader.ImportMesh(null, "./models/DorPolotno/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
        // console.log(meshes);
        let road = meshes[0];
        road.scaling = new BABYLON.Vector3(1.3, 1, 1.3);
        road.position = new BABYLON.Vector3(-2.1, 1.27, 30-(7.4*zPoz));
        shadowGenerator.addShadowCaster(road);
        road.receiveShadows = true;
        road.checkCollisions = true;
        road.physicsImpostor = new BABYLON.PhysicsImpostor(road, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        // sceneObjectList.push(town); panelHause
      })
      BABYLON.SceneLoader.ImportMesh(null, "./models/DorPolotno/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
        // console.log(meshes);
        let road = meshes[0];
        road.scaling = new BABYLON.Vector3(1.3, 1, 1.3);
        road.position = new BABYLON.Vector3(-12.1, 1.27, 30-(7.4*zPoz));
        shadowGenerator.addShadowCaster(road);
        road.receiveShadows = true;
        road.checkCollisions = true;
        road.physicsImpostor = new BABYLON.PhysicsImpostor(road, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        // sceneObjectList.push(town); panelHause
      })      
    }

    let roadSeparation = (xPos, zPos, rotateAngle) => {
      BABYLON.SceneLoader.ImportMesh(null, "./models/road_separation_fence/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
        // console.log(meshes);
        let separation = meshes[0];
        separation.scaling = new BABYLON.Vector3(0.7, 0.9, 0.7);
        separation.position = new BABYLON.Vector3(xPos, 0, 18.5-(4*zPos));
        shadowGenerator.addShadowCaster(separation);
        separation.receiveShadows = true;
        separation.checkCollisions = true;
        separation.physicsImpostor = new BABYLON.PhysicsImpostor(separation, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        separation.rotate(BABYLON.Axis.Y, rotateAngle, BABYLON.Space.WORLD);
        // sceneObjectList.push(town); panelHause
      })
    };
    
    for (let i = -20; i <= 15; i++) {
      road(i);  
    }
    for (let i = -12; i < 23; i++) {
      roadSeparation(-8.3, i, 3*Math.PI/2);
      roadSeparation(10.3, i, Math.PI/2);
    }

    for (let i = -40; i < -21; i++) {
      roadSeparation(10.3, i, 3*Math.PI/2);      
    }

    BABYLON.SceneLoader.ImportMesh(null, "./models/Povorot_90/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let povorot_1 = meshes[0];
      povorot_1.scaling = new BABYLON.Vector3(1.4, 1, 1.3);
      povorot_1.position = new BABYLON.Vector3(27.3, 0.23, 111);
      povorot_1.rotate(BABYLON.Axis.Y, 3.76, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(povorot_1);
      povorot_1.receiveShadows = true;
      povorot_1.checkCollisions = true;
      povorot_1.physicsImpostor = new BABYLON.PhysicsImpostor(povorot_1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })


    // Съезд
    BABYLON.SceneLoader.ImportMesh(null, "./models/Syezd_0/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      meshes.splice(1, 1);
      // console.log(meshes);
      let road_2 = meshes[0];
      road_2.scaling = new BABYLON.Vector3(0.9, 1, 1.2);
      road_2.position = new BABYLON.Vector3(9.58, 0.55, 106);
      road_2.rotate(BABYLON.Axis.Y, 3.198, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road_2);
      road_2.receiveShadows = true;
      road_2.checkCollisions = true;
      road_2.physicsImpostor = new BABYLON.PhysicsImpostor(road_2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/Polotno_three_lines/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let road_ = meshes[0];
      road_.scaling = new BABYLON.Vector3(1.4, 1, 1.3);
      road_.position = new BABYLON.Vector3(4.42, 0.2, 90);
      road_.rotate(BABYLON.Axis.Y, 3.142, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road_);
      road_.receiveShadows = true;
      road_.checkCollisions = true;
      road_.physicsImpostor = new BABYLON.PhysicsImpostor(road_, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/Polotno_three_lines/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let road__ = meshes[0];
      road__.scaling = new BABYLON.Vector3(1.4, 1, 1.3);
      road__.position = new BABYLON.Vector3(4.42, 0.25, 85);
      road__.rotate(BABYLON.Axis.Y, 3.142, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road__);
      road__.receiveShadows = true;
      road__.checkCollisions = true;
      road__.physicsImpostor = new BABYLON.PhysicsImpostor(road__, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/Polotno_three_lines/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let road___ = meshes[0];
      road___.scaling = new BABYLON.Vector3(1.4, 1, 1.3);
      road___.position = new BABYLON.Vector3(4.42, 0.25, 80);
      road___.rotate(BABYLON.Axis.Y, 3.142, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road___);
      road___.receiveShadows = true;
      road___.checkCollisions = true;
      road___.physicsImpostor = new BABYLON.PhysicsImpostor(road___, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/Polotno_three_lines/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let road___0 = meshes[0];
      road___0.scaling = new BABYLON.Vector3(1.4, 1, 1.3);
      road___0.position = new BABYLON.Vector3(4.42, 0.25, 75);
      road___0.rotate(BABYLON.Axis.Y, 3.142, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road___0);
      road___0.receiveShadows = true;
      road___0.checkCollisions = true;
      road___0.physicsImpostor = new BABYLON.PhysicsImpostor(road___0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })


    BABYLON.SceneLoader.ImportMesh(null, "./models/road_empty/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let road_0 = meshes[0];
      road_0.scaling = new BABYLON.Vector3(1, 1, 7);
      road_0.position = new BABYLON.Vector3(18, 0.15, 106);
      road_0.rotate(BABYLON.Axis.Y, 3.25, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road_0);
      road_0.receiveShadows = true;
      road_0.checkCollisions = true;
      road_0.physicsImpostor = new BABYLON.PhysicsImpostor(road_0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/road_empty/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let road__0 = meshes[0];
      road__0.scaling = new BABYLON.Vector3(1.3, 1, 4);
      road__0.position = new BABYLON.Vector3(45, 0, 122.9);
      road__0.rotate(BABYLON.Axis.Y, 4.28, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road__0);
      road__0.receiveShadows = true;
      road__0.checkCollisions = true;
      road__0.physicsImpostor = new BABYLON.PhysicsImpostor(road__0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/road_empty/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // meshes.splice(1, 1);
      // console.log(meshes);
      let road__ = meshes[0];
      road__.scaling = new BABYLON.Vector3(0.6, 1 , 0.7);
      road__.position = new BABYLON.Vector3(13.5, 0.3, 68);
      road__.rotate(BABYLON.Axis.Y, 3.178, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(road__);
      road__.receiveShadows = true;
      road__.checkCollisions = true;
      road__.physicsImpostor = new BABYLON.PhysicsImpostor(road__, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      // sceneObjectList.push(town); panelHause
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/road_separation_fence/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // console.log(meshes);
      let separation = meshes[0];
      separation.scaling = new BABYLON.Vector3(0.7, 0.9, 0.7); //(9.58, 0.55, 106)
      separation.position = new BABYLON.Vector3(9.58, 0.55, 90);
      shadowGenerator.addShadowCaster(separation);
      separation.receiveShadows = true;
      separation.checkCollisions = true;
      separation.physicsImpostor = new BABYLON.PhysicsImpostor(separation, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      separation.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);
      // sceneObjectList.push(town); panelHause
    })

    // BABYLON.SceneLoader.ImportMesh(null, "./models/Povorot_90/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
    //   // meshes.splice(1, 1);
    //   console.log(meshes);
    //   let povorot_2 = meshes[0];
    //   povorot_2.scaling = new BABYLON.Vector3(1.4, 1, 1.3);
    //   povorot_2.position = new BABYLON.Vector3(41, 0.2, 121);
    //   povorot_2.rotate(BABYLON.Axis.Y, 4.23, BABYLON.Space.WORLD);
    //   shadowGenerator.addShadowCaster(povorot_2);
    //   povorot_2.receiveShadows = true;
    //   povorot_2.checkCollisions = true;
    //   povorot_2.physicsImpostor = new BABYLON.PhysicsImpostor(povorot_2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    //   // sceneObjectList.push(town); panelHause
    // })
    // BABYLON.SceneLoader.ImportMesh(null, "./models/road_empty/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
    //   // meshes.splice(1, 1);
    //   // console.log(meshes);
    //   let road__1 = meshes[0];
    //   road__1.scaling = new BABYLON.Vector3(1.3, 1, 2);
    //   road__1.position = new BABYLON.Vector3(45, 0, 122);
    //   road__1.rotate(BABYLON.Axis.Y, 4.7, BABYLON.Space.WORLD);
    //   shadowGenerator.addShadowCaster(road__1);
    //   road__1.receiveShadows = true;
    //   road__1.checkCollisions = true;
    //   road__1.physicsImpostor = new BABYLON.PhysicsImpostor(road__1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    //   // sceneObjectList.push(town); panelHause
    // })

    // let roadCross = BABYLON.MeshBuilder.CreateGround("roadCross", {width:8.1, height:10}, scene);
    // roadCross.position = new BABYLON.Vector3(14, 0.01, 80);
    // roadCross.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
    // roadCross.material = new BABYLON.StandardMaterial("roadCross", scene);
    // roadCross.material.emissiveTexture = new BABYLON.Texture('./img/Textura_doroga.png', scene);
    // roadCross.receiveShadows = true;
    // roadCross.physicsImpostor = new BABYLON.PhysicsImpostor(roadCross, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    

  // ============= КОНЕЦ ПОВЕРХНОСТИ ДОРОГИ =============
  

  // =========== Внешние объекты (нач.) ===========
  BABYLON.SceneLoader.ImportMesh(null, "./models/gasStation/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
    // console.log(meshes);
    let gasStation = meshes[0];
    gasStation.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
    gasStation.position = new BABYLON.Vector3(70, -0.35, 140);
    shadowGenerator.addShadowCaster(gasStation);
    gasStation.receiveShadows = true;
    gasStation.checkCollisions = true;
    // NewJarsi.physicsImpostor = new BABYLON.PhysicsImpostor(NewJarsi, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);      
    gasStation.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
    // allManHends.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
    // sceneObjectList.push(town); panelHause
  })

  BABYLON.SceneLoader.ImportMesh(null, "./models/russian_gas_station/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
    // console.log(meshes);
    let gasStationRu = meshes[0];
    gasStationRu.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    gasStationRu.position = new BABYLON.Vector3(-30, 2.3, -30);
    shadowGenerator.addShadowCaster(gasStationRu);
    gasStationRu.receiveShadows = true;
    gasStationRu.checkCollisions = true;
    // NewJarsi.physicsImpostor = new BABYLON.PhysicsImpostor(NewJarsi, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);      
    gasStationRu.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);
    // allManHends.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
    // sceneObjectList.push(town); panelHause
  })




    let fanStolbCreate = (zPos) => {
      BABYLON.SceneLoader.ImportMesh(null, "./models/Fanar_stolb/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
        // console.log(meshes);
        let Stolb = meshes[0];
        Stolb.scaling = new BABYLON.Vector3(0.8, 0.7, 0.8);
        Stolb.position = new BABYLON.Vector3(1, -0.62, (55*zPos)-7);
        shadowGenerator.addShadowCaster(Stolb);
        Stolb.receiveShadows = true;
        Stolb.checkCollisions = true;
        Stolb.physicsImpostor = new BABYLON.PhysicsImpostor(Stolb, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        Stolb.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        // sceneObjectList.push(town); panelHause
      })
    }
    for (let i = -1; i < 4; i++) {
      fanStolbCreate(i);      
    }

    let newJersi = (zPos) => {
      BABYLON.SceneLoader.ImportMesh(null, "./models/NewJarsi/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
        // console.log(meshes);
        let NewJarsi = meshes[0];
        NewJarsi.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);
        NewJarsi.position = new BABYLON.Vector3(-10.8, -0.65, (2.7*zPos)+2.8);
        shadowGenerator.addShadowCaster(NewJarsi);
        NewJarsi.receiveShadows = true;
        NewJarsi.checkCollisions = true;
        NewJarsi.physicsImpostor = new BABYLON.PhysicsImpostor(NewJarsi, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        NewJarsi.rotate(BABYLON.Axis.Y, 0.96, BABYLON.Space.WORLD);
        // sceneObjectList.push(town); panelHause
      })
    }
    for (let i = -25; i < 9; i++) {
      newJersi(i);      
    }
    for (let i = 11; i < 45; i++) {
      newJersi(i);
    }

    // ====== знак заправки ===============
    BABYLON.SceneLoader.ImportMesh(null, "./models/Gas_sign/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // console.log(meshes);
      let gasSign = meshes[0];
      gasSign.id = 'gas_sign';
      gasSign.name ='gas_sign';
      gasSign.descript = 'Заправка';
      gasSign.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
      gasSign.position = new BABYLON.Vector3(10.5, 0, -15);
      shadowGenerator.addShadowCaster(gasSign);
      gasSign.receiveShadows = true;
      gasSign.checkCollisions = true;
      gasSign.physicsImpostor = new BABYLON.PhysicsImpostor(gasSign, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      sceneObjectList.push(gasSign);
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/Syezd_strelka/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // console.log(meshes);
      let strelkaRight = meshes[0];
      strelkaRight.id = 'strelka-right';
      strelkaRight.name ='strelka-right';
      strelkaRight.descript = 'Разметка съезд направо';
      strelkaRight.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
      strelkaRight.position = new BABYLON.Vector3(7.7, 0.5, -0.65);
      strelkaRight.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
      shadowGenerator.addShadowCaster(strelkaRight);
      strelkaRight.receiveShadows = true;
      strelkaRight.checkCollisions = true;
      strelkaRight.physicsImpostor = new BABYLON.PhysicsImpostor(strelkaRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      sceneObjectList.push(strelkaRight);
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/Strelka/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
      // console.log(meshes);
      let strelka = meshes[0];
      strelka.id = 'strelka-forward';
      strelka.name ='strelka-forward';
      strelka.descript = 'Разметка проезд прямо';
      strelka.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
      strelka.position = new BABYLON.Vector3(3.9, 1.2, -1);
      shadowGenerator.addShadowCaster(strelka);
      strelka.receiveShadows = true;
      strelka.checkCollisions = true;
      strelka.physicsImpostor = new BABYLON.PhysicsImpostor(strelka, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      sceneObjectList.push(strelka);
    })

    BABYLON.SceneLoader.ImportMesh(null, "./models/roadSings/speed70/", "speed70.gltf", scene, function (meshes, particleSystems, skeletons) {
      // console.log(meshes);
      let speed70 = meshes[0];
      speed70.id = 'speed70_sign';
      speed70.name ='speed70_sign';
      speed70.descript = 'Ограничение скорости 70 км/ч';
      speed70.scaling = new BABYLON.Vector3(2, 2, 2);
      speed70.position = new BABYLON.Vector3(6, 0, 13);
      shadowGenerator.addShadowCaster(speed70);
      speed70.receiveShadows = true;
      speed70.checkCollisions = true;
      speed70.physicsImpostor = new BABYLON.PhysicsImpostor(speed70, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      sceneObjectList.push(speed70);
    })

    

  // =========== Внешние объекты (кон.) ===========

}

function hendsCreate(params) {
  if(params === 'create'){
    BABYLON.SceneLoader.ImportMesh(null, "./models/allManHends/", "all-man-hend.gltf", scene, function (meshes, particleSystems, skeletons) {
      // console.log(meshes);
      let allManHends = meshes[0];
      allManHends.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
      
      shadowGenerator.addShadowCaster(allManHends);
      allManHends.receiveShadows = true;
      allManHends.checkCollisions = true;
      // NewJarsi.physicsImpostor = new BABYLON.PhysicsImpostor(NewJarsi, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);      
      allManHends.rotate(BABYLON.Axis.Y, 3*Math.PI/2, BABYLON.Space.WORLD);
      allManHends.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
      let camPosition = scene.activeCamera._position;
      allManHends.position = camPosition;
      console.log(allManHends.position);
      allManHends.position._z = allManHends.position._z + 10;
      // new BABYLON.Vector3(10, 2, -20);
      allManHends.position = new BABYLON.Vector3(10, 2, -20);
      // allManHends.position = new BABYLON.Vector3(10, 2, -10);
      // sceneObjectList.push(town); panelHause
    })
  } else if(params === 'delete') {
    console.log(scene);
    // scene.removeMesh(allManHends);
    // ground.dispose();
    // scene.debugLayer.show({embedMode:true});
    scene.meshes.forEach(element => {
      if(element.name.includes('Male_hand_40plus')) {
        scene.meshes.splice(scene.meshes.indexOf(element), 2);
      }
    });
  }  
}
// ============================================
// Логика
// ============================================

scene.registerBeforeRender(() => {

  // for (let i = 0; i < sceneObjectList.length; i++) {
    
  //   if(sceneObjectList[i].intersectsMesh(universaCamera, true)){
  //     sceneObjectList[i].material.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
  //   }
    
  // }
})

// Запуск движка
engine.runRenderLoop(() => {

  scene.render();
  
});

avtodorSpinner('off');


// ============================================
// Обработчики событий
// ============================================

let signList = [];
let objPosition = {};

canvas.addEventListener('keydown', (event) => {
  let camPosition = scene.activeCamera._position;
  let messageArea = document.getElementById('message-area');
  let textArea = document.getElementById('add-info-text-area');
  // console.log(event.key);
  // console.log(sceneObjectList);
  if(scene.activeCamera.id == 'UniversalCamera') {
    if(event.key === 'Control') {
      console.log(camPosition);
      sceneObjectList.forEach(element => {
        let elementPosition = element._position;
        console.log('###############');
        console.log('X = ', (camPosition.x - elementPosition.x));
        console.log('Z = ', (camPosition.z - elementPosition.z));
        console.log('Y = ', (camPosition.y - elementPosition.y));
        console.log('$$$$$$$$$$$$$$$$');
      });      
      
    }
    if(event.key === 'Shift') {
      universaCamera.speed = 0.6;
    }
    // console.log('UniversaCamera')
    objPosition = scene.activeCamera._position;
    
    sceneObjectList.forEach(element => {
      let elementPosition = element._position;
      // objPosition = {};
      // {'dX':Math.abs(camPosition.x - elementPosition.x),
      // 'dZ':Math.abs(camPosition.y - elementPosition.y),
      // 'dY':Math.abs(camPosition.z - elementPosition.z),}
      if(
        (Math.abs(camPosition.x - elementPosition.x)<1.5) &&
        (Math.abs(camPosition.y - element.ellipsoid.y)<1.5) && 
        (Math.abs(camPosition.z - elementPosition.z)<1.5)) {
          // console.log(element);
          // console.log('X = ', (camPosition.x - elementPosition.x))
          // console.log('Z = ', (camPosition.z - elementPosition.z))
          // console.log('Y = ', (camPosition.y - element.ellipsoid.y))
          // camPosition.y += 0.5;
          // camPosition.z += 1;
        }
      if((element.id).indexOf('sign') !== -1) {
        let signName = element.id;
        let vector = '';
        const dX = Math.abs(camPosition.x - elementPosition.x);
        const dZ = Math.abs(camPosition.y - elementPosition.y);
        const dY = Math.abs(camPosition.z - elementPosition.z);
        vector = (objPosition[signName] !== undefined && (objPosition[signName].dX > dX || objPosition[signName].dZ > dZ || objPosition[signName].dY > dY)) ? 'Priblizh' : 'Udal';
        objPosition[signName] = {'dX':dX,'dZ':dZ, 'dY':dY, 'vector':vector};
        if ((Math.abs(camPosition.x - elementPosition.x)<10) &&
          (Math.abs(camPosition.y - elementPosition.y)<10) && 
          (Math.abs(camPosition.z - elementPosition.z)<10) ){

            if(!signList.includes(element) && vector === 'Priblizh') {
              signList.push(element);
              // console.log(objPosition);
              messageArea.textContent = '';
              // console.log(element)
              textArea.value = element.descript;
              messageArea.textContent = element.id;
              const timerID = setTimeout(() => {
                messageArea.textContent = '';
              }, 2000);
              
            }
        } else if(vector === 'Udal') {
          signList.splice(signList.indexOf(element), 1);
        }
      }
      
    });
  }  
})
canvas.addEventListener('keyup', (event) => {
  if(scene.activeCamera.id == 'UniversalCamera') {
    if(event.key === 'Shift') {
      universaCamera.speed = 0.1;
    }
  }
});




// Listen for pointerlock and do something
if ("onpointerlockchange" in document) {
  document.addEventListener("pointerlockchange", lockRelease);
} 
else if ("onmozpointerlockchange" in document) {
  document.addEventListener("mozpointerlockchange", lockRelease);
}






document.querySelectorAll('#user-interface .type-btn-group button').forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.classList[1]);
    if(button.classList[1] === 'btn-outline-dark') {
      button.classList.remove('btn-outline-dark');
      button.classList.add('btn-dark');
    } else if(button.classList[1] === 'btn-dark') {
      button.classList.remove('btn-dark');
      button.classList.add = 'btn-outline-dark';
    }
    if(button.id === 'move-btn') {
      scene.activeCamera = universaCamera;
      universaCamera._position = new BABYLON.Vector3(10, 2, -20);
      universaCamera.setTarget(new BABYLON.Vector3(10, 1, 2));
      universaCamera.speed = 0.1;
      universaCamera.applyGravity = true;
      canvas.addEventListener("pointerup", lockEnable);
      console.log(universaCamera)
      hendsCreate('create');
    } else if(button.id === 'eye-btn') {
      scene.activeCamera = rotateCamera;
      rotateCamera.setPosition(new BABYLON.Vector3(0, 15, 45));
      rotateCamera.speed = 0.08;
      canvas.addEventListener("pointerup", lockRelease);
      hendsCreate('delete');
    }
  })
  
});

