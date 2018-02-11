import { EventEmitter } from 'events';

let instance;

export default class Firehose extends EventEmitter {
  constructor() {
    if (instance) { return instance; }
    super();
    this.instance = this;
  }
}
