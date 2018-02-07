/**
 * Respond to callback requests
 */
export default class BaseResponder {
  constructor(messageQueue) {
    this._messageQueue = messageQueue;
  }

  /**
   * Respond to request
   * @abstract
   */
  respond(request) {
    throw new Error('BaseResponder: Must be implemented by subclass');
  }
}
