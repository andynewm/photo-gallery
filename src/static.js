import Pug from 'pug';
import Path from 'path';
import Fs from 'fs';

const dir = Path.join(__dirname, '..', 'photos', 'thumbs');

Fs.readdir(dir, (err, files) => {
  const html = Pug.renderFile('../views/index.pug', { files });
  Fs.writeFile('../static/index.html', html);
});