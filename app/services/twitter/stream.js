import Twit from 'twit';
import BaseStream from '../base/stream';
import TwitterPost from './post';

export default class TwitterStream extends BaseStream {
  constructor(messageQueue, credentials, accounts, keywords) {
    super(messageQueue, credentials, accounts, keywords);
    this._twit = new Twit(this._formatCredentials(credentials));
  }

  async connect() {
    this._localQueue.emit('connecting');
    this._stream = this._twit.stream('statuses/filter', this._formatStreamOptions());
    this._listen();
  }

  async disconnect() {
    this._localQueue.emit('disconnecting');
    this._stream.stop();
    this._stopListening();
    this._stream = null;
  }

  async reconnect() {
    this._localQueue.emit('reconnecting');
    await this.disconnect();
    await this.connect();
  }

  // Private

  _formatCredentials(credentials) {
    return {
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token: credentials.access_token,
      access_token_secret: credentials.access_token_secret
    };
  }

  _formatStreamOptions() {
    return {
      follow: this._accounts,
      track: this._keywords
    };
  }

  _listen() {
    this._stream.on('tweet', this._processAndEmitTweet);
    this._stream.on('delete', this._processAndEmitDelete);
    this._stream.on('error', this._processError);
  }

  _stopListening() {
    // unbind observers
  }

  _processAndEmitTweet(tweet) {
    let post = new TwitterPost(tweet);
    this._localQueue.emit('post', post);
  }

  _processAndEmitDelete(deleteMessage) {
    // TODO format delete
    this._localQueue.emit('delete', deleteMessage);
  }

  _processError(error) {
    // TODO format error
    this._localQueue.emit('error', error);
    this.reconnect();
  }
}
