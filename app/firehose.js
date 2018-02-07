import { EventEmitter } from 'events';

class Firehose extends EventEmitter {
  constructor() {
    super();
  }
}

export default let firehose = new Firehose();
