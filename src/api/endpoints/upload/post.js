import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

const s3 = new S3();

const {
  S3_BUCKET_NAME
} = process.env;

module.exports = async function upload(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const file = req.files.file;
  try {
    const params = {
      Body: file.data,
      Bucket: S3_BUCKET_NAME,
      Key: `${v4()}/${file.name}`,
      ServerSideEncryption: "AES256",
    };

    const s3Response = await s3.upload(params).promise();
    res.status(200).send({ id: s3Response.key, location: s3Response.Location })
  } catch (err) {
    res.status(500).send(err)
  }
};
