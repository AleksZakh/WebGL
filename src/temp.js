





// delayCreateScene();








let roadSeparation = (xPos, zPos, rotateAngle) => {
  BABYLON.SceneLoader.ImportMesh(null, "./models/road_separation_fence/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
    // console.log(meshes);
    let separation = meshes[0];
    separation.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7);
    separation.position = new BABYLON.Vector3(xPos, 0, 15-(4*zPos));
    shadowGenerator.addShadowCaster(separation);
    separation.receiveShadows = true;
    separation.checkCollisions = true;
    separation.physicsImpostor = new BABYLON.PhysicsImpostor(separation, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    separation.rotate(BABYLON.Axis.Y, rotateAngle, BABYLON.Space.WORLD);
    // sceneObjectList.push(town); panelHause
  })
};

let newJersi = (zPos) => {
  BABYLON.SceneLoader.ImportMesh(null, "./models/NewJarsi/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
    // console.log(meshes);
    let NewJarsi = meshes[0];
    NewJarsi.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
    NewJarsi.position = new BABYLON.Vector3(-6.9, -0.62, 5-(1.7*zPos));
    shadowGenerator.addShadowCaster(NewJarsi);
    NewJarsi.receiveShadows = true;
    NewJarsi.checkCollisions = true;
    NewJarsi.physicsImpostor = new BABYLON.PhysicsImpostor(NewJarsi, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    NewJarsi.rotate(BABYLON.Axis.Y, 0.96, BABYLON.Space.WORLD);
    // sceneObjectList.push(town); panelHause
  })
}



for (let i = -10; i < 16; i++) {
  roadSeparation(-7.2, i, 3*Math.PI/2);
  roadSeparation(9.2, i, Math.PI/2);
}

for (let i = -30; i < -14; i++) {
  newJersi(i);
  
}

for (let i = -10; i < 31; i++) {
  newJersi(i);
}

// const roadGroundLeft = BABYLON.MeshBuilder.CreateGround("roadGround", {width:8.1, height:10}, scene);
      // roadGroundLeft.position = new BABYLON.Vector3(-3, 0.01, 30-(10*zPoz));
      // roadGroundLeft.material = new BABYLON.StandardMaterial("roadGround", scene);
      // roadGroundLeft.material.emissiveTexture = new BABYLON.Texture('./img/Textura_doroga.png', scene);
      // roadGroundLeft.receiveShadows = true;
      // roadGroundLeft.physicsImpostor = new BABYLON.PhysicsImpostor(roadGroundLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    
      // const roadGroundRight = BABYLON.MeshBuilder.CreateGround("roadGround", {width:8.1, height:10}, scene);
      // roadGroundRight.position = new BABYLON.Vector3(5, 0.01, 30-(10*zPoz));
      // roadGroundRight.material = new BABYLON.StandardMaterial("roadGround", scene);
      // roadGroundRight.material.emissiveTexture = new BABYLON.Texture('./img/Textura_doroga.png', scene);
      // roadGroundRight.receiveShadows = true;
      // roadGroundRight.physicsImpostor = new BABYLON.PhysicsImpostor(roadGroundRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);





//  function delayCreateScene () {
//   // Create a scene.
//   var scene = new BABYLON.Scene(engine);

//   // Create a default skybox with an environment.
//   var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
//   var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

//   // Append glTF model to scene.
//   BABYLON.SceneLoader.Append("./models/", "8848_ISSO_VISUAL.stl", scene, function (scene) {
//       // Create a default arc rotate camera and light.
//       scene.createDefaultCameraOrLight(true, true, true);

//       // The default camera looks at the back of the asset.
//       // Rotate the camera by 180 degrees to the front of the asset.
//       scene.activeCamera.alpha += Math.PI;
//   });

//   return scene;
// };

// ==========================================


// bridgeSupportCreate(15.5, 7, 19.5);



// BABYLON.SceneLoader.Append("./models/freeCityRoad/", "STREET_SCENE.gltf", scene, function (scene) {
//   let town = meshes[0];
//   town.scaling = new BABYLON.Vector3(2, 2, 2);
//   town.position = new BABYLON.Vector3(16, 0.2, 230);
//   shadowGenerator.addShadowCaster(town);
//   town.receiveShadows = true;
//   town.checkCollisions = true;
//   town.material = new BABYLON.StandardMaterial('material', scene);
//   town.applyGravity = true;
//   town.applyFog = true;
//   town.physicsImpostor = new BABYLON.PhysicsImpostor(town, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
// });

