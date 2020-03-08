import { HouseRouter } from '../houseRouter';
const houseRouter = new HouseRouter();

const {
  DESTINATION_LIMIT = 10,
} = process.env;

module.exports = async function upload(req, res) {
  const { body } = req;
  const origin = body.origin;
  const destinations = body.destinations;
  
  //todo: validate payload

  if (!(destinations.length <= DESTINATION_LIMIT)) {
    res.status(400).send({ error: 'Destination list beyond limit'});
  }
  try {
    const result = await houseRouter.createOptimizedList(origin, destinations);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
