import Config from '../../config';

class StreamHandler {
  constructor() {
    this._handler = Config.streamHandler;
  }
}

export default let stream_handler = new StreamHandler();
