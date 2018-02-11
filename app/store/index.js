import path from 'path';
import Config from '../../config';
import SelectedStore from path.join('./', Config.store.kind, '.js');

let instance;

export default class Store {
  constructor() {
    if (instance) { return instance; }
    this._store = new SelectedStore(Config.store.params);
    this.instance = this;
  }

  static connect() {
    return this._store.connect();
  }

  static diconnect() {
    return this._store.diconnect();
  }

  static reconnect() {
    return this._store.reconnect();
  }

  static async loadCredentials(service) {
    return this._store.loadCredentials(service);
  }

  static async loadAccounts(service) {
    return this._store.loadAccounts(service);
  }

  static async addAccount(service, account) {
    return this._store.addAccount(service, account);
  }

  static async removeAccount(service, account) {
    return this._store.removeAccount(service, account);
  }

  static async loadKeywords(service) {
    return this._store.loadKeywords(service);
  }

  static async addKeyword(service, keyword) {
    return this._store.addKeyword(service, keyword);
  }

  static async removeKeyword(service, keyword) {
    return this._store.removeKeyword(service, keyword);
  }
}
