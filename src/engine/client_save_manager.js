const { ipcRenderer } = require('electron')

export default class ClientSaveManager {
  static save(data, callback) {
    ipcRenderer.invoke('save', data).then((save) => {
      if (callback)
        callback(save)
    })
  }

  // @todo we need some kind of save-to-specific ipc hook, to overwrite a specific save

  static load(id, callback) {
    ipcRenderer.invoke('load', id).then((save) => {
      // @todo this is expanded later to also apply other game information from the save file
      callback(save)
    })
  }

  static saves(callback) {
    ipcRenderer.invoke('get-saves').then((saves) => {
      callback(saves)
    })
  }
}
