import path from 'path';
import Config from '../../config';
import SelectedHandler from path.join('./', Config.streamHandler.kind)

let instance;

export default class StreamHandler {
  constructor() {
    if (instance) { return instance; }
    this._handler = new SelectedHandler(Config.streamHandler.params);
    this.instance = this;
  }

  static async incomingPost(post) {
    return this._handler.incomingPost(post);
  }
}
