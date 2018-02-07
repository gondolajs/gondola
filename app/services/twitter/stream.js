import Twit from 'twit';
import BaseStream from '../base/stream';

export default class TwitterStream extends BaseStream {
  constructor(messageQueue, credentials, accounts, keywords) {
    super(messageQueue, credentials, accounts, keywords);
    this._twit = new Twit(credentials);
  }

  connect() {

  }

  disconnect() {

  }

  reconnect() {
    
  }
}
