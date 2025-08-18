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
// ============================
// Map setup
// ============================
const map = L.map("map", {
    center: [37.7671, -122.4324],
    zoom: 15,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false
  });
  
  // Apple-style light tiles
  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
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
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="red" fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518Z" clip-rule="evenodd"/>
            <circle cx="12" cy="10" r="3" fill="white"/>
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
  