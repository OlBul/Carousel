(function () {
  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorContainer = container.querySelector('.indicators');
  const indicators = indicatorContainer.querySelectorAll('.indicator');
  const pauseBtn = document.querySelector('#pause');
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');

  console.log(slides);


  let currentSlide = 0;
  let isPlaying = true;
  let timerID = null;
  let interval = 2000;
  let swipeStartX = null;
  let swipeEndX = null;

  const SLIDES_LENGTH = slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';

  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }

  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }
  function gotoNext() {
    gotoNth(currentSlide + 1);
  }


  function pause() {
    clearInterval(timerID);
    isPlaying = false;
    pauseBtn.innerHTML = 'Play';
  }

  function play() {
    timerID = setInterval(gotoNext, interval);
    isPlaying = true;
    pauseBtn.innerHTML = 'Pause';
  }

  function pausePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function prev() {
    gotoPrev();
    pause();
  }
  function next() {
    gotoNext();
    pause();
  }

  function indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      gotoNth(+target.getAttribute('data-slide-to'));
      pause();
    };
  }

  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -100) prev();
    if (swipeStartX - swipeEndX > 100) next();
  }

  function initListeners() {

    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }


  function init() {
    initListeners();
    timerID = setInterval(gotoNext, interval);
  }
  init();
}());


