import { renderToString } from 'react-dom/server'
import path from 'path';
import Express from 'express';
import React from 'react';
import App from '../src/App';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';
import store from '../src/store';
const Promise = require("bluebird");
const cheerio = require("cheerio");
const fs = require("fs");
const readFileAsync = Promise.promisify(fs.readFile);

const app = Express();
app.use('/static', Express.static(path.join(__dirname, '../build/static')));
app.use(handleRender);

async function loadHTMLTemplate(path) {
  try {
    let content = await readFileAsync(path);
    return cheerio.load(content);

  } catch (e) {
    console.error(e);
    return false;
  }
}

async function renderFullPage(currentHtml, preloadedState) {
  let $ = await loadHTMLTemplate(path.resolve(__dirname, '../build/index.html'));
  if (!$) {
    return '';
  }
  let html = $.html();
  html = html.replace('<div id="root"></div>', '<div id="root">' + currentHtml + '</div>');
  return html;
}

async function handleRender(req, res) {
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
  const preloadedState = store.getState();
  const result = await renderFullPage(html, preloadedState);
  res.send(result);
}

var server = app.listen(8081, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);

});