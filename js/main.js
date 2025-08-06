document.addEventListener('DOMContentLoaded', function () {
  // Initialize Splide sliders
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

  // Initialize posts carousel
  document.querySelectorAll('.splide-posts-carousel').forEach(postCarousel => {
    new Splide(postCarousel, {
      type       : 'slide',
      perPage    : 3,
      gap        : '1rem',
      pagination : false,
      arrows     : false,
      drag       : true,
      autoWidth  : true,
    }).mount();
  });

  // Sticky header scroll effect
  // const header = document.getElementById("fm-header");
  // const content = document.querySelector(".fm-content"); // Adjust the selector to your actual content wrapper
  
  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > 50) {
  //     header.classList.add("sticky");
  //     header.style.height = "70px";
  //   } else {
  //     header.classList.remove("sticky");
  //     header.style.height = "100px";
  //   }
  // });
  
});