// BABYLON.SceneLoader.ImportMesh(null, "./models/freeCityRoad/", "STREET_SCENE.gltf", scene, function (meshes, particleSystems, skeletons) {
//   // console.log(meshes);
//   let town = meshes[0];
//   town.scaling = new BABYLON.Vector3(2, 2, 2);
//   town.position = new BABYLON.Vector3(-4150, 120, -3650);
//   shadowGenerator.addShadowCaster(town);
//   town.receiveShadows = true;
//   town.checkCollisions = true;
//   town.material = new BABYLON.StandardMaterial('material', scene);
//   town.applyGravity = true;
//   town.applyFog = true;
//   town.physicsImpostor = new BABYLON.PhysicsImpostor(town, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town);
// })


// BABYLON.SceneLoader.ImportMesh(null, "./models/afterTheRain/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
//   // console.log(meshes);
//   let town = meshes[0];
//   town.scaling = new BABYLON.Vector3(2, 2, 2);
//   town.position = new BABYLON.Vector3(16, 0.2, 230);
//   shadowGenerator.addShadowCaster(town);
//   town.receiveShadows = true;
//   town.checkCollisions = true;
//   town.material = new BABYLON.StandardMaterial('material', scene);
//   town.applyGravity = true;
//   town.applyFog = true;
//   town.physicsImpostor = new BABYLON.PhysicsImpostor(town, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town);
// })

