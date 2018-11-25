
var startExtents = new ol.proj.transformExtent( [2.10, 48.0, 2.8, 49.2], 'EPSG:4326', 'EPSG:3857');

//  Vector layer
var tempDraw = new ol.layer.Vector( { source: new ol.source.Vector() })


 /**
  * The ol map object  
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */
var map = new ol.Map({
        controls: [
          new ol.control.Zoom(),
          new ol.control.OverviewMap(),
          new ol.control.Attribution(),
          viewInfoControl,     
          mainbar
        ],
        interactions: ol.interaction.defaults().extend([
          new ol.interaction.DragZoom()
        ]),
        layers: [
	  grpCarto,
	  grpImagery,
	  tempDraw
        ],
        overlays: [overlay],	
        // Use the canvas renderer because it's currently the fastest
        target: 'map',
        view: new ol.View({
          center: ol.proj.fromLonLat([2.48, 48.8]),
          rotation: 0, //-Math.PI / 8,
          zoom: 8,
          minZoom: 5,
          maxZoom: 21   
        })
});


map.on('moveend', onMoveEnd);