import Pug from 'pug';
import Path from 'path';
import Fs from 'fs-extra';
import { resize } from './resizer';

const dir = Path.join(__dirname, '..', 'photos', 'thumbs');

Fs.readdir(dir, (err, files) => {
  const html = Pug.renderFile('./views/index.pug', { files });
  Fs.writeFile('./static/index.html', html);
});

Fs.copy('./res', './static/res');

resize().then(function () {
  Fs.copy('./photos/full', './static/photos/full');
  Fs.copy('./photos/main', './static/photos/main');
  Fs.copy('./photos/thumbs', './static/photos/thumbs');
});