BABYLON.SceneLoader.ImportMesh(null, "./models/roadSings/Kirpich/", "untitled.gltf", scene, function (meshes, particleSystems, skeletons) {
  // console.log(meshes);
  let kirpich = meshes[0];
  kirpich.id = 'kirpich_sign';
  kirpich.name ='kirpich_sign';
  kirpich.descript = 'Проезд запрешен';
  kirpich.scaling = new BABYLON.Vector3(2, 2, 2);
  kirpich.position = new BABYLON.Vector3(14, 0, 75);
  shadowGenerator.addShadowCaster(kirpich);
  kirpich.receiveShadows = true;
  kirpich.checkCollisions = true;
  kirpich.physicsImpostor = new BABYLON.PhysicsImpostor(kirpich, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  sceneObjectList.push(kirpich);
})

BABYLON.SceneLoader.ImportMesh(null, "./models/roadSings/reversTraffic/", "reverce.gltf", scene, function (meshes, particleSystems, skeletons) {
  // console.log(meshes);
  let reverce = meshes[0];
  reverce.id = 'reverce_sign';
  reverce.name ='reverce_sign';
  reverce.descript = 'Реверсивное движение';
  reverce.scaling = new BABYLON.Vector3(2, 2, 2);
  reverce.position = new BABYLON.Vector3(5, 0, 20);
  shadowGenerator.addShadowCaster(reverce);
  reverce.receiveShadows = true;
  reverce.checkCollisions = true;
  reverce.physicsImpostor = new BABYLON.PhysicsImpostor(reverce, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  sceneObjectList.push(reverce);
})

BABYLON.SceneLoader.ImportMesh(null, "./models/roadSings/speed70/", "speed70.gltf", scene, function (meshes, particleSystems, skeletons) {
  // console.log(meshes);
  let speed70 = meshes[0];
  speed70.id = 'speed70_sign';
  speed70.name ='speed70_sign';
  speed70.descript = 'Ограничение скорости 70 км/ч';
  speed70.scaling = new BABYLON.Vector3(2, 2, 2);
  speed70.position = new BABYLON.Vector3(5, 0, 0);
  shadowGenerator.addShadowCaster(speed70);
  speed70.receiveShadows = true;
  speed70.checkCollisions = true;
  speed70.physicsImpostor = new BABYLON.PhysicsImpostor(speed70, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  sceneObjectList.push(speed70);
})

// BABYLON.SceneLoader.ImportMesh(null, "./models/angel/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
//   // console.log(meshes);
//   let angel = meshes[0];
//   angel.scaling = new BABYLON.Vector3(4, 4, 4);
//   angel.position = new BABYLON.Vector3(-18, 0, 75);
//   shadowGenerator.addShadowCaster(angel);
//   angel.receiveShadows = true;
//   angel.checkCollisions = true;
//   angel.physicsImpostor = new BABYLON.PhysicsImpostor(angel, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town); panelHause
// })

// BABYLON.SceneLoader.ImportMesh(null, "./models/westTown/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
//   // console.log(meshes);
//   let westTown = meshes[0];
//   westTown.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
//   westTown.position = new BABYLON.Vector3(2, 0.1 ,-170);
//   shadowGenerator.addShadowCaster(westTown);
//   westTown.material = new BABYLON.StandardMaterial('material', scene);
//   westTown.applyGravity = true;
//   westTown.receiveShadows = true;
//   westTown.checkCollisions = true;
//   westTown.physicsImpostor = new BABYLON.PhysicsImpostor(westTown, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town); panelHause
// })

// BABYLON.SceneLoader.ImportMesh(null, "./models/spartan/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
//   console.log(meshes);
//   let spartan = meshes[0];
//   spartan.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
//   spartan.position = new BABYLON.Vector3(-5, 0, 60);
//   shadowGenerator.addShadowCaster(spartan);
//   spartan.receiveShadows = true;
//   spartan.checkCollisions = true;
//   spartan.applyGravity = true;
//   spartan.physicsImpostor = new BABYLON.PhysicsImpostor(spartan, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town); panelHause
// })

// BABYLON.SceneLoader.ImportMesh(null, "./models/swatOperator/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
//   console.log(meshes);
//   let swatOperator = meshes[0];
//   swatOperator.scaling = new BABYLON.Vector3(2, 2, 2);
//   swatOperator.position = new BABYLON.Vector3(10, 4.7, 20);
//   shadowGenerator.getShadowMap().renderList.push(swatOperator);
//   // shadowGenerator.addShadowCaster(swatOperator);
//   swatOperator.receiveShadows = true;
//   swatOperator.checkCollisions = true;
//   swatOperator.applyGravity = true;
//   swatOperator.physicsImpostor = new BABYLON.PhysicsImpostor(swatOperator, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town); panelHause
// })

// BABYLON.SceneLoader.ImportMesh(null, "./models/oldCar/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
//   // console.log(meshes);
//   let oldCar = meshes[0];
//   oldCar.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
//   oldCar.position = new BABYLON.Vector3(25, 0.5, 20);
//   shadowGenerator.addShadowCaster(oldCar);
//   oldCar.receiveShadows = true;
//   oldCar.checkCollisions = true;
//   oldCar.physicsImpostor = new BABYLON.PhysicsImpostor(oldCar, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town); panelHause
// })

// BABYLON.SceneLoader.Append("./models/", "8848_ISSO_VISUAL.stl", scene, function (scene) {
//   // do something with the scene
//   let newBridge = meshes[0];
//   newBridge.scaling = new BABYLON.Vector3(2, 2, 2);
//   newBridge.position = new BABYLON.Vector3(-25, 0, 95);
// });

// BABYLON.SceneLoader.ImportMesh(
//   null,
//   "./models/bridge1/",
//   "testBridge.glb",
//   scene,
//   function (meshes, particleSystems, skeletons) {
//     console.log(meshes);
//     let newBridge = meshes[0];
//     newBridge.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
//     newBridge.position = new BABYLON.Vector3(-20, -200, 0);
//     newBridge.material = new BABYLON.StandardMaterial('material', scene);
//     newBridge.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
//     shadowGenerator.addShadowCaster(newBridge);
//     newBridge.receiveShadows = true;
//     newBridge.checkCollisions = true;
//     // rusSold.physicsImpostor = new BABYLON.PhysicsImpostor(rusSold, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);
//   }
// )

BABYLON.SceneLoader.ImportMesh(
  null,
  "./models/Frezer/",
  "scene.gltf",
  scene,
  function (meshes, particleSystems, skeletons) {
    // console.log(meshes);
    let frezer = meshes[0];
    frezer.scaling = new BABYLON.Vector3(2, 2, 2);
    frezer.position = new BABYLON.Vector3(5, 0, 80);
    // roller.material = new BABYLON.StandardMaterial('material', scene);
    // roller.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    shadowGenerator.addShadowCaster(frezer);
    frezer.receiveShadows = true;
    frezer.checkCollisions = true;
    // rusSold.physicsImpostor = new BABYLON.PhysicsImpostor(rusSold, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);
  }
)

// BABYLON.SceneLoader.ImportMesh(
//   null,
//   "./models/jcb_Exkovator/",
//   "scene.gltf",
//   scene,
//   function (meshes, particleSystems, skeletons) {
//     // console.log(meshes);
//     let exkovator = meshes[0];
//     exkovator.scaling = new BABYLON.Vector3(4, 4, 4);
//     exkovator.position = new BABYLON.Vector3(5, 0, 80);
//     // roller.material = new BABYLON.StandardMaterial('material', scene);
//     // roller.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
//     shadowGenerator.addShadowCaster(exkovator);
//     exkovator.receiveShadows = true;
//     exkovator.checkCollisions = true;
//     // rusSold.physicsImpostor = new BABYLON.PhysicsImpostor(rusSold, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);
//   }
// )

BABYLON.SceneLoader.ImportMesh(
  null,
  "./models/roller_king/",
  "scene.gltf",
  scene,
  function (meshes, particleSystems, skeletons) {
    console.log(meshes);
    let roller = meshes[0];
    roller.scaling = new BABYLON.Vector3(2, 2, 2);
    roller.position = new BABYLON.Vector3(-10, 2, 80);
    // roller.material = new BABYLON.StandardMaterial('material', scene);
    // roller.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    shadowGenerator.addShadowCaster(roller);
    roller.receiveShadows = true;
    roller.checkCollisions = true;
    // rusSold.physicsImpostor = new BABYLON.PhysicsImpostor(rusSold, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);
  }
)

BABYLON.SceneLoader.ImportMesh(null, "./models/jcb_Exkovator/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
  // console.log(meshes);
  let Exkovator = meshes[0];
  Exkovator.scaling = new BABYLON.Vector3(110, 110, 110);
  Exkovator.position = new BABYLON.Vector3(25, 3.3, 20);
  shadowGenerator.addShadowCaster(Exkovator);
  Exkovator.receiveShadows = true;
  Exkovator.checkCollisions = true;
  // Exkovator.physicsImpostor = new BABYLON.PhysicsImpostor(Exkovator, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  // sceneObjectList.push(town); panelHause
})

// BABYLON.SceneLoader.ImportMesh(
//   null,
//   "./models/bridge2/",
//   "bridge.glb",
//   scene,
//   function (meshes, particleSystems, skeletons) {
//     console.log(meshes);
//     let bridgeOnly = meshes[0];
//     bridgeOnly.scaling = new BABYLON.Vector3(1, 1, 1);
//     bridgeOnly.position = new BABYLON.Vector3(100, -700, 0);
//     bridgeOnly.material = new BABYLON.StandardMaterial('material', scene);
//     bridgeOnly.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
//     shadowGenerator.addShadowCaster(bridgeOnly);
//     bridgeOnly.receiveShadows = true;
//     bridgeOnly.checkCollisions = true;
//     // rusSold.physicsImpostor = new BABYLON.PhysicsImpostor(rusSold, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);
//   }
// )

// BABYLON.SceneLoader.ImportMesh(null, "./models/rusSold/", "scene.gltf", scene, function (meshes, particleSystems, skeletons) {
//   // console.log(meshes);
//   let rusSold = meshes[0];
//   rusSold.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
//   rusSold.position = new BABYLON.Vector3(-9, 0, 95);
//   shadowGenerator.addShadowCaster(rusSold);
//   rusSold.receiveShadows = true;
//   rusSold.checkCollisions = true;
//   // rusSold.physicsImpostor = new BABYLON.PhysicsImpostor(rusSold, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);
//   // sceneObjectList.push(town); panelHause
// })




// console.log(roadGround)

// Инициализация тени



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


// 



// function moveBtnActive(params) {
  
// }


// Изменение размера окна
// window.addEventListener('resize', () => {
//   engine.resize();
// });

// window.addEventListener('click', (event) => {
//   console.log(event.clientX, event.clientY);
// })

// const mouseDownEvent = document.createEvent('MouseEvents');
// mouseDownEvent.initEvent('mousedown', true, false);
// canvas.dispatchEvent(mouseDownEvent);

// canvas.addEventListener('mouseover', (event) => {
//   console.log(event.clientX, event.clientY);
//   canvas.click();
// })


// window.addEventListener('keydown', (event)=>{
  
//   if(event.key === 'a') {
//     console.log(camera.position)
//       camera.position._x += 0.5;
//   }
//   if(event.key === 'd') {
//       camera.position._x -= 0.5;
//   }
//   // if(event.key === 'ArrowUp') {
//   //     camera.position._y += 0.1;
//   //     camera.position._z -= 0.3;
//   // }
//   // if(event.key === 'ArrowDown') {
//   //     camera.position._y -= 0.1;
//   //     camera.position._z += 0.3;
//   // }
//   // if(event.key === 'w') {
//   //     camera.rotation.x += 0.1;
//   // }
//   // if(event.key === 's') {
//   //     camera.rotation.x -= 0.1;
//   // }
//   // if(event.key === 'a') {
//   //     camera.rotation.y += 0.1;
//   // }
//   // if(event.key === 'd') {
//   //     camera.rotation.y -= 0.1;
//   // }
// })

