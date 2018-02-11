import { EventEmitter } from 'events';
import StreamHandlerBase from './base';

export default class EventEmitterStreamHandler extends StreamHandlerBase {
  constructor(params = {}) {
    super(params);
    this._emitter = new EventEmitter();
  }

  async incomingPost(post) {
    try {
      this._emitter.emit('post', post);
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  get emitter() {
    return this._emitter;
  }
}
