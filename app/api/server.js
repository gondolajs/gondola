import express from 'express';
import Config from '../../config';

let instance;

export default class Server {
  constructor() {
    if (instance) { return instance; }
    this.instance = instance;
  }

  start() {
    this._app = express();
  }

  // Private

  _loadRoutes() {
    this._app.get('/', (req, res) => res.send('Gondola API'));
  }
}
