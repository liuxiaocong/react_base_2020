require('@babel/register')()

require('@babel/polyfill')
require.extensions['.less'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};
require('./server')