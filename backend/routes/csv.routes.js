const CSVDao = require('../dao/csv.dao');

const getDelimiter = (value) => {
  if (value === 'comma') {
    return ','
  } else if (value === 'dot') {
    return '.';
  } else if (value === 'whitespace') {
    return '\n';
  } else if (value === 'carriage') {
    return '\r';
  } else {
    return value;
  }
}

const csvRoutes = (app, routes) => {

  routes.route('/').get((req, res) => {
    CSVDao.getCSV()
      .then(csv => res.json(csv))
      .catch(error => res.status(404).json({
        message: 'no csv found',
        cause: error.message
      }))
  });

  routes.route('/').post((req, res) => {
    let files = Object.keys(req.files || {});
    let error  = {
      status: 400,
      message: 'invalid request',
    };
    if (files.length === 0) {
      error.cause = 'there is no file to load data';
      return res.status(400).send(error);
    } else {
      var file = req.files[files[0]];

      if (file.mimetype !== 'text/csv') {
        error.cause = 'invalid file type. Only CSV files are allowed';
        return res.status(400).send(error);
      }

      if (file.size === 0) {
        error.cause = 'sent file has no content';
        return res.status(400).send(error);
      }

      let rawData = file.data.toString('utf8');
      let delimiter = getDelimiter(req.query.delimiter);
      rawData = rawData.split(delimiter);

      let columns = rawData.splice(0, 1)[0].split(',');
      let rows = rawData.map(row => ({ data: row.trim().split(',') }));

      CSVDao.createCSV({ rows, columns })
        .then(csv => res.status(200).json({ csv }))
        .catch(error => res.status(500).json({
          message: 'error creating csv',
          cause: error.message
        }));
    }
  });

  routes.route('/').delete((req, res) => {
    CSVDao.deleteCSV()
      .then(csv => res.status(200))
      .catch(error => res.status(500).json({
        message: 'unexpected error occurred',
        cause: error.message
      }));
  });

  routes.route('/row').post((req, res) => {
    CSVDao.createRow(req.body)
      .then((row) => res.status(200).json({ row }))
      .catch(error => res.status(400).json({
        message: 'error adding csv row',
        cause: error.message
      }))
  });

  routes.route('/row/:id').get((req, res) => {
    let id = req.params.id;
    CSVDao.getRow(id)
      .then((row) => res.status(200).json({ row }))
      .catch(error => res.status(404).json({
        message: 'row not found',
        cause: error.message
      }))
  });

  routes.route('/row/:id').put((req, res) => {
    let id = req.params.id;
    CSVDao.updateRow(id, req.body)
      .then((row) => res.status(200).json({ row }))
      .catch(error => res.status(400).json({
        message: 'error updating row',
        cause: error.message
      }));
  });

  routes.route('/row/:id').delete((req, res) => {
    let id = req.params.id;
    CSVDao.deleteRow(id)
      .then(() => res.status(200).json({ message: 'row successfully removed' }))
      .catch(error => res.status(400).json({
        message: 'error deleting row',
        cause: error.message
      }));
  });

  app.use('/csv', routes);

};

module.exports = csvRoutes;
