import Config from '../config';
import Firehose from './firehose';
import PostStream from './post_stream';
import Logger from './logger';
import Middleware from './middleware';
import API from './api';

let instance;

export default class Gondola {
  constructor() {
    if (instance) { return instance; }
    Logger.log("Starting Gondola...");
    this._listen();
    this.instance = this;
  }

  // Private

  _logPost(post) {
    Logger.log(`${post.service} - ${post.text}`));
  }

  _logError(error) {
    Logger.error(`${error.service} - ${error.message}`);
  }

  _emitPost(post) {
    PostStream.emit('post', post);
  }

  _postHandler(post) {
    this._logPost(post);
    this._emitPost(post);
  }

  _listen() {
    Firehose.on('post', post => this._postHandler);
    Firehose.on('error', error => this._logError);
  }
}
