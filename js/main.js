// Initialize Splide sliders after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.splide-gallery-pair').forEach(pair => {
    const mainEl = pair.querySelector('.main-slider');
    const thumbsEl = pair.querySelector('.thumbnail-slider');

    const main = new Splide(mainEl, {
      rewind: true,
      type: 'fade',
      cover: false,
      fixedHeight: 528,
      fixedWidth: 528,
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
        768: {
          perPage: 2,
          fixedHeight: 58,
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
  const toast = buttonElement.parentElement.querySelector('.copy-toast');
  if (!toast) return;

  // Show toast
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  // Hide after 2s
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 2000);
}


const header = document.getElementById('fm-main-header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});
const listTabBtn = document.getElementById('listTabBtn');
const mapTabBtn = document.getElementById('mapTabBtn');
const listTab = document.getElementById('listTab');
const mapTab = document.getElementById('mapTab');

// Function to activate tab
function activateTab(tab) {
  if (window.innerWidth > 768) {
    // Desktop: show both, no need for tab switching
    listTab.classList.remove('hidden');
    mapTab.classList.remove('hidden');

    // Remove active styles since both are shown
    listTabBtn.classList.remove('bg-red-700', 'text-white', 'rounded-full');
    mapTabBtn.classList.remove('bg-red-700', 'text-white', 'rounded-full');
    return;
  }

  // Mobile: normal tab behavior
  if (tab === 'list') {
    listTab.classList.remove('hidden');
    mapTab.classList.add('hidden');

    listTabBtn.classList.add('bg-red-700', 'text-white', 'rounded-full');
    listTabBtn.classList.remove('bg-transparent', 'text-gray-800');

    mapTabBtn.classList.remove('bg-red-700', 'text-white', 'rounded-full');
    mapTabBtn.classList.add('bg-transparent', 'text-gray-800');
  } else {
    mapTab.classList.remove('hidden');
    listTab.classList.add('hidden');

    mapTabBtn.classList.add('bg-red-700', 'text-white', 'rounded-full');
    mapTabBtn.classList.remove('bg-transparent', 'text-gray-800');

    listTabBtn.classList.remove('bg-red-700', 'text-white', 'rounded-full');
    listTabBtn.classList.add('bg-transparent', 'text-gray-800');
  }
}

// Initial setup: default to 'list' on mobile
activateTab(window.innerWidth <= 768 ? 'list' : null);

// Event listeners
listTabBtn.addEventListener('click', () => activateTab('list'));
mapTabBtn.addEventListener('click', () => activateTab('map'));

// Handle window resize
window.addEventListener('resize', () => {
  activateTab(window.innerWidth <= 768 ? 'list' : null);
});

// window load
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

