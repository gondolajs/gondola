import { EventEmitter } from 'events';

import Post from './post';
import Responder from './responder';
import Stream from './stream';

class BaseService {
  constructor() {
    this._messageQueue = new EventEmitter();
    this._responder = new Responder(messageQueue);
    this._stream = new Stream(messageQueue);
  }
}
