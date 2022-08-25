import locations from './locations'

export default class LocationManager {
  static lookUp(id) {
    return locations.list[id]
  }
}
