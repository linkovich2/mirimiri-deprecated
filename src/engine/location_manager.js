import locations from './locations'

export default class LocationManager {
  static lookup(id) {
    return locations.list[id]
  }
}
