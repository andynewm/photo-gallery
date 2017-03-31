import Sharp from 'sharp';
import Fs from 'fs';
import Path from 'path';

export async function resize() {
  const dir = Path.join(__dirname, '..', 'photos');
  const thumbsDir = Path.join(__dirname, '..', 'photos', 'thumbs');
  const files = await getFiles();

  files.forEach(function (file) {
    const pp = Path.join(dir, file);
    console.log(pp);
    Sharp(pp)
      .resize(200, 200)
      .crop(Sharp.strategy.center)
      .toFile(Path.join(thumbsDir, file));
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