import { Client } from "@googlemaps/google-maps-services-js";
import { sampleResponse } from '../tests/fixtures/googleMapsResponses';


class GoogleMapsClient {
  constructor() {
    this.client = new Client({});
    this.key = process.env.GOOGLE_MAPS_API_KEY;
  }


  async getDistances(origins, destinations) {
    const { data: distances } = sampleResponse;
    return distances.rows[0].elements;
    // const params = {
    //   origins,
    //   destinations,
    //   key: this.key,
    // };
    // return await this.client.distancematrix({ params });
  }
}

module.exports = { GoogleMapsClient };
