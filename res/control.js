const imageElements = [...document.querySelectorAll('img[data-file]')];

const scrollHouse = document.getElementById('scrollHouse');
let scrollSpeed = 0;

document.querySelector('.directioner.left')
  .addEventListener('mouseenter', () => scrollSpeed = -8);

document.querySelector('.directioner.right')
  .addEventListener('mouseenter', () => scrollSpeed = 8);

[...document.querySelectorAll('.directioner')]
  .forEach(x => x.addEventListener('mouseleave', () => scrollSpeed = 0));

function scroll() {
  scrollHouse.scrollLeft += scrollSpeed;
  requestAnimationFrame(scroll);
}

requestAnimationFrame(scroll);

const spinner = document.getElementById('spinner');

const imagePaths= [...document.querySelectorAll('img[data-file]')]
  .map(x => `photos/${x.getAttribute('data-file')}`);

const mainImage = document.getElementById('main');

imageElements.forEach((x, i) => x.addEventListener('click', () => {
  spinner.style.opacity = 1;
  mainImage.setAttribute('src', imagePaths[i]);
}));

let imageIndex = 0 ;

document.body.addEventListener('keydown', function (e) {
  switch(e.which) {
    case 37: //left
      mainImage.setAttribute('src', imagePaths[--imageIndex]);
      spinner.style.opacity = 1;
      e.preventDefault();
      break;
    case 39: //right
      mainImage.setAttribute('src', imagePaths[++imageIndex]);
      spinner.style.opacity = 1;
      e.preventDefault();
      break;
  }
});

mainImage.setAttribute('src', imagePaths[0]);
mainImage.addEventListener('load', () => spinner.style.opacity = 0);