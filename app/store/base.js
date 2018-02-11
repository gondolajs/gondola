export default class StoreBase {
  constructor(params = {}) {
    this._params = params;
  }
  
  connect() {
    throw new Error('StoreBase: #connect must be implemented by child class.');
  }

  diconnect() {
    throw new Error('StoreBase: #disconnect must be implemented by child class.');
  }

  reconnect() {
    throw new Error('StoreBase: #reconnect must be implemented by child class.');
  }

  async loadCredentials(service) {
    return Promise.reject('StoreBase: #loadCredentials must be implemented by child class.');
  }

  async loadAccounts(service) {
    return Promise.reject('StoreBase: #loadAccounts must be implemented by child class.');
  }

  async addAccount(service, account) {
    return Promise.reject('StoreBase: #addAccount must be implemented by child class.');
  }

  async removeAccount(service, account) {
    return Promise.reject('StoreBase: #removeAccount must be implemented by child class.');
  }

  async loadKeywords(service) {
    return Promise.reject('StoreBase: #loadKeywords must be implemented by child class.');
  }

  async addKeyword(service, keyword) {
    return Promise.reject('StoreBase: #addKeyword must be implemented by child class.');
  }

  async removeKeyword(service, keyword) {
    return Promise.reject('StoreBase: #removeKeyword must be implemented by child class.');
  }
}
