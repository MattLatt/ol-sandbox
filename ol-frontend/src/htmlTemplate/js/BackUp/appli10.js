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

var toggleCarto = true;
var toggleOverlay = false;

/**
  * @Sources : SMP
  *************************************/

var smpClip = new ol.geom.Polygon(
  [[
    [ clipSMPL93[0], clipSMPL93[1] ],
    [ clipSMPL93[0], clipSMPL93[3] ],
    [ clipSMPL93[2], clipSMPL93[3] ],
    [ clipSMPL93[2], clipSMPL93[1] ],
    [ clipSMPL93[0], clipSMPL93[1] ]
  ]]).transform("EPSG:2154", "EPSG:3857");

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
		    if (coordinate == null) return undefined;
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


/**
  * @Sources : 3rd part layer sources
  *************************************/

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



/**
  * @Layers : Declaration of the layers 
  * object used in this app
  **************************************/


var layCarto = new ol.layer.Tile({
    	title: 'Fond Topo ESRI',
        visible: true,  
        source: xyzWorldTopo
});

var layImagery = new ol.layer.Tile({
	title: 'Fond Satellite',
        visible: false,
	opacity: 1,
        source: xyzWorldImagery
});

var bordersOverlay = new ol.layer.Tile({
	title: 'Decoupage administratif',
	visible: false,
	/*maxResolution: map.getView().getResolutionForZoom(source.minZoom),
	minResolution: map.getView().getResolutionForZoom(source.maxZoom+1),*/
	source: xyzWorldBoundPlaOverL
});

var roadsOverlay = new ol.layer.Tile({
	title: 'Voies',
	visible: false,
	/*maxResolution: map.getView().getResolutionForZoom(source.minZoom),
	minResolution: map.getView().getResolutionForZoom(source.maxZoom+1),*/
	source: xyzWorldRoadsOverL
});


/**
  * @Groups : Declaration of the groups
  **************************************/

var grpCarto = new ol.layer.Group({
  	title: 'Groupe Carto',
	layers: [ layCarto ]
  });


//Nested Imagery overlay group
//with two layers one for lower zoom level with country borders
//and the other one with the roads for higher zoom levels...
var grpImgOverlay = new ol.layer.Group({
  	title: 'Texte sur Photos',
        visible: false,
	layers: [ bordersOverlay, roadsOverlay ]
  });

