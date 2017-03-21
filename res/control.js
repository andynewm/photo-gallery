const photos = [...document.querySelectorAll('img[data-file]')]
  .map(x => `photos/large/${x.getAttribute('data-file')}`);

const mainImage = document.getElementById('main');

let imageIndex = 0;

document.body.addEventListener('keydown', function (e) {
  switch(e.which) {
    case 37: //left
      mainImage.setAttribute('src', photos[--imageIndex]);
      e.preventDefault();
      break;
    case 39: //right
      mainImage.setAttribute('src', photos[++imageIndex]);
      e.preventDefault();
      break;
  }
});

mainImage.setAttribute('src', photos[0]);
mainImage.addEventListener('load', () => console.log('okay'));