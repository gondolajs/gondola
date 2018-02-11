export default class StreamHandlerBase {
  constructor(params = {}) {
    this._params = params;
  }

  async incomingPost(post) {
    throw new Error('StreamHandlerBase: #incomingPost must be handled by child class.');
  }
}
