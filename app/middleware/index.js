import Config from '../../config';
import { loadPlugins } from './plugins';
import PostStream from '../post_stream';
import StreamHandler from '../stream_handler';

class Middleware {
  constructor() {
    this._middleware = Config.middleware;
    this._plugins = loadPlugins(this._middleware.plugins);
    this._listen();
  }

  // Private

  _handlePlugins(post) {
    return Promise.all(this._plugins.map(plugin => plugin.applyToPost(post));
  }

  _handlePost(post) {
    if (Config.logger.default === "verbose") {
      Logger.log(`Middleware: Applying... Service: ${post.service} - Post: ${post.service_id}`);
    }
    // Do middleware stuff here
    // Plugins
    return this._handlePlugins
      // Pass to StreamHandler (this should always be last)
      .then(StreamHandler.incomingPost);
  }

  _listen() {
    PostStream.on('post', post => this._handlePost);
  }
}

export default let middleware = new Middleware();
