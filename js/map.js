// window.initMap = function () {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 34.052235, lng: -118.243683 }, // Los Angeles 
//       zoom: 10,
//       styles: [
//         {
//             "featureType": "all",
//             "elementType": "geometry.fill",
//             "stylers": [{ "visibility": "on" }]
//         },
//         {
//             "featureType": "administrative",
//             "elementType": "all",
//             "stylers": [{ "color": "#f2f2f2" }]
//         },
//         {
//             "featureType": "administrative",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 { "color": "#686868" },
//                 { "visibility": "on" }
//             ]
//         },
//         {
//             "featureType": "landscape",
//             "elementType": "all",
//             "stylers": [{ "color": "#f2f2f2" }]
//         },
//         {
//             "featureType": "poi",
//             "elementType": "all",
//             "stylers": [{ "visibility": "off" }]
//         },
//         {
//             "featureType": "poi.park",
//             "elementType": "all",
//             "stylers": [{ "visibility": "on" }]
//         },
//         {
//             "featureType": "poi.park",
//             "elementType": "labels.icon",
//             "stylers": [{ "visibility": "off" }]
//         },
//         {
//             "featureType": "road",
//             "elementType": "all",
//             "stylers": [
//                 { "saturation": -100 },
//                 { "lightness": 45 }
//             ]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "all",
//             "stylers": [{ "visibility": "simplified" }]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 { "lightness": "-22" },
//                 { "visibility": "on" },
//                 { "color": "#b4b4b4" }
//             ]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "geometry.stroke",
//             "stylers": [
//                 { "saturation": "-51" },
//                 { "lightness": "11" }
//             ]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "labels.text",
//             "stylers": [
//                 { "saturation": "3" },
//                 { "lightness": "-56" },
//                 { "visibility": "simplified" }
//             ]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 { "lightness": "-52" },
//                 { "color": "#9094a0" },
//                 { "visibility": "simplified" }
//             ]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "labels.text.stroke",
//             "stylers": [{ "weight": "6.13" }]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "labels.icon",
//             "stylers": [
//                 { "weight": "1.24" },
//                 { "saturation": "-100" },
//                 { "lightness": "-10" },
//                 { "gamma": "0.94" },
//                 { "visibility": "off" }
//             ]
//         },
//         {
//             "featureType": "road.highway.controlled_access",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 { "visibility": "on" },
//                 { "color": "#b4b4b4" },
//                 { "weight": "5.40" },
//                 { "lightness": "7" }
//             ]
//         },
//         {
//             "featureType": "road.highway.controlled_access",
//             "elementType": "labels.text",
//             "stylers": [
//                 { "visibility": "simplified" },
//                 { "color": "#231f1f" }
//             ]
//         },
//         {
//             "featureType": "road.highway.controlled_access",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 { "visibility": "simplified" },
//                 { "color": "#595151" }
//             ]
//         },
//         {
//             "featureType": "road.arterial",
//             "elementType": "geometry",
//             "stylers": [{ "lightness": "-16" }]
//         },
//         {
//             "featureType": "road.arterial",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 { "visibility": "on" },
//                 { "color": "#d7d7d7" }
//             ]
//         },
//         {
//             "featureType": "road.arterial",
//             "elementType": "labels.text",
//             "stylers": [
//                 { "color": "#282626" },
//                 { "visibility": "simplified" }
//             ]
//         },
//         {
//             "featureType": "road.arterial",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 { "saturation": "-41" },
//                 { "lightness": "-41" },
//                 { "color": "#2a4592" },
//                 { "visibility": "simplified" }
//             ]
//         },
//         {
//             "featureType": "road.arterial",
//             "elementType": "labels.text.stroke",
//             "stylers": [
//                 { "weight": "1.10" },
//                 { "color": "#ffffff" }
//             ]
//         },
//         {
//             "featureType": "road.arterial",
//             "elementType": "labels.icon",
//             "stylers": [{ "visibility": "on" }]
//         },
//         {
//             "featureType": "road.local",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 { "lightness": "-16" },
//                 { "weight": "0.72" }
//             ]
//         },
//         {
//             "featureType": "road.local",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 { "lightness": "-37" },
//                 { "color": "#2a4592" }
//             ]
//         },
//         {
//             "featureType": "transit",
//             "elementType": "all",
//             "stylers": [{ "visibility": "off" }]
//         },
//         {
//             "featureType": "water",
//             "elementType": "all",
//             "stylers": [
//                 { "color": "#b7e4f4" },
//                 { "visibility": "on" }
//             ]
//         }
//       ],
//       mapId: '88f08f9e0953138d8e76a4b9',
//       disableDefaultUI: true,
//       zoomControl: false,
//       mapTypeControl: false,
//       streetViewControl: false,
//       fullscreenControl: false,
//       scrollwheel: false
//     });
//     const markerContent = document.createElement("div");
//     markerContent.className = "custom-marker";
//     markerContent.innerHTML = `
//       <svg width="24" height="24" viewBox="0 0 24 24">
//         <path d="M12 0C7.58 0 4 3.58 4 8c0 3.51 5 11.99 7.15 15.52a1 1 0 0 0 1.7 0C15 20 20 11.51 20 8c0-4.42-3.58-8-8-8zM12 11.5A3.5 3.5 0 1 1 15.5 8 3.5 3.5 0 0 1 12 11.5z" fill="red"/>
//       </svg>
//     `;
    
