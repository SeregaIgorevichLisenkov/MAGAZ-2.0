// Выбираем элементы с классом "parallax-window" и создаем эффект параллакса для каждого элемента с соответствующим изображением
$(document).ready(function() {  
  $('.parallax-window').parallax({imageSrc: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/B6HO7KQH2O.jpg'}); 
  $('.parallax-window-two').parallax({imageSrc: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/WLSFZJ3W9M.jpg'}); 
  $('.parallax-window-three').parallax({imageSrc: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/U3W2SHOLWQ.jpg'}); 
  $('.parallax-window-four').parallax({imageSrc: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/26E6OTLJ7L.jpg'});
});