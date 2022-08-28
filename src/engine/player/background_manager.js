import backgrounds from './backgrounds'

export default class BackgroundManager {
  constructor() {
    this.backgrounds = {}
    Object.keys(backgrounds.list).forEach(key => {
      let background = new backgrounds.list[key]()
      this.backgrounds[key] = background
    })
  }

  static lookup(id) {
    return new backgrounds.list[id]()
  }

  filtered(character) {
    // filter all backgrounds based on character data
    let arr = []

    this.backgrounds.keys().forEach(key => {
      let background = this.backgrounds[key]
      if (background.availableFor(character)) {
        arr.push(background)
      }
    })
  }
}
