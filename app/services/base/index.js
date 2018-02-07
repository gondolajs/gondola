import { EventEmitter } from 'events';

import Post from './post';
import Responder from './responder';
import Stream from './stream';

class BaseService {
  constructor() {
    this.messageQueue = new EventEmitter();
    this.responder = new Responder(messageQueue);
    this.stream = new Stream(messageQueue);
  }
}
