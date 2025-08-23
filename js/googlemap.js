// Initialize Google Map
function initMap() {
    const isMobile = window.innerWidth < 768;
    const BASE_ZOOM = isMobile ? 13 : 13;
    const ACTIVE_ZOOM = isMobile ? 17 : 19;
  
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.76686, lng: -122.43144 }, // Default to Swedish American Hall
      zoom: BASE_ZOOM,
      zoomControl: false,
      scrollwheel: false,
      disableDefaultUI: true,
      draggable: false,
      keyboardShortcuts: false,
      mapId: "9d2b267eea7aa96a6a90161f"
    });
  
    // Load Advanced Markers library
    google.maps.importLibrary("marker").then(() => {
      // Marker icons (SVGs as data URLs)
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
  
      // Collect articles & create markers
      const articles = Array.from(document.querySelectorAll("article[data-lat][data-lng]"));
      const markers = [];
  
      articles.forEach((article, index) => {
        const lat = parseFloat(article.dataset.lat);
        const lng = parseFloat(article.dataset.lng);
        if (isNaN(lat) || isNaN(lng)) return;
  
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat, lng },
          map: map,
          title: article.querySelector("h2")?.textContent || `Marker ${index + 1}`,
          content: createMarkerElement(inactiveIcon),
          zIndex: 1
        });
  
        markers.push(marker);
      });
  
      // Utility: Create marker element
      function createMarkerElement(iconUrl) {
        const img = document.createElement("img");
        img.src = iconUrl;
        img.style.width = "36px";
        img.style.height = "36px";
        img.style.transform = "translateY(-50%)";
        img.style.transition = "transform 0.5s ease-in-out";
        img.onerror = () => {
          img.src = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        };
        return img;
      }
  
      // Utility: Update active marker
      const debouncedUpdateMarkers = debounce((activeIndex) => {
        markers.forEach((marker, i) => {
          marker.content.src = i === activeIndex ? activeIcon : inactiveIcon;
          marker.content.style.transform = i === activeIndex 
            ? "translateY(-50%) scale(1.2)"
            : "translateY(-50%) scale(1)";
          marker.zIndex = i === activeIndex ? 1000 : 1;
        });
      }, 200);
  
      // Utility: Debounce
      function debounce(func, wait = 100) {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      }
  
      // Utility: Smooth animation for pan and zoom with device-specific zoom levels
      const debouncedAnimateMapTransition = debounce((targetLat, targetLng, targetZoom, duration = 1200) => {
        const startCenter = map.getCenter();
        const startLat = startCenter.lat();
        const startLng = startCenter.lng();
        const startZoom = map.getZoom();
        const startTime = performance.now();
        const midZoom = isMobile ? 13 : 15; // Device-specific zoom-out level
  
        function lerp(start, end, t) {
          return start + (end - start) * t;
        }
  
        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }
  
        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1);
          const easedT = easeInOutQuad(t);
  
          const currentLat = lerp(startLat, targetLat, easedT);
          const currentLng = lerp(startLng, targetLng, easedT);
          const currentZoom = lerp(startZoom, targetZoom, easedT);
  
          map.setCenter({ lat: currentLat, lng: currentLng });
          map.setZoom(currentZoom);
  
          if (t < 1) {
            requestAnimationFrame(step);
          }
        }
  
        requestAnimationFrame(step);
      }, 200);
  
      // Utility: Reattach More Info button listeners
      function attachMoreInfoListeners() {
        const buttons = document.querySelectorAll(".more-info-btn");
        const detailOverlay = document.getElementById("detailOverlay");
        const detailContent = document.getElementById("detailContent");
        const closeButton = document.getElementById("closeDetailOverlay");
  
        buttons.forEach((button, index) => {
          const newButton = document.createElement("button");
          newButton.innerHTML = button.innerHTML;
          Array.from(button.attributes).forEach(attr => {
            newButton.setAttribute(attr.name, attr.value);
          });
          button.parentNode.replaceChild(newButton, button);
          newButton.addEventListener("click", () => {
            const slide = newButton.closest(".splide__slide");
            const detailView = slide.querySelector(".detail-view");
            if (detailView && detailContent && detailOverlay) {
              detailContent.innerHTML = detailView.innerHTML;
              detailOverlay.classList.remove("hidden");
            }
          });
        });
  
        if (closeButton && detailOverlay) {
          closeButton.removeEventListener("click", closeOverlayHandler);
          closeButton.addEventListener("click", closeOverlayHandler);
          function closeOverlayHandler() {
            detailOverlay.classList.add("hidden");
            detailContent.innerHTML = "";
          }
        }
      }
  
      // Map & slider sync helper
      let activeArticle = null;
  
      function goToSlide(index) {
        const article = articles[index];
        if (!article) return;
  
        const lat = parseFloat(article.dataset.lat);
        const lng = parseFloat(article.dataset.lng);
        if (isNaN(lat) || isNaN(lng)) return;
  
        debouncedAnimateMapTransition(lat, lng, ACTIVE_ZOOM, 1200);
        debouncedUpdateMarkers(index);
        activeArticle = article;
      }
  
      // Initialize mobile slider
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
        start: 0
      });
  
      // First-load sync for mobile
      mobileSlider.on("mounted", () => {
        if (!articles.length) return;
        const firstRealIndex = 0;
        mobileSlider.go(firstRealIndex);
        setTimeout(() => {
          goToSlide(firstRealIndex);
          attachMoreInfoListeners();
        }, 100);
      });
  
      mobileSlider.on("move", debounce((newIndex) => {
        goToSlide(newIndex);
        attachMoreInfoListeners();
      }, 200));
  
      mobileSlider.mount();
  
      // Desktop scroll handler
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
  
          debouncedAnimateMapTransition(lat, lng, ACTIVE_ZOOM, 1200);
          const index = articles.indexOf(current);
          if (index !== -1) mobileSlider.go(index);
  
          debouncedUpdateMarkers(index);
          attachMoreInfoListeners();
        }, 100);
  
        window.addEventListener("scroll", scrollHandler);
      }
  
      // Initial desktop map setup
      if (window.innerWidth >= 768 && articles.length) {
        activeArticle = articles[0];
        const lat = parseFloat(activeArticle.dataset.lat);
        const lng = parseFloat(activeArticle.dataset.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          map.setCenter({ lat, lng });
          map.setZoom(ACTIVE_ZOOM);
          debouncedUpdateMarkers(0);
          attachMoreInfoListeners();
        }
      }
  
      // Cleanup
      function cleanup() {
        if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
        window.removeEventListener("resize", resizeHandler);
        mobileSlider.destroy();
      }
  
      // Resize handler
      const resizeHandler = () => {
        google.maps.event.trigger(map, "resize");
      };
      window.addEventListener("resize", resizeHandler);
    });
  }
  
  // Load Google Maps API asynchronously
  function loadGoogleMaps() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD8sfnKfBzTX8OUygi8cKT0gms8Xn3CrVA&callback=initMap&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
  
  loadGoogleMaps();