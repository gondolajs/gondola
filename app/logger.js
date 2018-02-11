import Config from '../config';

let instance;

export default class Logger {
  constructor() {
    if (instance) { return instance; }
    this._loggerDefault = Config.logger.default;
    this.instance = this;
  }

  static log(log) {
    Logger[this._loggerDefault].bind(this, log);
  }

  static verbose(log) {
    console.log(log);
  }

  static debug(log) {
    console.debug(log);
  }

  static error(log) {
    console.error(log);
  }

  static normal(log) {
    console.log(log);
  }
}
