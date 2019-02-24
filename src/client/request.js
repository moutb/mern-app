import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/csv',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
})

export default class Request {

  constructor(url, method) {
    this.url = url;
    this.method = method;
    this.axiosRequest = null;
    this._running = false;
  }

  exec(data = {}, urlParams = {}) {
    let url = this.url;
    let queryParams = this.method === 'get' ? data : urlParams;
    if (Object.keys(queryParams).length) {
      url += url.indexOf('?') === -1 ? '?' : '&';
      url += Object.keys(queryParams).map(k => `${k}=${queryParams[k]}`).join('&');
    }

    console.log('url', url, 'params', urlParams);
    return new Promise((resolve, reject) => {
      this._running = true;
      axiosInstance.request({
        method: this.method,
        url: url,
        data: data,
        cancelToken: source.token
      })
      .then((res) => {
        this._running = false;
        resolve(res);
      })
      .catch(function (thrown) {
        this._running = false;
        if (axios.isCancel(thrown)) {
          reject({
            cancelled: true,
            message: thrown.message
          });
        } else {
          reject(thrown);
        }
      });
    });
  }

  cancel() {
    source.cancel()
  }

  get running() {
    return this._running;
  }
}
