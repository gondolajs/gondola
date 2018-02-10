import BaseService from '../base';

class InstagramService extends BaseService {
  constructor() {
    super('instagram');
  }

  async start() {
    try {
      return await this._stream.connect();
    } catch(error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async stop() {
    try {
      return await this._stream.disconnect();
    } catch(error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async restart() {
    try {
      return await this._stream.reconnect();
    } catch(error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async addAccount(account = {}) {
    super(account);
    return this.restart();
  }

  async removeAccount(account) {
    super(account);
    return this.restart();
  }

  async addKeyword(keyword) {
    super(keyword);
    return this.restart();
  }

  async removeKeyword(keyword) {
    super(keyword);
    return this.restart();
  }
}

export default let instagramService = new InstagramService();
