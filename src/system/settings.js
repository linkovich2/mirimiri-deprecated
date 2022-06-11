const { app }            = require('electron'),
      fs                 = require('fs'),
      path               = require('path')

const settingsPath       = app.getPath('userData')
const settingsFileName   = 'settings.json'
const settingsFilePath   = path.join(settingsPath, settingsFileName)

const defaultWidth       = 1280
const defaultHeight      = 768
const defaultFullScreen  = false

exports.Settings = class {
  constructor() {
    this.width      = defaultWidth
    this.height     = defaultHeight
    this.fullscreen = defaultFullScreen

    this.load()
  }

  load() {
    try {
      let data = JSON.parse(fs.readFileSync(settingsFilePath))
      this.height      = data.height
      this.width       = data.width
      this.position    = data.position
      this.fullscreen  = !!data.fullscreen
      this.maximized   = !!data.maximized
      this.skip_splash = !!data.skip_splash
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.info('Settings file not found; creating one.')
        this.save()
      } else {
        console.log(err)
      }
    }
  }

  save() {
    fs.writeFile(settingsFilePath, JSON.stringify(this), err => {
      if (err) {
        console.error(err)
      }
    })
  }
}
