import { openExternalUrl } from "~system/RestrictedActions"
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from "@dcl/sdk/math"
import { NpcUtilsUi } from 'dcl-npc-toolkit'

const projectPath = "enemy-spawner"
const description = "Spawning enemy spaceships from various shaped portals."



function SceneOwnedUi() {
  return [
    // other UI elements
    NpcUtilsUi(),
    GitHubLinkUi(),
    // other UI elements
  ]
}




export function setupUi() {
  ReactEcsRenderer.setUiRenderer(SceneOwnedUi)
}

function GitHubLinkUi() {
  const fullPath = "https://www.standwithcrypto.org/"

  return (
    <UiEntity
      uiTransform={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        positionType: 'absolute',
        position: { right: "3%", bottom: '3%' }
      }}
    >
      <UiEntity
        uiTransform={{
          width: 132,
          height: 132,
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: "images/gh.png"
          }
        }}
        onMouseDown={() => {
          console.log("OPENING LINK")
          openExternalUrl({ url: fullPath })
        }}
      />
      <Label
        value="Follow for more"
        color={Color4.Black()}
        fontSize={15}
        textAlign="middle-center"
      />
    </UiEntity>
  )
}