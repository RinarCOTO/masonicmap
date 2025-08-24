// Dependency checks
if (typeof Splide === "undefined") throw new Error("Splide is required.");

// Initialize Google Map
function initMap() {
  console.log("initMap called");

  // Function to get zoom levels
  function getZoomLevels() {
    return {
      BASE_ZOOM: 14, 
      ACTIVE_ZOOM: 20, 
    };
  }

  let { BASE_ZOOM, ACTIVE_ZOOM } = getZoomLevels();

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.76686, lng: -122.43144 },
    zoom: BASE_ZOOM,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER 
      },
    scrollwheel: false,
    disableDefaultUI: true,
    draggable: false,
    keyboardShortcuts: false,
    draggable: true, 
    disableDoubleClickZoom: false,
    mapId: "9d2b267eea7aa96a6a90161f",
  });

  // Load Advanced Markers library
  google.maps.importLibrary("marker").then(() => {
    console.log("Marker library loaded");
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
    console.log("Articles found:", articles.length);
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
        zIndex: 1,
      });

      markers.push(marker);
    });
    console.log("Markers created:", markers.length);

    // Utility: Create marker element
    function createMarkerElement(iconUrl) {
      const img = document.createElement("img");
      img.src = iconUrl;
      img.style.width = "36px";
      img.style.height = "36px";
      img.style.transform = "translateY(-50%)";
      img.style.transition = "transform 0.5s ease-in-out";
      img.onerror = () => {
        console.error(`Failed to load marker icon: ${iconUrl}`);
        img.src = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
      };
      return img;
    }

    // Utility: Update active marker
    const debouncedUpdateMarkers = debounce((activeIndex) => {
      console.log("debouncedUpdateMarkers called with index:", activeIndex);
      markers.forEach((marker, i) => {
        marker.content.src = i === activeIndex ? activeIcon : inactiveIcon;
        marker.content.style.transform =
          i === activeIndex ? "translateY(-50%) scale(1.2)" : "translateY(-50%) scale(1)";
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

    // Utility: Smooth zoom animation (no panning)
    const debouncedAnimateMapTransition = debounce((targetLat, targetLng, targetZoom, duration = 1200) => {
      console.log("debouncedAnimateMapTransition called:", { targetLat, targetLng, targetZoom });

      // Instantly set the map center (no panning)
      map.setCenter({ lat: targetLat, lng: targetLng });

      // Step 1: Instantly set zoom to 13 (BASE_ZOOM for transition)
      map.setZoom(13);

      // Step 2: Animate zoom from 13 to targetZoom (19)
      const startZoom = 13;
      const startTime = performance.now();

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

        const currentZoom = lerp(startZoom, targetZoom, easedT);
        map.setZoom(currentZoom);

        if (t < 1) {
          requestAnimationFrame(step);
        }
      }

      // Delay zoom-in to show zoom-out briefly
      setTimeout(() => {
        requestAnimationFrame(step);
      }, 100);
    }, 200);

    // Utility: Reattach More Info button listeners
    function attachMoreInfoListeners() {
      console.log("Attaching More Info button listeners");
      const buttons = document.querySelectorAll(".more-info-btn");
      const detailOverlay = document.getElementById("detailOverlay");
      const detailContent = document.getElementById("detailContent");
      const closeButton = document.getElementById("closeDetailOverlay");

      buttons.forEach((button, index) => {
        const newButton = document.createElement("button");
        newButton.innerHTML = button.innerHTML;
        Array.from(button.attributes).forEach((attr) => {
          newButton.setAttribute(attr.name, attr.value);
        });
        button.parentNode.replaceChild(newButton, button);
        newButton.addEventListener("click", () => {
          console.log(`More Info button clicked for slide ${index + 1}`);
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
          console.log("Close overlay clicked");
          detailOverlay.classList.add("hidden");
          detailContent.innerHTML = "";
        }
      }

      console.log("More Info buttons attached:", buttons.length);
    }

    // Map & slider sync helper
    let activeArticle = null;

    function goToSlide(index) {
      console.log("goToSlide called with index:", index);
      const article = articles[index];
      if (!article) {
        console.warn("No article found for index:", index);
        return;
      }

      const lat = parseFloat(article.dataset.lat);
      const lng = parseFloat(article.dataset.lng);
      if (isNaN(lat) || isNaN(lng)) {
        console.warn("Invalid lat/lng for article:", article);
        return;
      }

      const { ACTIVE_ZOOM } = getZoomLevels();
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
      start: 0,
    });

    // Check URL hash on page load
    const hash = window.location.hash;
    let initialIndex = 0;
    if (hash) {
      const targetArticle = articles.find((article) => `#${article.id}` === hash);
      if (targetArticle) {
        initialIndex = articles.indexOf(targetArticle);
        console.log("Hash found, setting initial index to:", initialIndex);
      }
    }

    // First-load sync for mobile
    mobileSlider.on("mounted", () => {
      console.log("Splide mounted, articles:", articles.length);
      if (!articles.length) {
        console.warn("No articles found for slider");
        return;
      }

      console.log("Setting first slide to index:", initialIndex);
      mobileSlider.go(initialIndex);
      setTimeout(() => {
        goToSlide(initialIndex);
        attachMoreInfoListeners();
      }, 100);
    });

    mobileSlider.on("move", debounce((newIndex) => {
      console.log("Splide move event, new index:", newIndex);
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
      console.log("Desktop mode detected");
      scrollHandler = debounce(() => {
        const current = getCurrentArticle();
        if (!current || current === activeArticle) return;

        activeArticle = current;

        const lat = parseFloat(current.dataset.lat);
        const lng = parseFloat(current.dataset.lng);
        if (isNaN(lat) || isNaN(lng)) {
          console.warn("Invalid lat/lng for desktop scroll:", current);
          return;
        }

        const { ACTIVE_ZOOM } = getZoomLevels();
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
      console.log("Initializing desktop map setup");
      activeArticle = articles[initialIndex];
      const lat = parseFloat(activeArticle.dataset.lat);
      const lng = parseFloat(activeArticle.dataset.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        map.setCenter({ lat, lng });
        map.setZoom(19); // Set initial zoom to 19
        debouncedUpdateMarkers(initialIndex);
        attachMoreInfoListeners();
      }
    }

    // Resize handler
    const resizeHandler = debounce(() => {
      console.log("Window resized, updating map");
      google.maps.event.trigger(map, "resize");

      // Update zoom levels
      const newZoomLevels = getZoomLevels();
      BASE_ZOOM = newZoomLevels.BASE_ZOOM;
      ACTIVE_ZOOM = newZoomLevels.ACTIVE_ZOOM;

      // Adjust map zoom based on current state
      if (activeArticle) {
        const lat = parseFloat(activeArticle.dataset.lat);
        const lng = parseFloat(activeArticle.dataset.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          map.setCenter({ lat, lng });
          map.setZoom(ACTIVE_ZOOM);
        }
      } else {
        map.setZoom(BASE_ZOOM);
      }

      // Update scroll handler for desktop/mobile switch
      if (window.innerWidth >= 768 && !scrollHandler) {
        console.log("Switching to desktop mode");
        scrollHandler = debounce(() => {
          const current = getCurrentArticle();
          if (!current || current === activeArticle) return;

          activeArticle = current;

          const lat = parseFloat(current.dataset.lat);
          const lng = parseFloat(current.dataset.lng);
          if (isNaN(lat) || isNaN(lng)) {
            console.warn("Invalid lat/lng for desktop scroll:", current);
            return;
          }

          const { ACTIVE_ZOOM } = getZoomLevels();
          debouncedAnimateMapTransition(lat, lng, ACTIVE_ZOOM, 1200);
          const index = articles.indexOf(current);
          if (index !== -1) mobileSlider.go(index);

          debouncedUpdateMarkers(index);
          attachMoreInfoListeners();
        }, 100);

        window.addEventListener("scroll", scrollHandler);
      } else if (window.innerWidth < 768 && scrollHandler) {
        console.log("Switching to mobile mode");
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    }, 200);

    window.addEventListener("resize", resizeHandler);

    // Cleanup
    function cleanup() {
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", resizeHandler);
      mobileSlider.destroy();
    }
  }).catch((error) => {
    console.error("Failed to load Google Maps marker library:", error);
  });
}

// Load Google Maps API asynchronously
function loadGoogleMaps() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD8sfnKfBzTX8OUygi8cKT0gms8Xn3CrVA&callback=initMap&libraries=marker&loading=async`;
  script.async = true;
  script.defer = true;
  script.onerror = () => console.error("Failed to load Google Maps API");
  document.head.appendChild(script);
}

loadGoogleMaps();