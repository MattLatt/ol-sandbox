/**
  * Define a namespace for the application.
  */
 window.app = {};
 var app = window.app;
 
var toggleCarto = true;
var toggleOverlay = false;

var viewInfoControl = new ol.control.ViewInfo({
	coordsource: 'center', //the coordinate to be displayed 'center'=center of the viewport or
			      //'pointer'= mouse pointer
	coordproj: 'EPSG:2154' //the projection used to display coordinates in the components
    });

/**
  * The Zoom to extent Control  
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
  * The Map/Imagery toggle control  
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
       smpLatest.setVisible(true);       
			 smpParis1942.setVisible(true);
       smpParis1942.setOpacity(0.0); 
			  
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
       smpLatest.setVisible(false);       
			 smpParis1942.setVisible(false);            
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


/**
  * The Imagery Overlay toggle control  
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */

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



 /**
  * The ol-ext control bar  
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */

var mainbar = new ol.control.Bar();

mainbar.addControl(new ol.control.FullScreen());
//Fullscreen use fa-expand and fa-compress as icon 
//mainbar.addControl(new ol.control.ZoomToExtent({extent: startExtents, html:'<i class="fa fa-map-pin"></i>' }));
mainbar.addControl(new app.StartingExtent());
mainbar.addControl(new app.toggleCartoPhoto());
mainbar.addControl(tLabels);
//top, left, right, bottom, top-left, top-right, bottom-left, bottom-right
mainbar.setPosition('top');


  /**
    * Elements that make up the popup.
    */
  var container = $("#popup")[0];
  var content =  $("#popup-content")[0];
  var closer = $("#popup-closer")[0];  
  

  /**
    * Create an overlay to anchor the popup to the map.
    */
  var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });

      /**
       * Add a click handler to hide the popup.
       * @return {boolean} Don't follow the href.
       */
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };



//  Vector layer
var tempDraw = new ol.layer.Vector( { source: new ol.source.Vector() })


 /**
  * The ol-ext edit geom control bar  
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */


// Edit control bar 
var editbar = new ol.control.Bar(
  {	toggleOne: true,	// one control active at the same time
	group:false			// group controls together
  });
mainbar.addControl(editbar);

// Add selection tool:
//  1- a toggle control with a select interaction
//  2- an option bar to delete / get information on the selected feature
//  3- edit geom
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
					      //console.log("Selection is a "+f.getGeometry().getType());
					      content.innerHTML = '<p>Selected feature is a '+f.getGeometry().getType()+': <br>'+new ol.format.GeoJSON().writeFeature(f)+'</p><code>';
					      overlay.setPosition(getCenterOfExtent(f.getGeometry().getExtent()));
					      break;
				      default:
					      console.log(selectCtrl.getInteraction().getFeatures().getLength()+ " objects seleted.");
					      break;
			      }
		      }
	      }));


var selInteraction = new ol.interaction.Select ();


var selectCtrl = new ol.control.Toggle(
	      {	html: '<i class="fa fa-mouse-pointer"></i>',
		      title: "Select",
		      interaction: selInteraction,
		      bar: sbar,
		      autoActivate:false,
		      active:false
	      });

editbar.addControl ( selectCtrl);


var pntDrawInteraction = new ol.interaction.Draw({
  type: 'Point',
  source: tempDraw.getSource()
});

var lineDrawInteraction = new ol.interaction.Draw ({
  type: 'LineString',
	source: tempDraw.getSource(),
	// Count inserted points
	geometryFunction: function(coordinates, geometry) 
	{   if (geometry) geometry.setCoordinates(coordinates);
		else geometry = new ol.geom.LineString(coordinates);
		this.nbpts = geometry.getCoordinates().length;
		return geometry;
	}
});

var polyDrawInteraction = new ol.interaction.Draw({
  type: 'Polygon',
  source: tempDraw.getSource(),
  // Count inserted points
  geometryFunction: function(coordinates, geometry) 
  {   this.nbpts = coordinates[0].length;
	  if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
	  else geometry = new ol.geom.Polygon(coordinates);
	  return geometry;
  }
});

// Add editing tools
var pedit = new ol.control.Toggle(
	      {	html: '<i class="fa fa-map-marker" ></i>',
		      title: 'Point',
		      interaction: pntDrawInteraction
	      });
editbar.addControl ( pedit );

