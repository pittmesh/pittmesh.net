$(function(){
  var layer = new MM.StamenTileLayer("terrain");
  var map = new MM.Map("map", layer);
  map.setCenterZoom(new MM.Location(40.4332259, -79.9779362), 12);

  markersLayer = new MM.MarkerLayer();
  map.addLayer(markersLayer);

  window.onLoadMarkers = function(markers){
    var liveMarkers = 0;
    var plannedMarkers = 0;
    for (var index in markers) {
      marker = markers[index];

      switch(marker.status){
          case "live":
            var loc = new MM.Location(marker.lat, marker.lon);

            var tag = document.createElement("a");
            tag.setAttribute("class","node");
            var address = marker.address.length > 0 ? (" [" + marker.address + "]") : ""
            tag.setAttribute("title", marker.name + address + " at " + loc);

            var img = tag.appendChild(document.createElement("img"));
            img.setAttribute("src","/node-data/map_pin.png");
            img.setAttribute("alt","map point");

            console.log("Adding marker ["+marker.name+":"+ marker.lat +","+ marker.lon + "] at " + loc + " with HTML " + tag);
            markersLayer.addMarker(tag, loc);
            liveMarkers++;
            break;
          case "planned":
            plannedMarkers++;
            break;
      }
    }
    $("#live").text(liveMarkers);

    if(plannedMarkers > 0) {
      $("#planned").text("There " + (plannedMarkers == 1 ? "is " : "are ") + plannedMarkers + " planned for deployment.")
    }
  }

  var script = document.createElement("script");
  script.src = "/node-data/nodes.json";
  document.getElementsByTagName("head")[0].appendChild(script);
});
