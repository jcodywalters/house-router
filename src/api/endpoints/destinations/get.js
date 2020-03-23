import AWS from 'aws-sdk';

const {
  DESTINATION_HEADER,
  S3_BUCKET_NAME,
} = process.env;

const s3 = new AWS.S3();

module.exports = async function destinations({ query }, res) {
  const { id } = query;
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: id,
  }
  try {
    const { Body: body } = await s3.getObject(params).promise();
    if (!body) {
      return res.status(404).send('File not found');
    }

    const rows = body.toString().split('\n')
    const header = rows[0].split(',');
    const destinationIndex = header.indexOf(DESTINATION_HEADER);
    
    if (destinationIndex < 0) {
      return res.status(400).send(`Destination header not found. (${DESTINATION_HEADER})`);
    }

    let destinations = [];
    for (const row of rows.splice(1, rows.length - 1)) {
      const cells = row.split(',');
      const destination = cells[destinationIndex];
      if (destination) {
        destinations.push(destination.trim());
      }
    }

    return res.status(200).send(destinations);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
}