const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CSVRow = new Schema({
  data: [String]
});

module.exports = {
  model: mongoose.model('csvRow', CSVRow),
  schema: CSVRow
}
