const { app, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

exports.ContentFileManager = class {
  constructor() {
    this.devPath  = path.join(app.getAppPath(), '/../src/content/')
    this.basePath = path.join(app.getAppPath(), '/src/content/')
  }

  getPath(filePath, devMode = false) {
    return path.join(devMode ? this.devPath : this.basePath, filePath)
  }

  load(filePath, devMode = false) {
    return fs.readFileSync(this.getPath(filePath, devMode))
  }

  list(dirPath, devMode = false) {
    let content = fs.readdirSync(this.getPath(dirPath, devMode))
    return content.filter((elm) => {return elm.match(/.*\.(json?)/ig)})
  }

  save(filePath, content, devMode = false) {
    return fs.writeFileSync(this.getPath(filePath, devMode), content)
  }

  registerHandlers() {
    ipcMain.handle('dev-save-content-file', async (event, data) => {
      return this.save(data.filePath, data.content, true)
    })

    ipcMain.handle('dev-load-content-file', async (event, data) => {
      return this.load(data.filePath, true)
    })

    ipcMain.handle('dev-list-content-files', async (event, data) => {
      return this.list(data.dirPath, true)
    })

    ipcMain.handle('load-content-file', async (event, data) => {
      return this.load(data.filePath)
    })

    ipcMain.handle('list-content-files', async (event, data) => {
      return this.list(data.dirPath)
    })
  }
}
