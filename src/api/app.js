import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { HouseRouter } from './houseRouter';

const houseRouter = new HouseRouter();
const app = express();
const router = express.Router();

router.use(awsServerlessExpressMiddleware.eventContext());
router.use(bodyParser.json());

const {
  ENV,
  DESTINATION_LIMIT = 10,
} = process.env;

router.post('/', async (req, res) => {
  const { body } = req;
  const origin = body.origin;
  const destinations = body.destinations;
  if (!(destinations.length <= DESTINATION_LIMIT)) {
    res.status(400).send({ error: 'Destination list beyond limit'});
  }
  try {
    const result = await houseRouter.createOptimizedList(origin, destinations);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


// BasePath + StageName when for local dev/unit testing
const basePath = (ENV === undefined || ENV === 'production') ?
  'house-router' : `house-router-${ENV}`;
const basePathWithStageName = `/${basePath}/v1`;

app.use(basePathWithStageName, router);
module.exports = { app, basePathWithStageName };
