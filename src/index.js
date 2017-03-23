import app from './app';
import { resize } from './resizer';

resize();

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});