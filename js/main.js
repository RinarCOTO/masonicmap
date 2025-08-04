document.addEventListener('DOMContentLoaded', function () {
  /**
   * Initialize all paired image gallery sliders (main + thumbnail).
   */
  document.querySelectorAll('.splide-gallery-pair').forEach(pair => {
    const mainEl = pair.querySelector('.main-slider');
    const thumbsEl = pair.querySelector('.thumbnail-slider');

    const main = new Splide(mainEl, {
      type       : 'fade',
      heightRatio: 0.5,
      pagination : false,
      arrows     : false,
      cover      : true,
    });

    const thumbs = new Splide(thumbsEl, {
      rewind           : true,
      fixedHeight      : 58,
      isNavigation     : true,
      gap              : 10,
      pagination       : false,
      cover            : true,
      focus            : false,
      perPage          : 3,
      dragMinThreshold : {
        mouse: 4,
        touch: 10,
      },
      breakpoints : {
        640: {
          perPage     : 2,
          fixedHeight : 38,
        },
      },
    });

    main.sync(thumbs);
    main.mount();
    thumbs.mount();
  });

  /**
   * Initialize all Splide Posts Carousels (image with text below).
   */
  document.querySelectorAll('.splide-posts-carousel').forEach(postCarousel => {
    new Splide(postCarousel, {
      type      : 'loop',
      perPage   : 3 ,
      pagination: true,
      arrows    : true,
      gap       : '1rem',
    }).mount();
  });
});
