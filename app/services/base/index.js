import { EventEmitter } from 'events';
import Config from '../../../config';
import Store from '../../store';
import Firehose from '../../firehose';

import Post from './post';
import Responder from './responder';
import Stream from './stream';

export default class BaseService {
  constructor(serviceName = '') {
    this._serviceName = serviceName;
    this._firehose = Firehose;
    this._localQueue = new EventEmitter();

    this._accounts = await this._loadAccounts();
    this._keywords = await this._loadKeywords();

    if (!Config.services.lazyLoad) {
      this._baseResponder = new Responder(this._localQueue);
      this._baseStream = new Stream(this._localQueue);
    }

    this._listen();
  }

  async start() {
    throw new Error('BaseService: Must be implemented by child class!');
  }

  async stop() {
    throw new Error('BaseService: Must be implemented by child class!');
  }

  async restart() {
    throw new Error('BaseService: Must be implemented by child class!');
  }

  async addAccount(account = {}) {
    try {
      let accountAdded = await this._addAccount(account);
      if (accountAdded) { this._accounts.push(account); }
    } catch(e) {
      console.error(e);
    }
  }

  async removeAccount(account) {
    try {
      let accountRemoved = await this._accountKeyword(account);
      if (accountRemoved) { this._accounts.remove(account); }
    } catch(e) {
      console.error(e);
    }
  }

  async addKeyword(keyword) {
    try {
      let keywordAdded = await this._addKeyword(keyword);
      if (keywordAdded) { this._keywords.push(keyowrd); }
    } catch(e) {
      console.error(e);
    }
  }

  async removeKeyword(keyword) {
    try {
      let keywordRemoved = await this._removeKeyword(keyword);
      if (keywordRemoved) { this._keywords.remove(keyword); }
    } catch(e) {
      console.error(e);
    }
  }

  get _responder() {
    this._baseResponder = this._baseResponder || new Responder(this._localQueue);
    return this._baseResponder;
  }

  get _stream() {
    this._baseStream = this._baseStream || new Stream(this._localQueue);
    return this._baseStream;
  }

  _loadAccounts() {
    return Store.loadAccounts(this._serviceName) || Promise.resolve([]);
  }

  _addAccount(account = {}) {
    return Store.addAccount(this._serviceName, account);
  }

  _removeAccount(accountKey) {
    return Store.removeAccount(this._serviceName, accountKey);
  }

  _loadKeywords() {
    return Store.loadKeywords(this._serviceName) || [];
  }

  _addKeyword(keyword = '') {
    return Store.addKeyword(this._serviceName, keyword);
  }

  _removeKeyword(keyword = '') {
    return Store.removeKeyword(this._serviceName, keyword);
  }

  _listen() {
    this._localQueue.on('post', post => firehose.emit('post', post));
    this._localQueue.on('delete', deletion => firehose.emit('delete', deletion));
    this._localQueue.on('error', error => firehose.emit('error', error));
  }
}
