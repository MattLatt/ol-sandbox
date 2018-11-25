

/**
  * @Sources : 3rd part ESRI layer sources
  *************************************/

var xyzWorldTopoESRI = new ol.source.XYZ({
      attributions: 'Tiles \u00A9 <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
});


var xyzWorldImageryESRI = new ol.source.XYZ({
      attributions: 'Tiles \u00A9 <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/World_Imagery/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'World_Imagery/MapServer/tile/{z}/{y}/{x}'
});


var xyzWorldBoundPlaOverLayESRI = new ol.source.XYZ({
      attributions: 'Tiles \u00A9 <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/Reference/World_Boundaries_and_Places/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      //minZoom: 1,
      //maxZoom: 9
});

var xyzWorldRoadsOverLayESRI = new ol.source.XYZ({
      attributions: 'Tiles \u00A9 <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/Reference/World_Transportation">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
      //minZoom: 10,
      //maxZoom: 20	  
});



/**
  * @Layers : Declaration of the layers 
  * object used in this app
  **************************************/


var layCarto = new ol.layer.Tile({
    	title: 'Fond Topo ESRI',
        visible: true,  
        source: xyzWorldTopoESRI
});

var layImagery = new ol.layer.Tile({
	title: 'Fond Satellite',
        visible: false,
	opacity: 1,
        source: xyzWorldImageryESRI
});

var bordersOverlay = new ol.layer.Tile({
	title: 'Decoupage administratif',
	visible: false,
	/*maxResolution: map.getView().getResolutionForZoom(source.minZoom),
	minResolution: map.getView().getResolutionForZoom(source.maxZoom+1),*/
	source: xyzWorldBoundPlaOverLayESRI
});

var roadsOverlay = new ol.layer.Tile({
	title: 'Voies',
	visible: false,
	/*maxResolution: map.getView().getResolutionForZoom(source.minZoom),
	minResolution: map.getView().getResolutionForZoom(source.maxZoom+1),*/
	source: xyzWorldRoadsOverLayESRI
});


