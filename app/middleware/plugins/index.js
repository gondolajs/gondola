import path from 'path';

export {

}

export function loadPlugins(pluginArray) {
  return pluginArray.map(plugin => {
    let pluginClass = require(path.join('./', plugin));
    return new pluginClass();
  });
}
