import * as PIXI from 'pixi.js'
import { Viewport, MouseEdges } from 'pixi-viewport'

export default class Renderer {
  constructor() {
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
  }

  create(location) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    this.pixiApp = new PIXI.Application()

    this.viewport = new Viewport({
      passiveWheel: false,
      worldWidth: location.worldWidth,
      worldHeight: location.worldHeight,
      interaction: this.pixiApp.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    this.pixiApp.renderer.backgroundColor = 0xDDDDDD
    this.pixiApp.stage.addChild(this.viewport)
    this.setupViewport()

    this.canvas = document.body.appendChild(this.pixiApp.view)

    // const texture = PIXI.Texture.from(require('@/assets/temp_background.png'))
    // const sprite = new PIXI.Sprite(texture)
    // // sprite.tint = 0xff0000 // this is probably usable for weather tints
    // sprite.width = this.viewport.worldWidth
    // sprite.height = this.viewport.worldHeight
    // sprite.anchor.set(0, 0)

    // this.viewport.addChild(sprite)

    this.viewport.fit()
    this.viewport.moveCenter(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2)
    this.viewport.setZoom(3, true)

    this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
    this.viewport.resize(window.innerWidth, window.innerHeight)

    window.onresize = () => {
      // this needs to be some global thing in case we need to add to it
      this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
      this.viewport.resize(window.innerWidth, window.innerHeight)
    }
  }

  setupViewport() {
    this.viewport
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
        .clamp({
          direction: 'all'
        })
        .clampZoom({
          minScale: 2,
          maxScale: 6
        })
  }

  destroy() {
    this.pixiApp.renderer.destroy()
    this.canvas.remove()

    window.onresize = null;
  }
}
