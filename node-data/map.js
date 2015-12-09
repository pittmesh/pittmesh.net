$(function(){
  var layer = new MM.StamenTileLayer("terrain");
  var map = new MM.Map("map", layer);
  map.setCenterZoom(new MM.Location(40.4602259, -79.9779362), 12);

  markersLayer = new MM.MarkerLayer();
  map.addLayer(markersLayer);

  var buildMarkerPin = function(imageFile) {
    var img = document.createElement("img");
    img.setAttribute("src", imageFile);
    img.setAttribute("alt", "map point");
    return img;
  }

  var liveMarkerPin = function() {
    return buildMarkerPin("/node-data/map-pin-live.svg");
  }
  var plannedMarkerPin = function() {
    return buildMarkerPin("/node-data/map-pin-planned.svg");
  }

  var pinImgFor = function(marker) {
    switch(marker.status){
      case "live": return liveMarkerPin();
      case "planned": return plannedMarkerPin();
    }
  }

  var handleMarker = function(marker){
    var loc = new MM.Location(marker.lat, marker.lon);

    var tag = document.createElement("a");
    tag.setAttribute("class","node");
    var address = marker.address.length > 0 ? (" [" + marker.address + "]") : ""
    tag.setAttribute("title", marker.name + address + " at " + loc);

    var pinImg = pinImgFor(marker);
    tag.appendChild(pinImg);

    console.log("Adding marker ["+marker.name+":"+ marker.lat +","+ marker.lon + "] at " + loc + " with HTML " + tag);

    return { tag: tag, loc: loc }
  }

  window.onLoadMarkers = function(markers){
    var liveMarkers = 0;
    var plannedMarkers = 0;
    for (var index in markers) {
      marker = markers[index];

      switch(marker.status){
          case "live":
            liveMarkers++;
            break;
          case "planned":
            plannedMarkers++;
            break;
      }

      var artifact = handleMarker(marker)
      markersLayer.addMarker(artifact.tag, artifact.loc);
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
