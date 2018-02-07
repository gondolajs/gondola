import BaseService from '../base';

export default class TwitterService extends BaseService {
  constructor() {
    super('twitter');
  }

  start() {
    this._stream.connect();
  }

  stop() {
    this._stream.disconnect();
  }

  restart() {
    this._stream.reconnect();
  }
}
