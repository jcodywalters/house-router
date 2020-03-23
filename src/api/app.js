import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

import upload from './endpoints/upload/post';
import post from './endpoints/post';
import details from './endpoints/destinations/get';

const {
  ENV,
} = process.env;

const app = express();

// Configure the router
const router = express.Router();
router.use(awsServerlessExpressMiddleware.eventContext());
router.use(bodyParser.json());
router.use(cors());
router.use(fileUpload());
router.use(morgan('combined'));

// Assign routes
router.post('/', post);
router.post('/upload', upload);
router.get('/destinations', details);


// BasePath + StageName when for local dev/unit testing
const basePath = (ENV === undefined || ENV === 'production') ?
  'house-router' : `house-router-${ENV}`;
const basePathWithStageName = `/${basePath}/v1`;

app.use(basePathWithStageName, router);
module.exports = { app, basePathWithStageName };
