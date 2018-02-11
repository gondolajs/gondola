import { EventEmitter } from 'events';

let instance;

export default class PostStream extends EventEmitter {
  constructor() {
    if (instance) { return instance; }
    super();
    this.instance = instance;
  }
}
