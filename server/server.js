'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.get('/discover',function(req,res){
  var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
  var discovery = new DiscoveryV1({
    username: '02f40536-270c-43f7-a2ad-d6dd96d8e926',
    //server userName & passw
    password: 'BYGmPhprCbmM',
    version: 'v1',
    version_date: '2016-12-01'
  });

  discovery.query({
    environment_id: '20f74569-8db2-4b4d-9403-9b9912d0e936',
    collection_id: 'de3131d5-26af-4dcb-b2f5-cee6bbc002fa',
    query: req.query.theme,
  }, function(error, data) {

  console.log('DATA ', data);
  console.log('query ', req.query.theme);
  console.log('error== ', error);

  res.setHeader("content-type","application/json");
  res.send(data);
  res.end();

});
});


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
