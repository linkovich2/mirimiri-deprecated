import EventEmitter from './event_emitter.js'
import Player from './player.js'
import LocationManager from './location_manager.js'
import ClientSaveManager from './client_save_manager.js'

export default class Game extends EventEmitter {
  constructor() {
    super()
    this.player = new Player()
  }

  location() {
    return LocationManager.lookup(this.player.locationKey())
  }

  save(data, callback) {
    ClientSaveManager.save(data, (save) => {
      this.load(save.id, callback)
    })
  }

  load(id, callback) {
    ClientSaveManager.load(id, (save) => {
      this.player.character = save.character
      callback(save)
    })
  }

  saves(callback) {
    ClientSaveManager.saves(callback)
  }
}
