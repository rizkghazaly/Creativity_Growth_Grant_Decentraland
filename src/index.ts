// We define the empty imports so the auto-complete feature works as expected.
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { engine, GltfContainer, InputAction, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform, VideoPlayer, VisibilityComponent } from '@dcl/sdk/ecs'


import * as npc from 'dcl-npc-toolkit'


import { setupUi } from './ui'
import { testscript } from './dialogs'
import { movePlayerTo, openExternalUrl } from '~system/RestrictedActions'

import { setupAtlasAnalytics } from "./atlas-analytics-service";


export function main() {


  setupAtlasAnalytics (
    "metarisk 7.01", // use a unique branchName to differentiate different deployments or instances
    5000, // pollingInterval, in milliseconds
    false, // activates/deactivates logging debug messages to the browser console
  )

  // --- ground ---
  const ground = engine.addEntity()
  Transform.create(ground, {
   position: Vector3.create(0, 0.01,-8),  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })
  GltfContainer.create(ground, {
    src: 'model/mar1.glb'
  
  })

  const ground1 = engine.addEntity()
  Transform.create(ground1, {
   position: Vector3.create(0, 0.01,-8),  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })
  GltfContainer.create(ground1, {
    src: 'model/mar2.glb'
  
  })

 
  const ground2 = engine.addEntity()
  Transform.create(ground2, {
   position: Vector3.create(0, 0.01,-8),  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })
  GltfContainer.create(ground2, {
    src: 'model/mar3.glb'
  
  })





        //  NPC S of  the map
  let marsha1 = npc.create(
    {
      position: Vector3.create(2.1, 0.46, -8),
      rotation: Quaternion.fromEulerDegrees(0, -180, 0),
      scale: Vector3.create(1.05, 1.05, 1.05)
    },
    {
      type: npc.NPCType.CUSTOM,
      model: {
        src: 'model/1.glb'
  
      },
      faceUser: true,
      portrait: { path: 'images/DX.png' },
      reactDistance:3,
      continueOnWalkAway:false, 
      onActivate: () => {
        npc.talk(marsha1, testscript)
      },
    
    }
  )
  
  // Create the first cylinder entity ( go up G to first floor)
  const cylinder1 = engine.addEntity();
  MeshRenderer.setCylinder(cylinder1); 
  MeshCollider.setCylinder(cylinder1); 

  VisibilityComponent.create(cylinder1, { visible: false }) 

  Transform.create(cylinder1, {
    position: Vector3.create(0, 1.8, -8)
  });

  

  // Add pointer event handlers for both cylinders (you can customize them as needed)
  pointerEventsSystem.onPointerDown(
    {
      entity: cylinder1,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Go Up', maxDistance: 6  },
    },
    function () {
      // Respawn player for the first cylinder
      movePlayerTo({
        newRelativePosition: Vector3.create(0, 45, -8.5),
        cameraTarget: Vector3.create(35, 15, -24.1),
      });
    }
  )


    // #1
    const screen = engine.addEntity();
    MeshRenderer.setPlane(screen);
    Transform.create(screen, {
      position: { x: 10.25, y: 42.83, z: -8.0},
      scale: Vector3.create(17.6, 11.4, 1),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    });
  
   


   // #2
   VideoPlayer.create(screen, {
    src: "https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875",
    playing: true,
    volume:1,
    loop: true
  });

  // #3
  const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen });

  // #4
Material.setPbrMaterial(screen, {
  texture: videoTexture,
  roughness: 1.0,
  specularIntensity: 0,
  metallic: 0,
});


  

  // draw UI. Here is the logic to spawn cubes.
  setupUi()
}




