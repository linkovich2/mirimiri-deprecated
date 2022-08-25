import EventEmitter from './event_emitter.js'
import Player from './player.js'
const { ipcRenderer } = require('electron')

export default class Game extends EventEmitter {
  constructor() {
    super()
    this.player = new Player()
  }

  save(data, callback) {
    ipcRenderer.invoke('save', data).then((save) => {
      this.load(save.id, callback)
    })
  }

  load(id, callback) {
    ipcRenderer.invoke('load', id).then((save) => {
      // @todo this is expanded later to also apply other game information from the save file
      this.player.character = save.character
      callback()
    })
  }

  saves(callback) {
    ipcRenderer.invoke('get-saves').then((saves) => {
      callback(saves)
    })
  }
}