//     const SwedishHallMarker = new google.maps.marker.AdvancedMarkerElement({
//         map: map,
//         position: { lat: 37.7671, lng: -122.4324 },
//         title: "Swedish American Hall",
//         content: markerContent
//     });
    
//   };
  
// //   window.initMap = initMap;
  
// ============================
// Initialize Leaflet Map
// ============================
const map = L.map("map", {
    center: [37.7671, -122.4324], // Initial center coordinates
    zoom: 13,
    zoomControl: false,            // Disable default zoom controls
    scrollWheelZoom: false,        // Disable scroll-to-zoom
    attributionControl: false      // Remove attribution for cleaner look
  });
  
  // ============================
  // Add Light Gray Tile Layer
  // (similar to previous Google Maps style)
  // ============================
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(map);
  
  // ============================
  // Create markers for each article
  // ============================
  const articles = document.querySelectorAll("article[data-lat][data-lng]");
  const markers = [];
  
  articles.forEach(article => {
    const lat = parseFloat(article.dataset.lat);
    const lng = parseFloat(article.dataset.lng);
  
    // Create a custom HTML marker using Leaflet's divIcon
    const marker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: "custom-marker",
        html: `
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0C7.58 0 4 3.58 4 8c0 3.51 5 11.99 7.15 15.52a1 1 0 0 0 1.7 0C15 20 20 11.51 20 8c0-4.42-3.58-8-8-8zM12 11.5A3.5 3.5 0 1 1 15.5 8 3.5 3.5 0 0 1 12 11.5z" fill="red"/>
          </svg>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24] // Anchor at bottom center of marker
      }),
      title: article.querySelector("h2")?.textContent || ""
    }).addTo(map);
  
    markers.push(marker);
  });
  
  // ============================
  // Helper: Get article currently in viewport center
  // ============================
  function getCurrentArticle() {
    const scrollMiddle = window.scrollY + window.innerHeight / 2;
    return Array.from(articles).find(article => {
      const rect = article.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      return scrollMiddle >= top && scrollMiddle < bottom;
    }) || articles[0]; // Default to first article if none found
  }
  
  // ============================
  // Scroll handler: update map only when active article changes
  // ============================
  let activeArticle = null;
  
  window.addEventListener("scroll", () => {
    const current = getCurrentArticle();
    if (current === activeArticle) return; // Skip if same article
  
    activeArticle = current;
  
    const lat = parseFloat(current.dataset.lat);
    const lng = parseFloat(current.dataset.lng);
  
    // Smoothly fly to the new location
    map.flyTo([lat, lng], 17, { duration: 1 });
  
    // Highlight the active marker
    markers.forEach((marker, i) => {
      const markerEl = marker.getElement();
      if (markerEl) {
        if (articles[i] === current) markerEl.classList.add("active");
        else markerEl.classList.remove("active");
      }
    });
  });
  
  