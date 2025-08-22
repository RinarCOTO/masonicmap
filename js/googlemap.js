// ============================
// Initialize Google Map
// ============================
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.7671, lng: -122.4324 }, // Default to Swedish-American Hall
      zoom: 15,
      zoomControl: false,
      scrollwheel: false,
      disableDefaultUI: true,
      draggable: false,
      keyboardShortcuts: false,
      mapId: "YOUR_MAP_ID" // Replace with your Map ID from Google Cloud Console
    });
  
    // Load Advanced Markers library
    google.maps.importLibrary("marker").then(() => {
      // ============================
      // Marker icons (provided SVGs as data URLs)
      // ============================
      const inactiveIcon = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="red"/>
          <circle cx="16" cy="16" r="8" fill="white"/>
        </svg>`
      );
  
      const activeIcon = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        `<svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="red" fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518Z" clip-rule="evenodd"/>
          <circle cx="12" cy="10" r="4" fill="white"/>
        </svg>`
      );
  
      // ============================
      // Collect articles & create markers
      // ============================
      const articles = Array.from(document.querySelectorAll("article[data-lat][data-lng]"));
      const markers = [];
  
      articles.forEach((article, index) => {
        const lat = parseFloat(article.dataset.lat);
        const lng = parseFloat(article.dataset.lng);
        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`Invalid lat/lng for article ${article.id}`);
          return;
        }
  
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat, lng },
          map: map,
          title: article.querySelector("h2")?.textContent || `Marker ${index + 1}`,
          content: createMarkerElement(inactiveIcon),
          zIndex: 1
        });
  
        markers.push(marker);
      });
  
      // ============================
      // Utility: Create marker element
      // ============================
      function createMarkerElement(iconUrl) {
        const img = document.createElement("img");
        img.src = iconUrl;
        img.style.width = "36px";
        img.style.height = "36px";
        img.style.transform = "translateY(-50%)"; // Center vertically for pin shape
        img.style.transition = "transform 0.3s ease"; // Smooth scale animation
        img.onerror = () => {
          console.error(`Failed to load marker icon: ${iconUrl}`);
          img.src = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        };
        return img;
      }
  
      // ============================
      // Utility: Update active marker
      // ============================
      function updateMarkers(activeIndex) {
        markers.forEach((marker, i) => {
          marker.content.src = i === activeIndex ? activeIcon : inactiveIcon;
          marker.content.style.transform = i === activeIndex 
            ? "translateY(-50%) scale(1.2)" // Scale up active marker
            : "translateY(-50%) scale(1)"; // Reset inactive markers
          marker.zIndex = i === activeIndex ? 1000 : 1;
        });
      }
  
      // ============================
      // Utility: Debounce
      // ============================
      function debounce(func, wait = 100) {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      }
  
      // ============================
      // Map & slider sync helper
      // ============================
      let activeArticle = null;
      const BASE_ZOOM = 15;
      const ACTIVE_ZOOM = 19;
  
      function goToSlide(index) {
        const article = articles[index];
        if (!article) return;
  
        const lat = parseFloat(article.dataset.lat);
        const lng = parseFloat(article.dataset.lng);
        if (isNaN(lat) || isNaN(lng)) return;
  
        // Smoothly zoom out, pan, then zoom in
        map.setZoom(BASE_ZOOM);
        setTimeout(() => {
          map.panTo({ lat, lng }, { duration: 1000 }); // Smooth pan animation
          setTimeout(() => {
            map.setZoom(ACTIVE_ZOOM); // Zoom in on active location
          }, 600); // Delay zoom-in after pan
        }, 300); // Delay pan after zoom-out
  
        updateMarkers(index);
        activeArticle = article;
      }
  
      // ============================
      // Initialize mobile slider
      // ============================
      const mobileSlider = new Splide("#mobile-slider", {
        type: "loop",
        perPage: 1,
        gap: "1rem",
        rewind: true,
        arrows: false,
        pagination: false,
        drag: true,
        snap: true,
        autoWidth: true,
        perMove: 1,
        focus: "center",
        dragMinThreshold: { mouse: 20, touch: 20 },
      }).mount();
  
      // ============================
      // First-load sync for mobile
      // ============================
      mobileSlider.on("mounted", () => {
        if (!articles.length) return;
  
        const firstRealIndex = mobileSlider.Components.Slides.getAt(0).index;
        mobileSlider.go(firstRealIndex);
  
        const article = articles[firstRealIndex];
        activeArticle = article;
        updateMarkers(firstRealIndex);
  
        const lat = parseFloat(article.dataset.lat);
        const lng = parseFloat(article.dataset.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          map.setCenter({ lat, lng });
          map.setZoom(ACTIVE_ZOOM); // Start zoomed in on first location
        }
      });
  
      // Sync on slide move
      mobileSlider.on("move", () => {
        goToSlide(mobileSlider.index);
      });
  
      // ============================
      // Desktop scroll handler
      // ============================
      function getCurrentArticle() {
        const scrollMiddle = window.scrollY + window.innerHeight / 2;
        return (
          articles.find((article) => {
            const rect = article.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const bottom = top + rect.height;
            return scrollMiddle >= top && scrollMiddle < bottom;
          }) || articles[0]
        );
      }
  
      let scrollHandler = null;
      if (window.innerWidth >= 768) {
        scrollHandler = debounce(() => {
          const current = getCurrentArticle();
          if (!current || current === activeArticle) return;
  
          activeArticle = current;
  
          const lat = parseFloat(current.dataset.lat);
          const lng = parseFloat(current.dataset.lng);
          if (isNaN(lat) || isNaN(lng)) return;
  
          // Smoothly zoom out, pan, then zoom in
          map.setZoom(BASE_ZOOM);
          setTimeout(() => {
            map.panTo({ lat, lng }, { duration: 1000 });
            setTimeout(() => {
              map.setZoom(ACTIVE_ZOOM);
            }, 600);
          }, 300);
  
          const index = articles.indexOf(current);
          if (index !== -1) mobileSlider.go(index);
  
          updateMarkers(index);
        }, 100);
  
        window.addEventListener("scroll", scrollHandler);
      }
  
      // ============================
      // Initial desktop map setup
      // ============================
      if (window.innerWidth >= 768 && articles.length) {
        activeArticle = articles[0];
        const lat = parseFloat(activeArticle.dataset.lat);
        const lng = parseFloat(activeArticle.dataset.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          map.setCenter({ lat, lng });
          map.setZoom(ACTIVE_ZOOM); // Start zoomed in on first location
          updateMarkers(0);
        }
      }
  
      // ============================
      // Cleanup
      // ============================
      function cleanup() {
        if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
        window.removeEventListener("resize", resizeHandler);
        mobileSlider.destroy();
      }
  
      // ============================
      // Resize handler
      // ============================
      const resizeHandler = () => {
        google.maps.event.trigger(map, "resize");
      };
      window.addEventListener("resize", resizeHandler);
    }).catch((error) => {
      console.error("Failed to load Google Maps marker library:", error);
    });
  }
// Load Google Maps API asynchronously
function loadGoogleMaps() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD8sfnKfBzTX8OUygi8cKT0gms8Xn3CrVA&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

loadGoogleMaps();