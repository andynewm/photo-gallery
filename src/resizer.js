import Sharp from 'sharp';
import Fs from 'fs';
import Path from 'path';

export async function resize() {
  const dir = Path.join(__dirname, '..', 'photos');
  const thumbsDir = Path.join(__dirname, '..', 'photos', 'thumbs');
  const mainDir = Path.join(__dirname, '..', 'photos', 'main');
  const files = await getFiles();

  files.forEach(function (file) {
    const pp = Path.join(dir, file);

    Sharp(pp)
      .resize(200, 200)
      .crop(Sharp.strategy.center)
      .toFile(Path.join(thumbsDir, file));

    Sharp(pp)
      .resize(2000, 2000)
      .max()
      .toFile(Path.join(mainDir, file));
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