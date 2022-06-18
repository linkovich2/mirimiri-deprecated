<template>
  <div id="container">
    <div class="debug-menu">Playing as: {{ game.character.name }} | Debug: <router-link to="/travel">Travel</router-link></div>
    <div class="settings-cog" @contextmenu="settingsContext($event)" @click="settingsContext($event)">&#9881;</div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { Viewport  } from 'pixi-viewport'
const { ipcRenderer } = require('electron')

export default {
  name: 'PlayScreen',
  inject: ['game'],
  data() {
    return {
      pixiApp: null,
      canvas: null
    }
  },
  beforeMount() {
    this.pixiApp = new PIXI.Application()

    const viewport = new Viewport({
        passiveWheel: false,
        worldWidth: 1000,
        worldHeight: 1000,

        interaction: this.pixiApp.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    this.pixiApp.renderer.backgroundColor = 0xFEFEFE
    this.pixiApp.stage.addChild(viewport)
    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()

    this.canvas = document.body.appendChild(this.pixiApp.view)

    const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))

    sprite.tint = 0xff0000
    sprite.width = sprite.height = 100
    sprite.position.set(100, 100)
  },
  unmounted() {
    this.pixiApp.stage.destroy(true)
    this.pixiApp.stage = null
    this.pixiApp = null
    this.canvas.remove()
  },
  methods: {
    close() {
      ipcRenderer.invoke('quit')
    },
    settingsContext(e) {
      e.preventDefault()
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: "Settings",
            onClick: () => {
              // open the options modal and close
            }
          },
          {
            label: "Exit to Main Menu",
            onClick: () => {
              this.$router.push('/menu')
            }
          },
          {
            label: "Exit to Desktop",
            onClick: () => {
              ipcRenderer.invoke('quit')
            }
          }
        ]
      });
    }
  }
}
</script>

<style scoped>
  .settings-cog {
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    margin: 20px;
    right: 0;
  }

  #container * {
    z-index: 2;
  }

  .debug-menu {
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
  }
</style>
