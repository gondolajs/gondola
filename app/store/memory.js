import Config from '../../config';
import StoreBase from './base';

export default class MemoryStore extends StoreBase {
  connect(params = {}) {
    super(params);
    this._storage = {
      twitter: {
        accounts: {},
        keywords: {}
      },
      instagram: {
        accounts: {},
        keywords: {}
      }
    }
    return true;
  }

  diconnect() {
    return true;
  }

  reconnect() {
    return true;
  }

  async loadAccounts(service) {
    try {
      let accounts = this._storage[service].accounts;
      return accounts.values();
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  async addAccount(service, account) {
    try {
      this._storage[service].accounts[account.service_id] = account;
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  async removeAccount(service, account) {
    try {
      delete this._storage[service].accounts[account.service_id];
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  async loadKeywords(service) {
    try {
      let keywords = this._storage[service].keywords;
      return keywords.keys();
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  async addKeyword(service, keyword) {
    try {
      this._storage[service].keywords[keyword] = true;
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  async removeKeyword(service, keyword) {
    try {
      delete this._storage[service].keywords[keyword];
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }
}
