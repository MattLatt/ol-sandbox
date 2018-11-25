var startExtents = new  ol.proj.transformExtent( [2.10, 48.0, 2.8, 49.2], 'EPSG:4326', 'EPSG:3857');


var xyzWorldTopo = new ol.source.XYZ({
      attributions: 'Tiles � <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
});


var xyzWorldSat = new ol.source.XYZ({
      attributions: 'Tiles � <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'World_Imagery/MapServer/tile/{z}/{y}/{x}'
});

var layerESRI = new ol.layer.Tile({
        source: xyzWorldTopo
});


var toggleCarto = true;

var map = new ol.Map({
        controls: ol.control.defaults().extend([
          new ol.control.FullScreen(),
          new ol.control.OverviewMap(),
          new ol.control.ZoomToExtent({
            extent: startExtents
          })
        ]),
        interactions: ol.interaction.defaults().extend([
          new ol.interaction.DragZoom()
        ]),
        layers: [
	  layerESRI
        ],
        // Use the canvas renderer because it's currently the fastest
        target: 'map',
        view: new ol.View({
          center: ol.proj.fromLonLat([2.48, 48.8]),
          rotation: 0, //-Math.PI / 8,
          zoom: 8,
          minZoom: 5
        })
});

map.on('click', function(event) {
  
     if (toggleCarto === true ) {
	layerESRI.setSource(xyzWorldSat);
     } else {
       layerESRI.setSource(xyzWorldTopo);
     }
     toggleCarto = !toggleCarto;
     
});

