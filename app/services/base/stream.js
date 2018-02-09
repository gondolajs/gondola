import url from 'url';

import Config from '../../../config';

export default class BaseStream {
  constructor(messageQueue, credentials = {}, accounts = [], keywords = []) {
    this._messageQueue = messageQueue;
    this._credentials = credentials;
    this._accounts = accounts;
    this._keywords = keywords;
  }

  async connect() {
    throw new Error('BaseStream#connect: Must be implemented by child class!');
  }

  async disconnect() {
    throw new Error('BaseStream#disconnect: Must be implemented by child class!');
  }

  async reconnect() {
    throw new Error('BaseStream#reconnect: Must be implemented by child class!');
  }

  callbackURL() {
    return url.format({
      protocol: (Config.server.useHTTPS || Config.services.callbacksUseHTTPS) ? 'https:' : ' http:',
      slashes: true,
      hostname: Config.server.host || Config.services.callbackHost,
      port: Config.server.port || Config.services.callbackPort,
      pathName: `/services/${this._serviceName}`
    });
  }
}
