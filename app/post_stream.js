import { EventEmitter } from 'events';

class PostStream extends EventEmitter {
  constructor() {
    super();
  }
}

export default let post_stream = new PostStream();