//Topmost Group Imagery
var grpImagery = new ol.layer.Group({
	title: 'Groupe Photos',
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
app.StartingExtent = function(opt_options) {

  var options = opt_options || {};

  var button = document.createElement('button');
  button.innerHTML = '<i class="fa fa-map-pin"></i>';;

  var this_ = this;
  var zoomToStartingExtents = function() {
    $(map)[0].getView().fit(startExtents,$(map)[0].getSize()); 
  };

  button.addEventListener('click', zoomToStartingExtents, false);
  button.addEventListener('touchstart', zoomToStartingExtents, false);

  var element = document.createElement('div');
  element.className = 'starting-extent ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};
ol.inherits(app.StartingExtent, ol.control.Control);




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
  button.innerHTML = '<i class="fa fa-plane"></i>';

  var this_ = this;
 
  var toggleCartoPhotoTrigg = function() {
    //this_.getMap().getView().setRotation(0);
        
     if (toggleCarto == true ) {
       tLabels.setDisable(false); 
       tLabels.setActive(toggleOverlay);
       button.innerHTML = '<i class="fa fa-map"></i>';       
       
       grpCarto.setVisible(false);
       
       grpImagery.setVisible(true);
       layImagery.setVisible(true);
       laySMP.setVisible(true);       
       
       if (toggleOverlay == true ) {
	  grpImgOverlay.setVisible(true);
	  /*
	  if (this_.getMap().getView().getZoom() <= 13) {
	      bordersOverlay.setVisible(true);	 
	      roadsOverlay.setVisible(false);
	  } else {
	      bordersOverlay.setVisible(false);	 
	      roadsOverlay.setVisible(true);	 
	  }*/
	  
       } else {
	  grpImgOverlay.setVisible(false);
	  bordersOverlay.setVisible(false);	 
	  roadsOverlay.setVisible(false);	 
       }
     } else {
       tLabels.setDisable(true);       
       button.innerHTML = '<i class="fa fa-plane"></i>';
       grpCarto.setVisible(true);
       
       grpImagery.setVisible(false);       
       layImagery.setVisible(false);
       laySMP.setVisible(false);       
     
       grpImgOverlay.setVisible(false);
       bordersOverlay.setVisible(false);
       roadsOverlay.setVisible(false);       
     }
     toggleCarto = !toggleCarto;    
    this_.getMap().render();
    
  };

  
  button.addEventListener('click', toggleCartoPhotoTrigg, false);
  button.addEventListener('touchstart', toggleCartoPhotoTrigg, false);

  var element = document.createElement('div');
  element.className = 'toggle-CartoPhoto ol-unselectable ol-control';
  element.appendChild(button);
  element.title = 'Switch affichage couches Carto/Photo',
  
  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};

ol.inherits(app.toggleCartoPhoto, ol.control.Control);


var tLabels = new ol.control.Toggle({
    html: '<i class="fa fa-road"></i>',
    className: "toggle-labels",
    title: "Afficher/Masquer les labels sur la photo",
    //interaction: new ol.interaction.Select (),
    active:false,
    disable:true,
    onToggle: function(active) {
      //$("#info").text("Select is "+(active?"activated":"deactivated"));
      var map_ = $(map)[0];
      //console.debug(map_);

      //map_.getView().setCenter(ol.proj.transform([4.56, 41.125], 'EPSG:4326', 'EPSG:3857'))      
      
      
      //if toggleCarto is false then we are in Photo mode so toggling textOverlay
      if (toggleCarto == false ) 
	{
	if (toggleOverlay == true ) 
	  { grpImgOverlay.setVisible(false); }
	else 
	  { grpImgOverlay.setVisible(true);  }
	toggleOverlay = !toggleOverlay;    
	}
      //map_.updateSize();
      //map_.render();
    }
  });



var mainbar = new ol.control.Bar();

mainbar.addControl(new ol.control.FullScreen());
//mainbar.addControl(new ol.control.ZoomToExtent({extent: startExtents, html:'<i class="fa fa-map-pin"></i>' }));
mainbar.addControl(new app.StartingExtent());
mainbar.addControl(new app.toggleCartoPhoto());
mainbar.addControl(tLabels);
//top, left, right, bottom, top-left, top-right, bottom-left, bottom-right
mainbar.setPosition('top');


//  Vector layer
var tempDraw = new ol.layer.Vector( { source: new ol.source.Vector() })


var map = new ol.Map({
        controls: [
          new ol.control.Zoom(),
          new ol.control.OverviewMap(),
	  new ol.control.Attribution(),     
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


// Edit control bar 
var editbar = new ol.control.Bar(
  {	toggleOne: true,	// one control active at the same time
	group:false			// group controls together
  });
mainbar.addControl(editbar);

// Add selection tool:
//  1- a toggle control with a select interaction
//  2- an option bar to delete / get information on the selected feature
var sbar = new ol.control.Bar();
sbar.addControl (new ol.control.Button(
	      {	html: '<i class="fa fa-times"></i>',
		      title: "Delete",
		      handleClick: function() 
			{
			var features = selectCtrl.getInteraction().getFeatures();
			      if (!features.getLength()) 
			        {console.log("Select an object first...");}
			      else
			        {console.log(features.getLength()+" object(s) deleted.");}
			      for (var i=0, f; f=features.item(i); i++) 
			        {tempDraw.getSource().removeFeature(f); }
			      selectCtrl.getInteraction().getFeatures().clear();
			}
	      }));
sbar.addControl (new ol.control.Button(
	      {	html: '<i class="fa fa-info"></i>',
		      title: "Show informations",
		      handleClick: function() 
		      {	switch (selectCtrl.getInteraction().getFeatures().getLength())
			      {case 0: console.log("Select an object first...");
					      break;
				      case 1:
					      var f = selectCtrl.getInteraction().getFeatures().item(0);
					      console.log("Selection is a "+f.getGeometry().getType());
					      break;
				      default:
					      console.log(selectCtrl.getInteraction().getFeatures().getLength()+ " objects seleted.");
					      break;
			      }
		      }
	      }));

var selectCtrl = new ol.control.Toggle(
	      {	html: '<i class="fa fa-mouse-pointer"></i>',
		      title: "Select",
		      interaction: new ol.interaction.Select (),
		      bar: sbar,
		      autoActivate:true,
		      active:true
	      });

editbar.addControl ( selectCtrl);

// Add editing tools
var pedit = new ol.control.Toggle(
	      {	html: '<i class="fa fa-map-marker" ></i>',
		      title: 'Point',
		      interaction: new ol.interaction.Draw
		      ({	type: 'Point',
			      source: tempDraw.getSource()
		      })
	      });
editbar.addControl ( pedit );

var ledit = new ol.control.Toggle(
	      {	html: '<i class="fa fa-share-alt" ></i>',
		      title: 'LineString',
		      interaction: new ol.interaction.Draw
		      ({	type: 'LineString',
			      source: tempDraw.getSource(),
			      // Count inserted points
			      geometryFunction: function(coordinates, geometry) 
			      {   if (geometry) geometry.setCoordinates(coordinates);
				      else geometry = new ol.geom.LineString(coordinates);
				      this.nbpts = geometry.getCoordinates().length;
				      return geometry;
			      }
		      }),
		      // Options bar associated with the control
		      bar: new ol.control.Bar(
		      {	controls:[ new ol.control.TextButton(
				      {	html: 'undo',
					      title: "Delete last point",
					      handleClick: function() 
					      {	if (ledit.getInteraction().nbpts>1) ledit.getInteraction().removeLastPoint();
					      }
				      }),
				      new ol.control.TextButton(
				      {	html: 'Finish',
					      title: "finish",
					      handleClick: function() 
					      {	// Prevent null objects on finishDrawing
						      if (ledit.getInteraction().nbpts>2) ledit.getInteraction().finishDrawing();
					      }
				      })
			      ]
		      }) 
	      });

editbar.addControl ( ledit );

var fedit = new ol.control.Toggle(
	      {	html: '<i class="fa fa-draw-polygon" ></i>',
		      title: 'Polygon',
		      interaction: new ol.interaction.Draw
		      ({	type: 'Polygon',
			      source: tempDraw.getSource(),
			      // Count inserted points
			      geometryFunction: function(coordinates, geometry) 
			      {   this.nbpts = coordinates[0].length;
				      if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
				      else geometry = new ol.geom.Polygon(coordinates);
				      return geometry;
			      }
		      }),
		      // Options bar ssociated with the control
		      bar: new ol.control.Bar(
			      {	controls:[ new ol.control.TextButton(
					      {	html: 'undo',//'<i class="fa fa-mail-reply"></i>',
						      title: "undo last point",
						      handleClick: function() 
						      {	if (fedit.getInteraction().nbpts>1) fedit.getInteraction().removeLastPoint();
						      }
					      }),
					      new ol.control.TextButton(
					      {	html: 'finish',
						      title: "finish",
						      handleClick: function() 
						      {	// Prevent null objects on finishDrawing
							      if (fedit.getInteraction().nbpts>3) fedit.getInteraction().finishDrawing();
						      }
					      })
				      ]
			      }) 
	      });
editbar.addControl ( fedit );

// Add a simple push button to save features
var save = new ol.control.Button(
	      {	html: '<i class="fa fa-download"></i>',
		      title: "Save",
		      handleClick: function(e)
		      {	var json= new ol.format.GeoJSON().writeFeatures(tempDraw.getSource().getFeatures());
			      info(json);
		      }
	      });
mainbar.addControl ( save );



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






