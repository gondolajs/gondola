import Config from '../config';

class Logger {
  constructor() {
    this._loggerDefault = Config.logger.default;
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

export default let logger = new Logger();
