import { Client } from "@googlemaps/google-maps-services-js";
import { sampleResponse } from '../tests/fixtures/googleMapsResponses';


class GoogleMapsClient {
  constructor() {
    this.client = new Client({});
    this.key = process.env.GOOGLE_MAPS_API_KEY;
    this.env = process.env.ENV;
  }

  /**
   * 
   * @param {String} origins
   * @param {Array} destinations
   * @returns {[]Objects} Array of elements from google-maps-service
   */
  async getDistances(origins, destinations) {
    if (this.env != 'production') { return sampleResponse.data.rows[0].elements}
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
}

module.exports = { GoogleMapsClient };
