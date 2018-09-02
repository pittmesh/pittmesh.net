// CONFIGURATION
var Pittmesh = {
  // TWEAKABLES
  map: {
    center: [40.4602259, -79.9779362], // slightly north of downtown, enought to have a paragraph above it
    height: 12, // enough to show eastern side of airport to west side of murraysville
  },

  colors: {
    markers: {
      live: '#08a400',
      vpn: '#0080ff',
      planned: '#F57F18',
    }

  },

  // MAYBE DON'T TOUCH
  backoffMultiplier: 0,

  baseNodeMarkerOptions: {
    radius: 3,
    fillColor: "#000",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
  },

  loadedNodes: {},
  mapObject: null,
}

function setupMap() {
  if (L == undefined) {
    console.log("Leaflet hasn't loaded yet, delaying startup…")
    setTimeout(setupMap, 1000 * Pittmesh.backoffMultiplier++)
  }

  var map = L.map('map').fitWorld();

  var tileLayer = new L.StamenTileLayer("terrain");
  map.addLayer(tileLayer);
  map.setView(Pittmesh.map.center, Pittmesh.map.height);

  return Promise.resolve(map);
}

function determineColorForFeature(feature) {
  switch (feature.properties.status) {
    case 'live':
      return {
        color: Pittmesh.colors.markers.live,
        fillColor: Pittmesh.colors.markers.live
      };
    case 'vpn':
      return {
        color: Pittmesh.colors.markers.vpn,
        fillColor: Pittmesh.colors.markers.vpn
      };
    case 'planned':
      return {
        color: Pittmesh.colors.markers.planned,
        fillColor: Pittmesh.colors.markers.planned
      };
  }
}

function determineColorForMarker(feature, latlng) {
  var colorJson = determineColorForFeature(feature)
  return L.circleMarker(latlng, extend(Pittmesh.baseNodeMarkerOptions,
    colorJson));
}

function attachPopup(featureAndLayer) {
  var feature = featureAndLayer.feature;
  if (feature.properties && feature.properties.address) {
    var popupContent =
      "<b>Name:</b> " + feature.properties.name + "<br/>" +
      "<b>Address:</b> " + feature.properties.address + "<br/>" +
      "<b>Neighborhood:</b> " + feature.properties.hood + "<br/>" +
      "<b>Device Count:</b> " + feature.properties.device_count + "<br/>"
    featureAndLayer.layer.bindPopup(popupContent, {
      className: "node node-" + feature.properties.status
    });
  }
  return featureAndLayer;
}

function recordNode(featureAndLayer) {
  var feature = featureAndLayer.feature;
  Pittmesh.loadedNodes[feature.id] = feature;
  return featureAndLayer;
}

function setupNodeFeature(feature, layer) {
  return Promise.resolve({
      feature: feature,
      layer: layer
    })
    .then(attachPopup)
    .then(recordNode);
}

// https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
function extend(obj, src) {
  Object.keys(src).forEach(function(key) {
    obj[key] = src[key];
  });
  return obj;
}

function putLinkOnMap(item, map) {
  var from = Pittmesh.loadedNodes[item.from];
  if (from == undefined) {
    console.log("Cannot find 'from' endpoint [" + item.from + "] for " + JSON.stringify(
      item))
    return;
  }
  var to = Pittmesh.loadedNodes[item.to];
  if (to == undefined) {
    console.log("Cannot find 'to' endpoint [" + item.to + "] for " + JSON.stringify(
      item))
    return;
  }
  var line = [
    new L.latLng(from.geometry.coordinates),
    new L.latLng(to.geometry.coordinates)
  ];
  console.log("Drawing line " + line);
  var polyline = L.polyline(line, {
      color: '#000'
    })
    .addTo(map);
  map.fitBounds(polyline.getBounds());
}

function loadNodes(map) {
  return fetch("nodes.geojson")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      L.geoJSON(json, {
        // for lines
        // style: determineColorForFeature,
        // for points
        pointToLayer: determineColorForMarker,
        onEachFeature: setupNodeFeature,
      }).addTo(map);
      console.log(JSON.stringify(json));
    }).then(function() {
      return map;
    });
}

function loadLinks(map) {
  return fetch("node-data/links.json")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      json.forEach(function(item, index, array) {
        putLinkOnMap(item, map);
      });
    }).then(function() {
      return map;
    });
}

function persistMap(map) {
  Pittmesh.mapObject = map
}

function loadIt() {
  setupMap()
    .then(loadNodes)
    .then(loadLinks)
    .then(persistMap)
}


window.addEventListener('load', loadIt, false);
