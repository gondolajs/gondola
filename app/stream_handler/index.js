import path from 'path';
import Config from '../../config';
import SelectedHandler from path.join('./', Config.streamHandler.kind)

class StreamHandler {
  constructor() {
    this._handler = new SelectedHandler(Config.streamHandler.params);
  }

  static async incomingPost(post) {
    return this._handler.incomingPost(post);
  }
}

export default let stream_handler = new StreamHandler();
