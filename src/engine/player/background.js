export default class Background {
  name      = "background name"
  id        = "background unique identifier"
  location  = "location code"
  equipment = []

  availableFor() {
    // this method should check requirements to show this background for character selection
    return true
  }
}
