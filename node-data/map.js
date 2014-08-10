$(function(){
  var layer = new MM.StamenTileLayer("terrain");
  var map = new MM.Map("map", layer);
  map.setCenterZoom(new MM.Location(40.4536, -79.9374), 12);

  markersLayer = new MM.MarkerLayer();
  map.addLayer(markersLayer);

  window.onLoadMarkers = function(markers){
    for (var index in markers) {
      marker = markers[index];

      var loc = new MM.Location(marker.lat, marker.lon);

      var tag = document.createElement("a");
      tag.setAttribute("class","node");
      tag.setAttribute("title", marker.name + " at " + loc);

      var img = tag.appendChild(document.createElement("img"));
      img.setAttribute("src","/node-data/map_pin.png");
      img.setAttribute("alt","map point");

      console.log("Adding marker ["+marker.name+":"+ marker.lat +","+ marker.lon + "] at " + loc + " with HTML " + tag);
      markersLayer.addMarker(tag, loc);
    }
    $("#number").text(markers.length);
  }

  var script = document.createElement("script");
  script.src = "/node-data/nodes.json";
  document.getElementsByTagName("head")[0].appendChild(script);
});
