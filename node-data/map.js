$(function(){
  var loadJsonP = function(path) {
    var script = document.createElement("script");
    script.src = path;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  var buildMarkerPin = function(imageFile) {
    var img = document.createElement("img");
    img.setAttribute("src", imageFile);
    img.setAttribute("alt", "map point");
    return img;
  }

  var liveMarkerPin = function(){ return buildMarkerPin("/node-data/map-pin-live.svg");}
  var plannedMarkerPin = function(){ return buildMarkerPin("/node-data/map-pin-planned.svg");}

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

  var layer = new MM.StamenTileLayer("terrain");
  var map = new MM.Map("map", layer);
  map.setCenterZoom(new MM.Location(40.4602259, -79.9779362), 12);

  var markersLayer = new MM.MarkerLayer();
  map.addLayer(markersLayer);

  var nodes = [];

  var findNodeByName = function(nodeName) {
    return nodes.filter(function(node){
      return node.name == nodeName
    })[0]
  }

  window.onLoadLinks = function(links){
    var linkColors = {'wifi': '#f4181f', 'vpn': '#FFB90F'};
    var linkCounts = {'wifi': 0, 'vpn': 0 };
    var canvas = document.createElement("canvas");
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.pointerEvents = "none";
    canvas.width = map.dimensions.x;
    canvas.height = map.dimensions.y;
    map.parent.appendChild(canvas);

    var linkLines = [];

    for(var index in links) {
      var link = links[index];
      try {
        var fromName = link.from;
        var toName = link.to;
        var linkType = link.type;
        linkCounts[linkType]++;
        var fromNode = findNodeByName(fromName);
        var toNode = findNodeByName(toName);

        var fromLoc = new MM.Location(fromNode.lat, fromNode.lon);
        var toLoc = new MM.Location(toNode.lat, toNode.lon);

        console.log("Adding "+ link.type + " link from " + link.from + " to " + link.to + " on the map...");

        linkLines.push(
          [ MM.Location.interpolate(fromLoc, toLoc, 0),
            MM.Location.interpolate(fromLoc, toLoc, 1),
            link.type ]);
      } catch (err) {
        console.log("Error while adding " + link.type + " link from " + link.from + " to " + link.to + " on the map...");
      }
    }

    if(links.length > 0) {
      $("#ptpLinks").html(
        "There " + (links.length == 1 ? "is " : "are ") +
        links.length + " point-to-point links active: " +
        linkCounts.wifi + ' <span class="ptp-link wifi" style="border-color:'+linkColors.wifi+'">WiFi</span> and '+
        linkCounts.vpn + ' <span class="ptp-link vpn" style="border-color:'+linkColors.vpn+'">VPN</span>.');
    }

    var redraw = function() {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.lineWidth = 2;
      for(var index in linkLines){
        var linkLine = linkLines[index];
        ctx.strokeStyle = linkColors[linkLine[2]];
        ctx.beginPath();
        var p = map.locationPoint(linkLine[0]);
        ctx.moveTo(p.x,p.y);
        p = map.locationPoint(linkLine[1]);
        ctx.lineTo(p.x,p.y);
        ctx.stroke();
      }
    }

    map.addCallback('drawn', redraw);
    map.addCallback('resized', function() {
      canvas.width = map.dimensions.x;
      canvas.height = map.dimensions.y;
      redraw();
    });
    redraw();
  }

  window.onLoadMarkers = function(markers){
    nodes = markers;
    var liveMarkers = 0;
    var plannedMarkers = 0;
    for (var index in markers) {
      var marker = markers[index];

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
      var plannedImg = '(<img alt="Planned nodes are yellow pins." src="/node-data/map-pin-planned.svg" class="info-pin"/>)';
      $("#planned").html("There " + (plannedMarkers == 1 ? "is " : "are ") + plannedMarkers + " nodes planned for deployment " + plannedImg + ".");
    }

    loadJsonP("/node-data/links.json");
  }


  loadJsonP("/node-data/nodes.json");
});
