export default class PluginBase {
  constructor(params = {}) {
    this._params = params;
  }
  
  async applyToPost(post) {
    throw new Error("PluginBase: #applyToPost must be implemented in child class.");
  }
}
