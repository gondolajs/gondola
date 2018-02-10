import BaseResponder from '../base/responder';

export default class InstagramResponder extends BaseResponder {
  constructor(messageQueue) {
    super(messageQueue);
  }

  respond(request) {
    if (request.query['hub.challenge']) {
      return { code: 200, content: request.query['hub.challenge'] };
    } else {
      request.body.forEach(update => this.messageQueue.emit('update', update));
      return { code: 200 };
    }
  }
}
