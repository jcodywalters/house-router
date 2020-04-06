import { GoogleMapsClient } from '../services/GoogleMaps'

const {
  DESTINATION_LIMIT = 10,
} = process.env;

const googleClient = new GoogleMapsClient();


module.exports = async function upload(req, res) {
  const { body } = req;
  const origin = body.origin;
  const destinations = body.destinations;
  
  //todo: validate payload

  if (!(destinations.length <= DESTINATION_LIMIT)) {
    res.status(400).send({ error: 'Destination list beyond limit'});
  }
  try {
    const optimizedList = [];
    let currentOrigin = origin;
    optimizedList.push(currentOrigin);

    while (destinations.length >= 1) {
      const nextDestination = await googleClient.getClosestAddress(currentOrigin, destinations);
      optimizedList.push(nextDestination);
      destinations.splice(destinations.indexOf(nextDestination), 1)
      currentOrigin = nextDestination;
    }

    res.status(200).send(optimizedList);
  } catch (error) {
    res.status(500).send(error);
  }
};
