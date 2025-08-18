// ================================
// DOM Ready
// ================================
document.addEventListener('DOMContentLoaded', function () {

  // ================================
  // Gallery Pair Sliders (Main + Thumbs)
  // ================================
  document.querySelectorAll('.splide-gallery-pair').forEach(pair => {
    const mainEl = pair.querySelector('.main-slider');
    const thumbsEl = pair.querySelector('.thumbnail-slider');

    const main = new Splide(mainEl, {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: true,
      heightRatio: 1,
      cover: true,
    });

    const thumbs = new Splide(thumbsEl, {
      isNavigation: true,
      fixedWidth: 75,
      fixedHeight: 75,
      gap: 10,
      pagination: false,
      arrows: false,
      cover: true,
      focus: 'center',
      trimSpace: false,
      drag: false,
      dragMinThreshold: { mouse: 4, touch: 10 },
      breakpoints: { 768: { perPage: 2 } },
    });

    thumbs.on('mounted', () => thumbs.go(1));

    main.sync(thumbs);
    main.mount();
    thumbs.mount();
  });


  // ================================
  // Posts Carousel
  // ================================
  document.querySelectorAll('.splide-posts-carousel').forEach(postCarousel => {
    new Splide(postCarousel, {
      type: 'slide',
      perPage: 3,
      // gap: '1rem',
      pagination: false,
      arrows: false,
      drag: true,
      autoWidth: true,
    }).mount();
  });


  // ================================
  // Mobile Slider
  // ================================
  new Splide('#mobile-slider', {
    type: 'loop',
    rewind: true,
    // fixedWidth: 368,
    // fixedHeight: 175,
    gap: '2rem',
    perPage: 1,
    arrows: false,
    pagination: false,
    drag: true,
    snap: true,
    autoWidth: true,
    // perMove: 1,
    focus: 'center',
    dragMinThreshold: { mouse: 20, touch: 20 }
  }).mount();


  // ================================
  // Tabs
  // ================================
  const listTabBtn = document.getElementById('listTabBtn');
  const mapTabBtn = document.getElementById('mapTabBtn');
  const listTab = document.getElementById('listTab');
  const mapTab = document.getElementById('mapTab');

  function activateTab(tab) {
    if (window.innerWidth > 768) {
      listTab.classList.remove('hidden');
      mapTab.classList.remove('hidden');
      listTabBtn.classList.remove('bg-red-700', 'text-white', 'rounded-full');
      mapTabBtn.classList.remove('bg-red-700', 'text-white', 'rounded-full');
      return;
    }

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

  activateTab(window.innerWidth <= 768 ? 'list' : null);
  listTabBtn.addEventListener('click', () => activateTab('list'));
  mapTabBtn.addEventListener('click', () => activateTab('map'));
  window.addEventListener('resize', () => activateTab(window.innerWidth <= 768 ? 'list' : null));


  // ================================
  // Hash Scroll
  // ================================
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  // ================================
  // Popup Links
  // ================================
  document.querySelectorAll('.popup-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.href;
      const width = 600;
      const height = 400;
      const left = (screen.width / 2) - (width / 2);
      const top = (screen.height / 2) - (height / 2);

      window.open(
        url,
        'popupWindow',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );
    });
  });

});


// ================================
// Header Shrink on Scroll
// ================================
const header = document.getElementById('fm-main-header');
const scrollThreshold = 100;
window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) header.classList.add('shrink');
  else header.classList.remove('shrink');
});


// ================================
// Utility: Get Full URL
// ================================
function getFullUrl(articleId) {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#${articleId}`;
}


// ================================
// Copy Link
// ================================
function copyArticleLink(buttonElement, articleId) {
  const fullUrl = getFullUrl(articleId);
  navigator.clipboard.writeText(fullUrl)
    .then(() => showCopyToast(buttonElement))
    .catch(err => console.error("Copy failed:", err));
}

function showCopyToast(buttonElement) {
  const toast = buttonElement.parentElement.querySelector('.copy-toast');
  if (!toast) return;

  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 2000);
}


// ================================
// Social Share
// ================================
function shareToSocial(platform, articleId) {
  const url = encodeURIComponent(getFullUrl(articleId));
  let shareUrl = '';

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
      break;
  }

  const width = 600;
  const height = 400;
  const left = (screen.width / 2) - (width / 2);
  const top = (screen.height / 2) - (height / 2);

  window.open(
    shareUrl,
    'shareWindow',
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
  );
}
