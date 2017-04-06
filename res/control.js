let imageIndex = 0 ;

const imageElements = [...document.querySelectorAll('img[data-file]')];
const imageContainers = [...document.querySelectorAll('.imageContainer')];

document.querySelector('.marker')
  .addEventListener('click', () => document.body.classList.toggle('previewing'));

[...document.querySelectorAll('.directioner')]
  .forEach(x => x.addEventListener('mouseleave', () => scrollSpeed = 0));

[...document.querySelectorAll('.directioner')]
  .forEach(function (x) {
    x.addEventListener('click', () => x.classList.add('spinning'));
    x.addEventListener('transitionend', () => x.classList.remove('spinning'));
  });

document.querySelector('.directioner.left')
  .addEventListener('click', function() {
    selectImage(imageIndex - 1);
  });

document.querySelector('.directioner.right')
  .addEventListener('click', function() {
    selectImage(imageIndex + 1);
  });

imageContainers.forEach(function(container) {
  const image = container.querySelector('img');
  const spinner = container.querySelector('.spinner');

  image.addEventListener('load', () => spinner.style.opacity = 0);
});

function selectImage(index) {
  imageIndex = index;

  const container = imageContainers[index];
  const image = container.querySelector('img');
  const spinner = container.querySelector('.spinner');

  slideImages(0);

  imageContainers.forEach(function(container, index) {
    const img = container.querySelector('img');
    img.src = Math.abs(index - imageIndex) <= 1 ? img.getAttribute('data-src') : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
  });

  spinner.style.opacity = 1;
}

selectImage(0);

function slideImages(offset) {
  imageContainers.forEach(function(container) {
    container.style.transform = `translate(calc(-${imageIndex}00% + ${offset}px), 0)`;
  });
}

const spinner = document.getElementById('spinner');

const imagePaths= [...document.querySelectorAll('img[data-file]')]
  .map(x => `photos/${x.getAttribute('data-file')}`);

imageElements.forEach((x, i) => x.addEventListener('click', () => {
  selectImage(i);
  document.body.classList.remove('previewing')
}));

document.body.addEventListener('keydown', function (e) {
  switch(e.which) {
    case 37: //left
      selectImage(imageIndex - 1);
      e.preventDefault();
      break;
    case 39: //right
      selectImage(imageIndex + 1);
      e.preventDefault();
      break;
  }
});


(function () {
  const container = document.getElementById('mainContainer');
  let touchStart = 0;
  let lastTouch = 0;
  container.addEventListener('touchstart', e => lastTouch = touchX = e.touches[0].clientX);
  container.addEventListener('touchmove', e => {
    lastTouch = e.touches[0].clientX;
    slideImages(lastTouch - touchX);
  });
  container.addEventListener('touchend', e => {
    const delta = touchX - lastTouch;

    if (delta > 10) {
      selectImage(imageIndex + 1);
    }
    else if (delta < -10) {
      selectImage(imageIndex - 1);
    }
    else {
      slideImages(0);
    }
  });
})();