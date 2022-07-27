import Carousel from './carousel-class.js'
import SwipeCarousel from './swipe-class.js'

const carousel = new SwipeCarousel({
  containerID: '.mySlider',
  slideID: '.item',
  interval: 3000,
  isPlaying: false,
});
carousel.init();

