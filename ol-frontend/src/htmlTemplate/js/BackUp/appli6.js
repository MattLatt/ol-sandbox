/**
  * Define a namespace for the application.
  */
window.app = {};
var app = window.app;

var startExtents = new  ol.proj.transformExtent( [2.10, 48.0, 2.8, 49.2], 'EPSG:4326', 'EPSG:3857');


var xyzWorldTopo = new ol.source.XYZ({
      attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
});


var xyzWorldImagery = new ol.source.XYZ({
      attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/World_Imagery/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'World_Imagery/MapServer/tile/{z}/{y}/{x}'
});


var xyzWorldBoundPlaOverL = new ol.source.XYZ({
      attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/Reference/World_Boundaries_and_Places/MapServer">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      //minZoom: 1,
      //maxZoom: 9
});

var xyzWorldRoadsOverL = new ol.source.XYZ({
      attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
	  'rest/services/Reference/World_Transportation">ArcGIS</a>',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
	  'Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
      //minZoom: 10,
      //maxZoom: 20	  
});



var layCarto = new ol.layer.Tile({
        visible: true,  
        source: xyzWorldTopo
});


//Topmost Group Carto
var grpCarto = new ol.layer.Group({
	layers: [ layCarto ]
  });


var layImagery = new ol.layer.Tile({
        visible: false,
        source: xyzWorldImagery
});



var bordersOverlay = new ol.layer.Tile({
	  visible: false,
	  /*maxResolution: map.getView().getResolutionForZoom(source.minZoom),
	  minResolution: map.getView().getResolutionForZoom(source.maxZoom+1),*/
	  source: xyzWorldBoundPlaOverL
});

var roadsOverlay = new ol.layer.Tile({
	  visible: false,
	  /*maxResolution: map.getView().getResolutionForZoom(source.minZoom),
	  minResolution: map.getView().getResolutionForZoom(source.maxZoom+1),*/
	  source: xyzWorldRoadsOverL
});


//Nested Imagery overlay group
//with two layers one for lower zoom level with country borders
//and the other one with the roads for higher zoom levels...
var grpImgOverlay = new ol.layer.Group({
        visible: false,
	layers: [ bordersOverlay, roadsOverlay ]
  });

//Topmost Group Imagery
var grpImagery = new ol.layer.Group({
	layers: [ 
	  layImagery,
	  grpImgOverlay  
	]
  });



/**
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */
app.toggleTextOverlay = function(opt_options) {

  var options = opt_options || {};
  var button = document.createElement('button');
  button.innerHTML = 'T';

  var this_ = this;
 
  var toggleTextOverlayTrigg = function() {
    //this_.getMap().getView().setRotation(0);
  
    //if toggleCarto is false then we are in Photo mode so toggling textOverlay
    if (toggleCarto === false ) {
    
     if (toggleOverlay === true ) {
       grpImgOverlay.setVisible(false);
     } else {
       grpImgOverlay.setVisible(true);
     }
     toggleOverlay = !toggleOverlay;    
    }
  };

  
  button.addEventListener('click', toggleTextOverlayTrigg, false);
  button.addEventListener('touchstart', toggleTextOverlayTrigg, false);

  var element = document.createElement('div');
  element.className = 'toggle-TextOverlay ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};

ol.inherits(app.toggleTextOverlay, ol.control.Control);



/**
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */
app.toggleCartoPhoto = function(opt_options) {

  var options = opt_options || {};
  
  /*
   alert("app="+app);
   alert("toggleCarto="+toggleCarto);
   alert("toggleSource="+toggleSource);  
*/
  var button = document.createElement('button');
  button.innerHTML = 'P';

  var this_ = this;
 
  var toggleCartoPhotoTrigg = function() {
    //this_.getMap().getView().setRotation(0);
  
     if (toggleCarto === true ) {
       button.innerHTML = 'C';       
       grpCarto.setVisible(false);
       
       grpImagery.setVisible(true);
       layImagery.setVisible(true);
       
       grpImgOverlay.setVisible(true);
       
       if (this_.getMap().getView().getZoom() <= 13) {
	  bordersOverlay.setVisible(true);	 
	  roadsOverlay.setVisible(false);
       } else {
	  bordersOverlay.setVisible(false);	 
	  roadsOverlay.setVisible(true);	 
       }


     } else {
       button.innerHTML = 'P';              
       grpCarto.setVisible(true);
       
       grpImagery.setVisible(false);       
       layImagery.setVisible(false);
       
       grpImgOverlay.setVisible(false);
       bordersOverlay.setVisible(false);
       roadsOverlay.setVisible(false);       
       
       
     }
     toggleCarto = !toggleCarto;    
    
  };

  
  button.addEventListener('click', toggleCartoPhotoTrigg, false);
  button.addEventListener('touchstart', toggleCartoPhotoTrigg, false);

  var element = document.createElement('div');
  element.className = 'toggle-CartoPhoto ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};

ol.inherits(app.toggleCartoPhoto, ol.control.Control);

var toggleCarto = true;
var toggleOverlay = true;

var map = new ol.Map({
        controls: ol.control.defaults().extend([
          new ol.control.FullScreen(),
          new ol.control.OverviewMap(),
          new ol.control.ZoomToExtent({
            extent: startExtents
          }),
	  new app.toggleCartoPhoto(),
	  new app.toggleTextOverlay()
        ]),
        interactions: ol.interaction.defaults().extend([
          new ol.interaction.DragZoom()
        ]),
        layers: [
	  grpCarto,
	  grpImagery
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


function onMoveEnd(evt) {
  var map = evt.map;

  if (map.getView().getZoom() <= 13) {
    bordersOverlay.setVisible(true);
    roadsOverlay.setVisible(false);
  } else {
    bordersOverlay.setVisible(false);
    roadsOverlay.setVisible(true);
  }
  
}

map.on('moveend', onMoveEnd);

