/**
  * Define a namespace for the application.
  */
window.app = {};
var app = window.app;

var startExtents = new ol.proj.transformExtent( [2.10, 48.0, 2.8, 49.2], 'EPSG:4326', 'EPSG:3857');

var resSMP = [25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1];
var extentSMPL93 = [648000.0, 6861000.0, 651020.8003, 6864020.8003];
var clipSMPL93 = [648000.0, 6861000.0, 651000.0, 6864000.0];

proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
var projSMP = ol.proj.get('EPSG:2154');

/*
new ol.geom.Polygon([[
[1055845.887717247707769,6980697.989275389350951],
[1155714.587098835036159,6741906.324647365137935],
[1050179.578532476909459,6498832.684026349335909],
[789529.35603301494848,6662340.448038995265961],
[838401.272751664044335,7001904.605489840731025],
[1055845.887717247707769,6980697.989275389350951]
]]
)
*/
var smpClip = new ol.geom.Polygon(
  [[
    [ clipSMPL93[0], clipSMPL93[1] ],
    [ clipSMPL93[0], clipSMPL93[3] ],
    [ clipSMPL93[2], clipSMPL93[3] ],
    [ clipSMPL93[2], clipSMPL93[1] ],
    [ clipSMPL93[0], clipSMPL93[1] ]
  ]]).transform("EPSG:2154", "EPSG:3857");

//console.log("smpClip=" + smpClip );

var laySMP =new ol.layer.Tile({
    visible: false,
    opacity: 1,
    preload: 0,
    source: new ol.source.TileImage({
    crossOrigin: null,
    extent: extentSMPL93,
    projection: projSMP,
    tileGrid: new ol.tilegrid.TileGrid({
		    extent: extentSMPL93,
		    origin: [extentSMPL93[0], extentSMPL93[1]],
		    resolutions: resSMP
		    }),
    tileUrlFunction: function(coordinate) {
		    //window.alert("coordinate: "+coordinate);
		    if (coordinate === null) return undefined;
		    // TMS Style URL
		    var z = coordinate[0];
		    var x = coordinate[1];
		    var y = coordinate[2];
		    var url = 'http://127.0.0.1:8008/tms/1.1.0/Paris2016/'+z+'/'+ x +'/'+y +'.jpg';
		    return url;
		    }
	    })
});



var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color:  [200, 0, 0, 128],
      width:3
    }),
    fill: new ol.style.Fill({
      color: [0, 0, 0, 0]
    })
});


laySMP.on('precompose', function(event) {
    var vecCtx = event.vectorContext;
    //var frameState = event.frameState;
    var ctx = event.context;
    ctx.save();

    vecCtx.setStyle(style);
    vecCtx.drawGeometry(smpClip);
    ctx.clip();
});

laySMP.on('postcompose', function(event) {
  var ctx = event.context;
  ctx.restore();
});



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
	opacity: 1,
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
	  laySMP,
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
  
    //if toggleCarto is false then we are in Photo mode so toggling textOverlay
    if (toggleCarto === false ) {
    
     if (toggleOverlay === true ) {
       grpImgOverlay.setVisible(false);
     } else {
       grpImgOverlay.setVisible(true);
     }
     toggleOverlay = !toggleOverlay;    
    }
    this_.getMap().render();
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
  
     if (toggleCarto == true ) {
       button.innerHTML = 'C';       
       grpCarto.setVisible(false);
       
       grpImagery.setVisible(true);
       layImagery.setVisible(true);
       laySMP.setVisible(true);       
       
       if (toggleOverlay == true ) {
	  grpImgOverlay.setVisible(true);
	  
	  if (this_.getMap().getView().getZoom() <= 13) {
	      bordersOverlay.setVisible(true);	 
	      roadsOverlay.setVisible(false);
	  } else {
	      bordersOverlay.setVisible(false);	 
	      roadsOverlay.setVisible(true);	 
	  }
	  
       } else {
	  grpImgOverlay.setVisible(false);
	  bordersOverlay.setVisible(false);	 
	  roadsOverlay.setVisible(false);	 
       }
     } else {
       button.innerHTML = 'P';              
       grpCarto.setVisible(true);
       
       grpImagery.setVisible(false);       
       layImagery.setVisible(false);
       laySMP.setVisible(false);       
     
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
var toggleOverlay = false;

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
          minZoom: 5,
          maxZoom: 21   
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






