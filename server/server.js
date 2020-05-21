import path from 'path';
import Express from 'express';
import React from 'react';

const app = Express();
// 每当收到请求时都会触发
//app.use(handleRender);
//
//// 接下来会补充这部分代码
//function handleRender(req, res) {
//}
//
//function renderFullPage(html, preloadedState) {
//  /* ... */
//}

app.get('/', function(req, res) {
  res.send('Hello World');
});

var server = app.listen(8081, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);

});