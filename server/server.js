import { renderToString } from 'react-dom/server'
import path from 'path';
import Express from 'express';
import React from 'react';
import App from '../src/App';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';
import store from '../src/store';

const app = Express();
app.use(handleRender);

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // 警告：关于在 HTML 中嵌入 JSON 的安全问题，请查看以下文档
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

function handleRender(req, res) {
  //const html = renderToString(
  //  <React.StrictMode>
  //    <Provider store={store}>
  //      <StoreContext.Provider value={ store }>
  //        <App />
  //      </StoreContext.Provider>
  //    </Provider>
  //  </React.StrictMode>,
  //);
  const html = renderToString(<App />);
  const preloadedState = store.getState()
  res.send(renderFullPage(html, preloadedState));
}

var server = app.listen(8081, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);

});