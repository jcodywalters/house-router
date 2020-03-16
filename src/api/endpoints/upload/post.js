
module.exports = async function upload(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  try {
    await file.mv(`./tmp/${file.name}`);
    res.status(200).send({ id: '1234', text: 'receivedFile' })
  } catch (err) {
    res.status(500).send(err)
  }
};
