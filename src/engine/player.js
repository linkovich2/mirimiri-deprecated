import BackgroundManager from './player/background_manager.js'
import ClientSaveManager from './client_save_manager.js'

export default class Player {
  constructor() {
    this.character = {}
  }

  locationKey() {
    return this.character.location || this.setupStartingLocation()
  }

  setupStartingLocation() {
    let key = BackgroundManager.lookup(this.character.background).location
    this.character.location = key
    ClientSaveManager.save(this)

    return key
  }
}