var ledit = new ol.control.Toggle(
	      {	html: '<i class="fa fa-share-alt" ></i>',
		      title: 'LineString',
		      interaction: lineDrawInteraction,
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
		      interaction: polyDrawInteraction,
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

var interaction = new ol.interaction.Transform (
	{	addCondition: ol.events.condition.shiftKeyOnly,
		// filter: function(f,l) { return f.getGeometry().getType()==='Polygon'; },
		// layers: [vector],
		hitTolerance: 2,
		//translateFeature: $("#translateFeature").prop('checked'),
		translateFeature: false,
		scale: $("#scale").prop('checked'),
		rotate: $("#rotate").prop('checked'),
		keepAspectRatio: $("#keepAspectRatio").prop('checked') ? ol.events.condition.always : undefined,
		translate: $("#translate").prop('checked'),
		stretch: $("#stretch").prop('checked')
	});


var editCtrl = new ol.control.Button( {
  html: '<i class="fa fa-edit"></i>',
  title: "Edit geometry",
  handleClick: function(e){
    map.removeInteraction(pntDrawInteraction);
    map.removeInteraction(lineDrawInteraction);
    map.removeInteraction(polyDrawInteraction);
    map.removeInteraction(selInteraction);
    map.addInteraction(interaction);
  }
});

mainbar.addControl (editCtrl);

// Set cursor style
ol.interaction.Transform.prototype.Cursors['rotate'] = 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXAgMAAACdRDwzAAAAAXNSR0IArs4c6QAAAAlQTFRF////////AAAAjvTD7AAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wwSEgUFmXJDjQAAAEZJREFUCNdjYMAOuCCk6goQpbp0GpRSAFKcqdNmQKgIILUoNAxIMUWFhoKosNDQBKDgVAilCqcaQBogFFNoGNjsqSgUTgAAM3ES8k912EAAAAAASUVORK5CYII=\') 5 5, auto';
ol.interaction.Transform.prototype.Cursors['rotate0'] = 'url(\'data:image/png;base64,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\') 5 5, auto';


var usingFontAwsomeEditStyle = true;

/** Style the transform handles for the current interaction
*/
function setHandleStyle() {
   if (!interaction instanceof ol.interaction.Transform) return;
      //if ($("#style").prop('checked'))
      if (usingFontAwsomeEditStyle == true)
      {
	console.log("usingFontAwsomeEditStyle="+usingFontAwsomeEditStyle);	
	// Style the rotate handle
	      var circle = new ol.style.RegularShape({
					      fill: new ol.style.Fill({color:[255,255,255,0.01]}),
					      stroke: new ol.style.Stroke({width:1, color:[0,0,0,0.01]}),
					      radius: 8,
					      points: 10
				      });
	      interaction.setStyle ('rotate',
			      new ol.style.Style(
			      {	text: new ol.style.Text (
					      {	text:'\f0e2', 
						      font:"16px Fontawesome",
						      textAlign: "left",
						      fill:new ol.style.Fill({color:'red'})
					      }),
				      image: circle
			      }));
	      // Center of rotation
	      interaction.setStyle ('rotate0',
			      new ol.style.Style(
			      {	text: new ol.style.Text (
					      {	text:"\f0e2", 
						      font:"20px Fontawesome",
						      fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
						      stroke: new ol.style.Stroke({ width:2, color:'red' })
					      }),
			      }));
	      // Style the move handle
	      interaction.setStyle('translate',
			      new ol.style.Style(
			      {	text: new ol.style.Text (
					      {	text:'f047', 
						      font:"20px Fontawesome", 
						      fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
						      stroke: new ol.style.Stroke({ width:2, color:'red' })
					      })
			      }));
	      // Style the strech handles
	      /* uncomment to style * /
	      interaction.setStyle ('scaleh1', 
			      new ol.style.Style(
			      {	text: new ol.style.Text (
					      {	text:'\uf07d', 
						      font:"bold 20px Fontawesome", 
						      fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
						      stroke: new ol.style.Stroke({ width:2, color:'red' })
					      })
			      }));
	      interaction.style.scaleh3 = interaction.style.scaleh1;
	      interaction.setStyle('scalev',
			      new ol.style.Style(
			      {	text: new ol.style.Text (
					      {	text:'\uf07e', 
						      font:"bold 20px Fontawesome", 
						      fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
						      stroke: new ol.style.Stroke({ width:2, color:'red' })
					      })
			      }));
	      interaction.style.scalev2 = interaction.style.scalev;
	      /**/
      }
      else
      {	interaction.setDefaultStyle ();
      }
      // Refresh
      interaction.set('translate', interaction.get('translate'));
};

/** Set properties
*/
function setPropertie (p)
{	interaction.set(p, $("#"+p).prop('checked'));
      if (!$("#scale").prop("checked")) $("#stretch").prop('disabled', true);
      else $("#stretch").prop('disabled', false);
}

function setAspectRatio (p)
{	if ($("#"+p).prop('checked')) interaction.set("keepAspectRatio", ol.events.condition.always);
      else interaction.set("keepAspectRatio", function(e){ return e.originalEvent.shiftKey });
}


//map.addInteraction(interaction);

// Style handles
setHandleStyle();
// Events handlers
var startangle = 0;
var d=[0,0];

// Handle rotate on first point
var firstPoint = false;

interaction.on (['select'], function(e) {
      if (firstPoint && e.features && e.features.length) {
	      interaction.setCenter(e.features[0].getGeometry().getFirstCoordinate());
      }
});

interaction.on (['rotatestart','translatestart'], function(e)
      {	// Rotation
	      startangle = e.feature.get('angle')||0;
	      // Translation
	      d=[0,0];
      });
interaction.on('rotating', function (e)
      {	$('#info').text("rotate: "+((e.angle*180/Math.PI -180)%360+180).toFixed(2)); 
	      // Set angle attribute to be used on style !
	      e.feature.set('angle', startangle - e.angle);
      });
interaction.on('translating', function (e)
      {	d[0]+=e.delta[0];
	      d[1]+=e.delta[1];
	      $('#info').text("translate: "+d[0].toFixed(2)+","+d[1].toFixed(2)); 
      });
interaction.on('scaling', function (e)
      {	$('#info').text("scale: "+e.scale[0].toFixed(2)+","+e.scale[1].toFixed(2)); 
      });
interaction.on(['rotateend', 'translateend', 'scaleend'], function (e) { $('#info').text(""); });
	      



var mapInfo = document.getElementById('mapInfo');

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

function getCenterOfExtent(Extent){
  var X = Extent[0] + (Extent[2]-Extent[0])/2;
  var Y = Extent[1] + (Extent[3]-Extent[1])/2;
  return [X, Y];
  }


$("#slider-id").slider({
    value: 0,
    slide: function(e, ui) {
        smpParis1942.setOpacity(ui.value / 100);
    }
});
