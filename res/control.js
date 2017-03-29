const imageElements = [...document.querySelectorAll('img[data-file]')];

const scrollHouse = document.getElementById('scrollHouse');
const mainLink = document.getElementById('mainLink');
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
  mainLink.href = imagePaths[index];
  mainImage.src = imagePaths[index];
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

const mainImage = document.getElementById('main');

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

  let touchX = 0;
  mainImage.addEventListener('touchstart', e => touchX = e.touches[0].clientX);
  mainImage.addEventListener('touchmove', e => mainImage.style.transform = `translate(${e.touches[0].clientX - touchX}px)`);
  mainImage.addEventListener('touchend', e => {
    mainImage.style.transform = '';
    if (touchX > 10) {
      showImage(imageIndex + 1);
    }
    if (touchX < -10) {
      showImage(imageIndex - 1);
    }
  });
})();
mainImage.addEventListener('touchstart', (e) => console.log(e));