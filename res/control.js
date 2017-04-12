let imageIndex = 0 ;

const imageElements = [...document.querySelectorAll('img[data-file]')];
const imageContainers = [...document.querySelectorAll('.imageContainer')];

(function() {
  let timer = null;
  let locked = false;

  const controlsElement = document.querySelector('.controls');

  function hideControls() {
    if (locked) {
      return;
    }

    controlsElement.classList.remove('show');
    timer = null;
  }

  function showControls() {
    if (locked) {
      return;
    }

    controlsElement.classList.add('show');

    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(hideControls, 1000);
  }

  function lockControls() {
    controlsElement.classList.add('show');

    if (timer != null) {
      clearTimeout(timer);
    }

    locked = true;
  }

  function unlockControls() {
    locked = false;

    timer = setTimeout(hideControls, 1000);
  }

  showControls();

  document.body.addEventListener('mousemove', showControls);
  document.body.addEventListener('click', showControls);
  controlsElement.addEventListener('mouseenter', lockControls);
  controlsElement.addEventListener('mouseleave', unlockControls);
})();

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

  image.addEventListener('load', () => {
    if (!image.src.startsWith('data')) {
      spinner.style.opacity = 0;
    }
  });
});

function switchImageSrcs() {
  imageContainers.forEach(function(container, index) {
    const img = container.querySelector('img');
    const showImage = Math.abs(index - imageIndex) <= 1;
    const newSrc = showImage
      ? img.getAttribute('data-src')
      : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

    if (!showImage || (showImage && img.src.startsWith('data'))) {
      container.querySelector('.spinner').opacity = 1;
    }

    img.src = newSrc;
  });
}

imageContainers[0].addEventListener('transitionend', switchImageSrcs);

switchImageSrcs();

function selectImage(index) {
  if (index < 0 || index >= imageContainers.length) {
    slideImages(0);
    return;
  }

  imageElements.forEach(function(preview, i) {
    preview.classList.toggle('active', i == index);
  });

  imageIndex = index;

  const container = imageContainers[index];
  const image = container.querySelector('img');

  slideImages(0);
}

selectImage(0);

function slideImages(offset) {
  imageContainers.forEach(function(container) {
    container.style.transform = `translate(calc(-${imageIndex}00% + ${offset}px), 0)`;
  });
}

const imagePaths= [...document.querySelectorAll('img[data-file]')]
  .map(x => `photos/${x.getAttribute('data-file')}`);

imageElements.forEach((x, i) => x.addEventListener('click', () => {
  const container = document.getElementById('mainContainer')
  container.classList.add('sticky');
  selectImage(i);
  setTimeout(() => container.classList.remove('sticky'), 100);
  document.body.classList.remove('previewing');
  switchImageSrcs();
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
  container.addEventListener('touchstart', e => {
    lastTouch = touchX = e.touches[0].clientX;
    container.classList.add('sticky');
  });
  container.addEventListener('touchmove', e => {
    lastTouch = e.touches[0].clientX;
    slideImages(lastTouch - touchX);
  });
  container.addEventListener('touchend', e => {
    container.classList.remove('sticky');
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