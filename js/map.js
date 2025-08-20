  
// ============================
// Initialize Leaflet Map
// ============================
const map = L.map("map", {
    center: [37.7671, -122.4324],
    zoom: 19,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false,
    
  });
  
  // Apple-style light tiles
  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}`, {
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoicmluYXJza2kiLCJhIjoiY21laG0zdGl5MDV5cDJtb2g4d2lxajZreCJ9.jEW1tOkw2P8WcvH2CrmDAA"
  }).addTo(map);
  
  // ============================
  // Create markers
  // ============================
  const articles = document.querySelectorAll("article[data-lat][data-lng]");
  const markers = [];
  
  articles.forEach(article => {
    const lat = parseFloat(article.dataset.lat);
    const lng = parseFloat(article.dataset.lng);
  
    const marker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: "custom-marker",
        html: `
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="red"/>
            <circle cx="16" cy="16" r="8" fill="white"/>
          </svg>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      }),
      title: article.querySelector("h2")?.textContent || ""
    }).addTo(map);
  
    markers.push(marker);
  });
  
  // ============================
  // Helper: Get current article in viewport
  // ============================
  function getCurrentArticle() {
    const scrollMiddle = window.scrollY + window.innerHeight / 2;
    return Array.from(articles).find(article => {
      const rect = article.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      return scrollMiddle >= top && scrollMiddle < bottom;
    }) || articles[0];
  }
  
  // ============================
  // Scroll handler: update map & markers
  // ============================
  let activeArticle = null;
  
  window.addEventListener("scroll", () => {
    const current = getCurrentArticle();
    if (current === activeArticle) return;
  
    activeArticle = current;
  
    const lat = parseFloat(current.dataset.lat);
    const lng = parseFloat(current.dataset.lng);
  
    // Smooth fly to active location
    map.flyTo([lat, lng], 15, { duration: 1 });
  
    // Update markers
    markers.forEach((marker, i) => {
      const markerEl = marker.getElement();
      if (!markerEl) return;
  
      if (articles[i] === current) {
        // Active marker: use full pin SVG
        markerEl.innerHTML = `
<svg width="60" height="50" viewBox="0 0 24 24">
        <path fill="red" fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518Z" clip-rule="evenodd"/>
        <circle cx="12" cy="10" r="4" fill="white"/>
      </svg>
        `;
        markerEl.classList.add("active"); // optional pulse animation
      } else {
        // Inactive marker: red circle with white center
        markerEl.innerHTML = `
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="red"/>
            <circle cx="16" cy="16" r="8" fill="white"/>
          </svg>
        `;
        markerEl.classList.remove("active");
      }
    });
  });
  // ============================
// Mobile slider + map sync
// ============================

// Initialize Splide
const mobileSlider = new Splide("#mobile-slider", {
    type: 'loop',
    perPage: 1,
    gap: "1rem",
    pagination: false,
    arrows: true,
  }).mount();
  
  // Listen to slide change
  mobileSlider.on("move", (newIndex) => {
    const article = articles[newIndex];
    const lat = parseFloat(article.dataset.lat);
    const lng = parseFloat(article.dataset.lng);
  
    // Fly map to the new location
    map.flyTo([lat, lng], 17, { duration: 1 });
  
    // Highlight active marker
    markers.forEach((marker, i) => {
      const markerEl = marker.getElement();
      if (!markerEl) return;
  
      if (i === newIndex) {
        markerEl.innerHTML = `
          <svg width="36" height="36" viewBox="0 0 24 24">
            <path fill="red" fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518Z" clip-rule="evenodd"/>
            <circle cx="12" cy="10" r="4" fill="white"/>
          </svg>
        `;
        markerEl.style.filter = "drop-shadow(0 2px 6px rgba(0,0,0,0.3))";
      } else {
        markerEl.innerHTML = `
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="red"/>
            <circle cx="16" cy="16" r="8" fill="white"/>
          </svg>
        `;
        markerEl.style.filter = "none";
      }
    });
  });
  
map.touchZoom.disable();
map.scrollWheelZoom.disable();
map.doubleClickZoom.disable();
map.keyboard.disable();