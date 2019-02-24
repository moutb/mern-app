import Request from './request';

class CSVClient {

  static createCSV() {
    return new Request('/', 'post');
  }

  static getCSV() {
    return new Request('/', 'get');
  }

  static createRow() {
    return new Request(`/row`, 'post');
  }

  static updateRow(id) {
    return new Request(`/row/${id}`, 'put');
  }

  static deleteRow(id) {
    return new Request(`/row/${id}`, 'delete');
  }

}

export default CSVClient;
