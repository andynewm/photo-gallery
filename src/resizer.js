import Sharp from 'sharp';
import Fs from 'fs';
import Path from 'path';

export async function resize() {
  const dir = Path.join(__dirname, '..', 'photos');
  const files = await getFiles();

  files.filter(file => /\.jpg$/.test(file)).forEach(function (file) {
    const pp = Path.join(dir, file);

    Sharp(pp)
      .resize(200, 200)
      .crop(Sharp.strategy.center)
      .jpeg({ quality: 95 })
      .toFile(Path.join(dir, 'thumbs', file));

    Sharp(pp)
      .resize(2000, 2000)
      .max()
      .jpeg({ quality: 95 })
      .toFile(Path.join(dir, 'main', file));

    Sharp(pp)
      .jpeg({ quality: 95 })
      .toFile(Path.join(dir, 'full', file));
  });
}

function getFiles() {
  const dir = Path.join(__dirname, '..', 'photos');
  return new Promise(function(resolve, reject) {
    Fs.readdir(dir, (err, files) => {
      resolve(files);
    });
  });
}