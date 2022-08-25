import Background from '../background.js'

export default class SellswordBase extends Background {
  // @todo this is mostly a stub for future base stuff, all sellswords probably share similar equipment
  baseRequirements(character) {
    // this should have some requirements
    console.log(character)
    return true
  }
}
