import BaseResponder from '../base/responder';

export default class TwitterResponder extends BaseResponder {
  constructor(messageQueue) {
    super(messageQueue);
  }

  respond(request) {
    console.error('Respond called on twitter service - something is wrong.');
  }
}
