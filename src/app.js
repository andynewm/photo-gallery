import Express from 'express';
import Path from 'path';
import Fs from 'fs';

const app = Express();

console.log(__dirname);

app.set('views', Path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');
app.use('/photos', Express.static('photos'));
app.use('/res', Express.static('res'));

app.get('/', function(request, response) {
  const dir = Path.join(__dirname, '..', 'photos', 'small');
  console.log(dir);
  Fs.readdir(dir, (err, files) => {
    console.log(files);
    response.render('index', { files });
  });
});

export default app;