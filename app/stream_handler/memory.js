import StreamHandlerBase from './base';

class MemoryStreamHandler extends StreamHandlerBase {
  constructor(params = {}) {
    super(params);
    this._postList = [];
  }

  async incomingPost(post) {
    try {
      this._postList.push(post);
    } catch(error) {
      console.error(error);
      return error;
    }
  }

  get posts() {
    return this._postList;
  }
}
