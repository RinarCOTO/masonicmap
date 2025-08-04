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
    type       : 'slide',       // Standard slide mode
    perPage    : 3,             // Adjust based on how many to show
    gap        : '1rem',
    pagination : false,         // No pagination
    arrows     : false,         // No arrows
    drag       : true,          // Enable drag
    autoWidth  : true,          // Enable dynamic width to simulate scroll
  }).mount();
});
});
