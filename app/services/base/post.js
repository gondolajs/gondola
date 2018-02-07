export default class BasePost {
  constructor(service, rawPost) {
    this._service = service;
    this._rawPost = rawPost;
  }

  toJSON() {
    return JSON.stringify(this.post);
  }

  get post() {
    this._post = this_post || {
      service: this._service,
      serviceId: this.serviceId,
      timestamp: this.timestamp,
      text: this.text,
      externalURI: this.externalURI,
      author: this.author,
      mentions: this.mentions,
      keywords: this.keywords,
      urls: this.urls,
      photos: this.photos,
      source: this.source,
    };
    return this._post;
  }

  get serviceId() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get text() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get externalURI() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get author() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get mentions() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get keywords() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get urls() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get photos() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get timestamp() {
    throw new Error('BasePost: Must be implemented by child class!');
  }

  get source() {
    throw new Error('BasePost: Must be implemented by child class!');
  }
}
