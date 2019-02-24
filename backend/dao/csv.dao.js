const CSV = require('../model/csv.model').model;
const CSVRow = require('../model/csv.row.model').model;

class CSVDao {

  createCSV(data) {
    return new Promise((resolve, reject) => {
      this.deleteCSV()
          .then(() => {
            let csv = new CSV(data);
            csv.save()
              .then(csv => resolve(csv))
              .catch(error => reject(error));
          })
          .catch(error => reject(error));
    });
  }

  deleteCSV() {
    return CSV.deleteOne();
  }

  getCSV() {
    return CSV.findOne();
  }

  createRow(data) {
    return new Promise((resolve, reject) => {
      this.getCSV()
        .then(csv => {
          let row = new CSVRow(data);
          csv.rows.push(row);
          csv.save()
            .then(() => resolve(row))
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    });
  }

  updateRow(id, rowData) {
    return new Promise((resolve, reject) => {
      this.getRow(id)
        .then(res => {
          res.row.data = rowData;
          res.csv.save()
            .then(() => resolve(res.row))
            .catch(error => reject(error))
        })
        .catch(error => reject(error));
    });
  }

  getRow(id) {
    return new Promise((resolve, reject) => {
      this.getCSV()
        .then(csv => {
          let row = csv.rows.id(id);
          if (row !== null) {
            resolve({row, csv});
          } else {
            reject(new Error('row not found'));
          }
        })
        .catch(error => reject(error))
    });
  }

  deleteRow(id)  {
    return new Promise((resolve, reject) => {
      this.getRow(id)
        .then(res => {
          res.row.remove();
          res.csv.save()
            .then(() => resolve(id))
            .catch(error => reject(error))
        })
        .catch(error => reject(error));
    });
  }

}

// singleton
module.exports = new CSVDao();
