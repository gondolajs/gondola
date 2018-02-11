import Sediment from 'sediment';
import PluginBase from './base';

export default class SentimentPlugin extends PluginBase {
  constructor() {
    super();
  }
  
  async applyToPost(post) {
    try {
      post.attach('sentiment', Sediment.analyze(post.text));
      return post;
    } catch(error) {
      console.error(error);
      return false;
    }
  }
}
