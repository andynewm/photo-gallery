import app from './app';

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});