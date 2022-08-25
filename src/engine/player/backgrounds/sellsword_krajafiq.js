import SellswordBase from './sellsword_base.js'

export default class SellswordKraJafiq extends SellswordBase {
  name      = "Sellsword - Kra Jafiq"
  id        = "sellsword_krajafiq"
  location  = "kra_jafiq_well"
  equipment = [] // @todo

  availableFor(character) {
    if (this.baseRequirements(character)) {
      // go through our requirements, then...
      return true
    }
  }
}
