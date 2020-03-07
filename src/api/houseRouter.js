import { GoogleMapsClient } from './services/GoogleMaps'

class HouseRouter {
  constructor() {
    this.client = new GoogleMapsClient();
  }

  /**
   * Creates an optimized list from an origin and destinations 
   * @param {String} origin
   * @param {Array} destinations 
   * @returns {Array} - List of addresses in order of shortest distance from the previous origin
   */
  async createOptimizedList(origin, destinations) {
    const optimizedList = [];
    let currentOrigin = origin;
    optimizedList.push(currentOrigin);
    while (destinations.length >= 1) {
      const nextDestination = await this.client.getClosestAddress(currentOrigin, destinations);
      optimizedList.push(nextDestination);
      destinations.splice(destinations.indexOf(nextDestination), 1)
      currentOrigin = nextDestination;
    }
    return optimizedList;
  }
}

module.exports = { HouseRouter };