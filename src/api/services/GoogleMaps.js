import { Client } from "@googlemaps/google-maps-services-js";
import { sampleResponse } from '../tests/fixtures/googleMapsResponses';


class GoogleMapsClient {
  constructor() {
    this.client = new Client({});
    this.key = process.env.GOOGLE_MAPS_API_KEY;
    this.env = process.env.ENV;
    this.enableGoogleapi = process.env.ENABLE_GOOGLE_API;
  }

  /**
   * 
   * @param {String} origins
   * @param {Array} destinations
   * @returns {[]Objects} Array of elements from google-maps-service
   */
  async getDistances(origins, destinations) {
    if (this.enableGoogleapi === 'false') { return sampleResponse.data.rows[0].elements } // force to use sampleResponse to save on api cost
    const params = {
      origins: [origins],
      destinations,
      key: this.key,
    };
    try {
      const { data: distances } = await this.client.distancematrix({ params });
      return distances.rows[0].elements;
    } catch (error) {
      console.log(error)
      throw new Error(`Issue calling google-maps-service - ${error}`)
    }
  }

  /**
   * Creates optimized list of houses in shortest distance order
   * @param {String} origin - ex: 'address1'
   * @param {Array} destinations - ex: ['address2', 'address3']
   * @returns {String} single address that is shortest distance from origin
   */
  async getClosestAddress(origin, destinations) {
    const elements = await this.getDistances(origin, destinations);
    let shortestDistance = Number.MAX_VALUE;
    let shortestDistanceIndex;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const distance = element.distance.value;
      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestDistanceIndex = i;
      }
    }
    return destinations[shortestDistanceIndex];
  }

}

module.exports = { GoogleMapsClient };
