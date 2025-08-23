// // ============================
// // Dependency checks
// // ============================
// if (typeof L === "undefined") throw new Error("Leaflet is required.");
// if (typeof Splide === "undefined") throw new Error("Splide is required.");

// // ============================
// // Initialize Leaflet Map
// // ============================
// const map = L.map("map", {
//   center: [37.7671, -122.4324],
//   zoom: 19,
//   zoomControl: false,
//   scrollWheelZoom: false,
//   attributionControl: false,
// });

// // Map tiles
// L.tileLayer(
//   `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}`,
//   {
//     id: "mapbox/streets-v11",
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken:
//       "pk.eyJ1IjoicmluYXJza2kiLCJhIjoiY21laG0zdGl5MDV5cDJtb2g4d2lxajZreCJ9.jEW1tOkw2P8WcvH2CrmDAA",
//   }
// ).addTo(map);

// // ============================
// // Marker icons
// // ============================
// const inactiveIcon = L.divIcon({
//   className: "custom-marker",
//   html: `<svg width="32" height="32" viewBox="0 0 32 32">
//     <circle cx="16" cy="16" r="16" fill="red"/>
//     <circle cx="16" cy="16" r="8" fill="white"/>
//   </svg>`,
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
// });

// const activeIcon = L.divIcon({
//   className: "custom-marker active",
//     html: `<svg width="36" height="36" viewBox="0 0 24 24">
//       <path fill="red" fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518Z" clip-rule="evenodd"/>
//       <circle cx="12" cy="10" r="4" fill="white"/>
//     </svg>`,
//   iconSize: [36, 36],
//   iconAnchor: [18, 36],
// });

// // ============================
// // Collect articles & create markers
// // ============================
// const articles = Array.from(document.querySelectorAll("article[data-lat][data-lng]"));
// const markers = [];

// articles.forEach((article) => {
//   const lat = parseFloat(article.dataset.lat);
//   const lng = parseFloat(article.dataset.lng);
//   if (isNaN(lat) || isNaN(lng)) return;

//   const marker = L.marker([lat, lng], {
//     icon: inactiveIcon,
//     title: article.querySelector("h2")?.textContent || "",
//   }).addTo(map);

//   markers.push(marker);
// });

// // ============================
// // Utility: Update active marker
// // ============================
// function updateMarkers(activeIndex) {
//   markers.forEach((marker, i) => {
//     const el = marker.getElement?.();
//     if (!el) return;
//     if (i === activeIndex) {
//       marker.setIcon(activeIcon);
//       el.style.filter = "drop-shadow(0 2px 6px rgba(0,0,0,0.3))";
//     } else {
//       marker.setIcon(inactiveIcon);
//       el.style.filter = "none";
//     }
//   });
// }

// // ============================
// // Utility: Debounce
// // ============================
// function debounce(func, wait = 100) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// // ============================
// // Map & slider sync helper
// // ============================
// let activeArticle = null;
// const ZOOM_LEVEL = window.innerWidth < 768 ? 17 : 15;

// function goToSlide(index) {
//   const article = articles[index];
//   if (!article) return;

//   const lat = parseFloat(article.dataset.lat);
//   const lng = parseFloat(article.dataset.lng);
//   if (isNaN(lat) || isNaN(lng)) return;

//   map.flyTo([lat, lng], ZOOM_LEVEL, { duration: 1 });
//   setTimeout(() => map.invalidateSize(), 300);

//   updateMarkers(index);
//   activeArticle = article;
// }

// // ============================
// // Initialize mobile slider
// // ============================
// const mobileSlider = new Splide("#mobile-slider", {
//   type: "loop",
//   perPage: 1,
//   gap: "1rem",
//   rewind: true,
//   arrows: false,
//   pagination: false,
//   drag: true,
//   snap: true,
//   autoWidth: true,
//   perMove: 1,
//   focus: 'center',
//   dragMinThreshold: { mouse: 20, touch: 20 }
// }).mount();

// // ============================
// // First-load sync for mobile (handles loop clones)
// // ============================
// mobileSlider.on("mounted", () => {
//   if (!articles.length) return;

//   // Get the index of the first real slide (ignores clones)
//   const firstRealIndex = mobileSlider.Components.Slides.getAt(0).index;

//   // Go to the first real slide
//   mobileSlider.go(firstRealIndex);

//   // Update marker and activeArticle
//   const article = articles[firstRealIndex];
//   activeArticle = article;
//   updateMarkers(firstRealIndex);

//   const lat = parseFloat(article.dataset.lat);
//   const lng = parseFloat(article.dataset.lng);
//   if (!isNaN(lat) && !isNaN(lng)) {
//     map.setView([lat, lng], ZOOM_LEVEL);
//     map.invalidateSize();
//   }
// });

// // Sync on slide move
// mobileSlider.on("move", () => {
//   goToSlide(mobileSlider.index);
// });

// // ============================
// // Desktop scroll handler
// // ============================
// function getCurrentArticle() {
//   const scrollMiddle = window.scrollY + window.innerHeight / 2;
//   return articles.find((article) => {
//     const rect = article.getBoundingClientRect();
//     const top = rect.top + window.scrollY;
//     const bottom = top + rect.height;
//     return scrollMiddle >= top && scrollMiddle < bottom;
//   }) || articles[0];
// }

// let scrollHandler = null;
// if (window.innerWidth >= 768) {
//   scrollHandler = debounce(() => {
//     const current = getCurrentArticle();
//     if (!current || current === activeArticle) return;

//     activeArticle = current;

//     const lat = parseFloat(current.dataset.lat);
//     const lng = parseFloat(current.dataset.lng);
//     if (isNaN(lat) || isNaN(lng)) return;

//     map.flyTo([lat, lng], ZOOM_LEVEL, { duration: 1 });

//     const index = articles.indexOf(current);
//     if (index !== -1) mobileSlider.go(index);

//     updateMarkers(index);
//   }, 100);

//   window.addEventListener("scroll", scrollHandler);
// }

// // ============================
// // Map interaction tweaks
// // ============================
// map.touchZoom.disable();
// map.scrollWheelZoom.disable();
// map.dragging.disable();
// map.keyboard.disable();

// // ============================
// // Resize handler
// // ============================
// const resizeHandler = () => map.invalidateSize();
// window.addEventListener("resize", resizeHandler);

// // ============================
// // Initial desktop map setup (for non-mobile)
// // ============================
// if (window.innerWidth >= 768 && articles.length) {
//   activeArticle = articles[0];
//   const lat = parseFloat(activeArticle.dataset.lat);
//   const lng = parseFloat(activeArticle.dataset.lng);
//   if (!isNaN(lat) && !isNaN(lng)) {
//     map.setView([lat, lng], ZOOM_LEVEL);
//     updateMarkers(0);
//   }
// }

// // ============================
// // Cleanup
// // ============================
// function cleanup() {
//   if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
//   window.removeEventListener("resize", resizeHandler);
//   mobileSlider.destroy();
//   map.remove();
// }

