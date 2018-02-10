import Insta from 'instagram-node-lib';

import BaseStream from '../base/stream';
import InstagramPost from './post';

export default class InstagramStream extends BaseStream {
  constructor(messageQueue, credentials, accounts, keywords) {
    super(messageQueue, credentials, accounts, keywords);
    this._insta = Insta;
    this._formatCredentials(credentials);
  }

  async connect() {
    this._messageQueue.emit('connecting');
    this._stream = null;
    this._listen();
  }

  async disconnect() {
    this._messageQueue.emit('disconnecting');
    this._stream.stop();
    this._stopListening();
    this._stream = null;
  }

  async reconnect() {
    this._messageQueue.emit('reconnecting');
    await this.disconnect();
    await this.connect();
  }

  // Private

  _formatCredentials(credentials) {
    this._insta.set('client_id', credentials.client_id);
    this._insta.set('client_secret', credentials.client_secret);
  }

  _formatStreamOptions() {
    return {};
  }

  _listen() {
    this._stream.on('photo', this._processAndEmitPhoto);
    this._stream.on('error', this._processAndEmitError);
  }

  _stopListening() {
    this._stream.removeAllListeners('photo');
    this._stream.removeAllListeners('error');
  }

  _processAndEmitPhoto(photo) {
    let post = new InstagramPost(photo);
    this._messageQueue.emit('post', post);
  }

  _processAndEmitError(error) {
    let msg = { service: 'instagram', error: error.toString() };
    this._messageQueue.emit('error', msg);
  }
}
