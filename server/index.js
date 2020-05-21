require('@babel/register')()

require('@babel/polyfill')
require.extensions['.less'] = () => {
  return;
};
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};
require.extensions['.styl'] = () => {
  return;
};
require('./server')