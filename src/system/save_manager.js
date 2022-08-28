const { app, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

const userDataPath  = app.getPath('userData')
const savesDataPath = path.join(userDataPath, 'saves/')
const characterFile = 'char.json'

exports.SaveManager = class {
  constructor() {
    // create saves data path if it doesn't exist
    if (!fs.existsSync(savesDataPath)) {
      fs.mkdirSync(savesDataPath)
    }
  }

  getSaveDirectories() {
    return fs.readdirSync(savesDataPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  }

  getSaves() {
    let saves = []
    this.getSaveDirectories().forEach(folder => {
      // read the folder for some base data
      let folderPath = path.join(savesDataPath, folder)
      let characterPath = path.join(folderPath, characterFile)

      let data = fs.readFileSync(characterPath)
      let character = JSON.parse(data)
      saves.push({
        character: character.name,
        id: folder
      })
    })

    return saves
  }

  save(data) {
    // this needs to be much more complex in the future, saving multiple files and splitting up the data options appropriately
    // alternatively, this can be changed to "initialSave" and later we can respect specific types of changes through specific files
    console.log(data)
    let uniqueSlug = (Math.random() + 1).toString(36).substring(7)
    let folderName = `${data.character.name.toLowerCase().replace(/\s+/g, '')}-${uniqueSlug}`
    let folderPath = path.join(savesDataPath, folderName)
    data['id'] = folderName
    fs.mkdirSync(folderPath)
    fs.writeFileSync(path.join(folderPath, characterFile), JSON.stringify(data.character))

    return data
  }

  load(id) {
    let folderPath    = path.join(savesDataPath, id)
    let characterPath = path.join(folderPath, characterFile)
    let character = JSON.parse(fs.readFileSync(characterPath))

    return {
      character: character
    }
  }

  registerHandlers() {
    ipcMain.handle('get-saves', async (event, data) => {
      return this.getSaves()
    })

    ipcMain.handle('save', async (event, data) => {
      return this.save(data)
    })

    ipcMain.handle('load', async (event, data) => {
      return this.load(data)
    })
  }
}
