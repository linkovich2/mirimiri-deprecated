import backgrounds from './backgrounds'

export default class BackgroundManager {
  constructor() {
    this.backgrounds = {}
    backgrounds.list.forEach(backgroundClass => {
      let background = new backgroundClass()
      this.backgrounds[background.id] = background
    })
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
