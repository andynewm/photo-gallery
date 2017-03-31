const imageElements = [...document.querySelectorAll('img[data-file]')];

function createImageFragment(index) {
  const template = document.getElementById('imageContainerTemplate');
  const clone = document.importNode(template.content, true);
  const image = clone.querySelector('.mainImage');
  const spinner = clone.querySelector('.spinner');

  image.src = imagePaths[i];

  return clone;
}

const scrollHouse = document.getElementById('scrollHouse');
let scrollSpeed = 0;

document.querySelector('.directioner.left')
  .addEventListener('mouseenter', () => scrollSpeed = -8);

document.querySelector('.directioner.right')
  .addEventListener('mouseenter', () => scrollSpeed = 8);

[...document.querySelectorAll('.directioner')]
  .forEach(x => x.addEventListener('mouseleave', () => scrollSpeed = 0));

function showImage(index) {
  if (index < 0 || index >= imageElements.length) {
    return;
  }
  spinner.style.opacity = 1;
  mainImage.src = imagePaths[index];
  afterImage.src = imagePaths[index + 1];
  beforeImage.src = imagePaths[index - 1];
  imageIndex = index;
}

function scroll() {
  scrollHouse.scrollLeft += scrollSpeed;
  requestAnimationFrame(scroll);
}

requestAnimationFrame(scroll);

const spinner = document.getElementById('spinner');

const imagePaths= [...document.querySelectorAll('img[data-file]')]
  .map(x => `photos/${x.getAttribute('data-file')}`);

const beforeImage = document.getElementById('before');
const mainImage = document.getElementById('main');
const afterImage = document.getElementById('after');

imageElements.forEach((x, i) => x.addEventListener('click', () => {
  showImage(i);
}));

let imageIndex = 0 ;

document.body.addEventListener('keydown', function (e) {
  switch(e.which) {
    case 37: //left
      showImage(imageIndex - 1);
      e.preventDefault();
      break;
    case 39: //right
      showImage(imageIndex + 1);
      e.preventDefault();
      break;
  }
});

showImage(0);
mainImage.addEventListener('load', () => spinner.style.opacity = 0);

(function () {
  const container = document.getElementById('mainContainer');
  let touchStart = 0;
  let lastTouch = 0;
  container.addEventListener('touchstart', e => lastTouch = touchX = e.touches[0].clientX);
  container.addEventListener('touchmove', e => {
    lastTouch = e.touches[0].clientX;
    beforeImage.style.transform = `translate(${lastTouch - touchX}px)`;
    mainImage.style.transform = `translate(${lastTouch - touchX}px)`;
    afterImage.style.transform = `translate(${lastTouch - touchX}px)`;
  });
  container.addEventListener('touchend', e => {
    const delta = touchX - lastTouch;
    beforeImage.style.transform = '';
    mainImage.style.transform = '';
    afterImage.style.transform = '';
    if (delta > 10) {
      showImage(imageIndex + 1);
    }
    if (delta < -10) {
      showImage(imageIndex - 1);
    }
  });
})();