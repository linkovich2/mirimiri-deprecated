<template>
  <div id="container">
    <div class="debug-menu">Playing as: {{ game.character.name }} | Debug: <router-link to="/travel">Travel</router-link></div>
    <div class="settings-cog" @contextmenu="settingsContext($event)" @click="settingsContext($event)">&#9881;</div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { Viewport, MouseEdges } from 'pixi-viewport'
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
    // this is applying a PR that hasn't been merged yet to fix edge scrolling, found here: https://github.com/davidfig/pixi-viewport/pull/373/
    MouseEdges.prototype.resize = function() {
      const distance = this.options.distance;
        if (distance !== null) {
          this.left = distance;
          this.top = distance;
          this.right = this.parent.screenWidth - distance;
          this.bottom = this.parent.screenHeight - distance;
        } else if (!this.options.radius) {
          this.left = this.options.left;
          this.top = this.options.top;
          this.right = this.options.right === null ? null : this.parent.screenWidth - this.options.right;
          this.bottom = this.options.bottom === null ? null : this.parent.screenHeight - this.options.bottom;
        }
    }

    this.pixiApp = new PIXI.Application()

    const viewport = new Viewport({
      passiveWheel: false,
      worldWidth: 1000, // arbitrary for now
      worldHeight: 1000, // arbitrary for now

      interaction: this.pixiApp.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    this.pixiApp.renderer.backgroundColor = 0xFEFEFE
    this.pixiApp.stage.addChild(viewport)
    viewport
        .drag({
          mouseButtons: 'middle'
        })
        .pinch()
        .wheel()
        .decelerate()
        .mouseEdges({
          distance: 100,
          speed: 9
        })

    this.canvas = document.body.appendChild(this.pixiApp.view)

    const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))

    sprite.tint = 0xff0000
    sprite.width = sprite.height = 100
    sprite.position.set(100, 100)

    viewport.fit()
    viewport.moveCenter(500, 500)

    this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
    viewport.resize(window.innerWidth, window.innerHeight)

    window.onresize = () => {
      this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
      viewport.resize(window.innerWidth, window.innerHeight)
    }
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
        zIndex: 2,
        items: [
          {
            label: "Settings",
            onClick: () => {
              // open the options modal
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
