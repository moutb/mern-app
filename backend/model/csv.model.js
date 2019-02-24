const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CSVRow = require('./csv.row.model').schema;

let CSVModel = new Schema({
  columns: [ String ],
  rows: [ CSVRow ]
});

module.exports = {
  model: mongoose.model('csv', CSVModel),
  schema: CSVModel
}
