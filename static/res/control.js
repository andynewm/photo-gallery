let imageIndex = 0;

const previewImages = [...document.querySelectorAll('img[data-file]')];
const imageContainers = [...document.querySelectorAll('.imageContainer')].map(container => ({
  container,
  image: container.querySelector('img'),
  spinner: container.querySelector('.spinner')
}));

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

imageContainers.forEach(function({ image, spinner }) {
  image.addEventListener('load', () => {
    if (!image.src.startsWith('data')) {
      spinner.style.opacity = 0;
    }
  });
});

function switchImageSrcs() {
  imageContainers.forEach(function({ spinner, image }, index) {
    const showImage = Math.abs(index - imageIndex) <= 1;
    const newSrc = showImage
      ? image.getAttribute('data-src')
      : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

    if (!showImage || (showImage && image.src.startsWith('data'))) {
      spinner.opacity = 1;
    }

    image.src = newSrc;
  });
}

imageContainers[0].container.addEventListener('transitionend', switchImageSrcs);

switchImageSrcs();

function selectImage(index) {
  if (index < 0 || index >= imageContainers.length) {
    slideImages(0);
    return;
  }

  previewImages.forEach(function(preview, i) {
    preview.classList.toggle('active', i == index);
  });

  imageIndex = index;

  slideImages(0);
}

selectImage(0);

function slideImages(offset) {
  imageContainers.forEach(function({ container }) {
    container.style.transform = `translate(calc(-${imageIndex}00% + ${offset}px), 0)`;
  });
}

previewImages.forEach((x, i) => x.addEventListener('click', () => {
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

    if (delta > 20) {
      selectImage(imageIndex + 1);
    }
    else if (delta < -20) {
      selectImage(imageIndex - 1);
    }
    else {
      slideImages(0);
    }
  });
})();