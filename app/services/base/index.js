import { EventEmitter } from 'events';
import Config from '../../../config';
import Store from '../../store';

import Post from './post';
import Responder from './responder';
import Stream from './stream';

export default class BaseService {
  constructor(serviceName = '', firehose) {
    this._serviceName = serviceName;
    this._firehose = firehose;
    this._localQueue = new EventEmitter();

    this._accounts = await this._loadAccounts();
    this._keywords = await this._loadKeywords();

    if (!Config.services.lazyLoad) {
      this._baseResponder = new Responder(this._localQueue);
      this._baseStream = new Stream(this._localQueue);
    }
  }

  start() {
    throw new Error('BaseService: Must be implemented by child class!');
  }

  stop() {
    throw new Error('BaseService: Must be implemented by child class!');
  }

  restart() {
    throw new Error('BaseService: Must be implemented by child class!');
  }

  async addAccount(account = {}) {
    try {
      let accountAdded = await this._addAccount(account);
      if (accountAdded) { this._accounts.push(account); }
      this.restart();
    } catch(e) {
      console.error(e);
    }
  }

  async removeAccount(account) {
    try {
      let accountRemoved = await this._accountKeyword(account);
      if (accountRemoved) { this._accounts.remove(account); }
      this.restart();
    } catch(e) {
      console.error(e);
    }
  }

  async addKeyword(keyword) {
    try {
      let keywordAdded = await this._addKeyword(keyword);
      if (keywordAdded) { this._keywords.push(keyowrd); }
      this.restart();
    } catch(e) {
      console.error(e);
    }
  }

  async removeKeyword(keyword) {
    try {
      let keywordRemoved = await this._removeKeyword(keyword);
      if (keywordRemoved) { this._keywords.remove(keyword); }
      this.restart();
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

  async _loadAccounts() {
    return Store.loadAccounts(this._serviceName) || [];
  }

  async _addAccount(account = {}) {
    return Store.addAccount(this._serviceName, account);
  }

  async _removeAccount(accountKey) {
    return Store.removeAccount(this._serviceName, accountKey);
  }

  async _loadKeywords() {
    return Store.loadKeywords(this._serviceName) || [];
  }

  async _addKeyword(keyword = '') {
    return Store.addKeyword(this._serviceName, keyword);
  }

  async _removeKeyword(keyword = '') {
    return Store.removeKeyword(this._serviceName, keyword);
  }
}
