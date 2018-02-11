import Config from '../../config';
import Plugins from '../plugins';
import PostStream from '../post_stream';

class Middleware {
  constructor() {
    this._middleware = Config.middleware;
    // Plugins.load(this._middleware.plugins);
  }

  // Private

  _handlePost(post) {
    // Do middleware stuff here
    return post;
  }

  _listen() {
    PostStream.on('post', post => this._handlePost);
  }
}

export default let middleware = new Middleware();
