export default class Background {
  name      = "background name"
  location  = "location code"
  equipment = []

  availableFor() {
    // this method should check requirements to show this background for character selection
    return true
  }
}
