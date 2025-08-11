// Initialize Splide sliders after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.splide-gallery-pair').forEach(pair => {
    const mainEl = pair.querySelector('.main-slider');
    const thumbsEl = pair.querySelector('.thumbnail-slider');

    const main = new Splide(mainEl, {
      rewind: true,
      type: 'fade',
      heightRatio: 0.5,
      pagination: false,
      arrows: true,
      cover: true,
    });

    const thumbs = new Splide(thumbsEl, {
      rewind: true,
      fixedHeight: 58,
      isNavigation: true,
      gap: 10,
      pagination: false,
      arrows: false,
      cover: true,
      focus: true,
      perPage: 3,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      breakpoints: {
        640: {
          perPage: 2,
          fixedHeight: 38,
        },
      },
    });

    main.sync(thumbs);
    main.mount();
    thumbs.mount();
  });
});
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
// Utility: Get full URL with article ID hash
function getFullUrl(articleId) {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#${articleId}`;
}

// Copy link and show toast
function copyArticleLink(buttonElement, articleId) {
  const fullUrl = getFullUrl(articleId);
  navigator.clipboard.writeText(fullUrl)
    .then(() => showCopyToast(buttonElement))
    .catch(err => console.error("Copy failed:", err));
}

function showCopyToast(buttonElement) {
  const toast = buttonElement.parentElement.querySelector('#copy-toast');
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 2000);
}
