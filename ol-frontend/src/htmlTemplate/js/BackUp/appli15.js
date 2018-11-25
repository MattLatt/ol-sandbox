/**
  * Define a namespace for the application.
  */
window.app = {};
var app = window.app;

var startExtents = new ol.proj.transformExtent( [2.10, 48.0, 2.8, 49.2], 'EPSG:4326', 'EPSG:3857');

//var resSMP = [25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1];
//var extentSMPL93 = [648000.0, 6861000.0, 651020.8003, 6864020.8003];
//var clipSMPL93 = [648000.0, 6861000.0, 651000.0, 6864000.0];
var resSMP = [6553.6, 3276.8, 1638.4,819.2,409.6,204.8,102.4,51.2,25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2];
//var extentSMPL93 = [585000.0500, 6777999.9500, 743000.05, 6905999.95];
var extentSMPL93 = [585000.0500, 6777999.9500, 1404200.0500, 7597199.9500];
proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
var projSMP = ol.proj.get('EPSG:2154');

var toggleCarto = true;
var toggleOverlay = false;

/**
  * @Sources : SMP
  *************************************/

/*var smpClip = new ol.geom.Polygon(
  [[
    [ clipSMPL93[0], clipSMPL93[1] ],
    [ clipSMPL93[0], clipSMPL93[3] ],
    [ clipSMPL93[2], clipSMPL93[3] ],
    [ clipSMPL93[2], clipSMPL93[1] ],
    [ clipSMPL93[0], clipSMPL93[1] ]
  ]]).transform("EPSG:2154", "EPSG:3857");
*/

var smpClip = new ol.geom.Polygon(
	[ [ [ 590000.0, 6889000.0 ], [ 593000.0, 6889000.0 ], [ 593000.0, 6888000.0 ], [ 595000.0, 6888000.0 ], [ 595000.0, 6889000.0 ], [ 597000.0, 6889000.0 ], [ 597000.0, 6890000.0 ], [ 598000.0, 6890000.0 ], [ 598000.0, 6891000.0 ], [ 599000.0, 6891000.0 ], [ 599000.0, 6893000.0 ], [ 600000.0, 6893000.0 ], [ 600000.0, 6894000.0 ], [ 601000.0, 6894000.0 ], [ 601000.0, 6898000.0 ], [ 602000.0, 6898000.0 ], [ 602000.0, 6901382.1341956342 ], [ 602872.51414713007, 6902263.2174616 ], [ 602874.2118027485, 6903000.0 ], [ 603000.0, 6903000.0 ], [ 603000.0, 6904000.0 ], [ 604000.0, 6904000.0 ], [ 604000.0, 6905000.0 ], [ 605000.0, 6905000.0 ], [ 605000.0, 6906000.0 ], [ 608000.0, 6906000.0 ], [ 608000.0, 6905000.0 ], [ 609000.0, 6905000.0 ], [ 609000.0, 6904000.0 ], [ 610000.0, 6904000.0 ], [ 610000.0, 6902000.0 ], [ 609000.0, 6902000.0 ], [ 609000.0, 6901000.0 ], [ 610000.0, 6901000.0 ], [ 610000.0, 6900000.0 ], [ 616000.0, 6900000.0 ], [ 616000.0, 6899000.0 ], [ 619000.0, 6899000.0 ], [ 619000.0, 6898000.0 ], [ 620000.0, 6898000.0 ], [ 620000.0, 6899000.0 ], [ 624000.0, 6899000.0 ], [ 624000.0, 6900000.0 ], [ 628000.0, 6900000.0 ], [ 628000.0, 6901000.0 ], [ 630000.0, 6901000.0 ], [ 630000.0, 6902000.0 ], [ 631000.0, 6902000.0 ], [ 630996.60468876315, 6902548.423605497 ], [ 633996.60468876315, 6902548.423605497 ], [ 634000.0, 6902000.0 ], [ 635000.0, 6902000.0 ], [ 635006.79062247381, 6900816.6531932093 ], [ 638006.79062247381, 6900816.6531932093 ], [ 638000.0, 6900000.0 ], [ 639000.0, 6900000.0 ], [ 639000.0, 6899000.0 ], [ 645000.0, 6899000.0 ], [ 645000.0, 6898000.0 ], [ 646000.0, 6898000.0 ], [ 646000.0, 6897000.0 ], [ 647000.0, 6897000.0 ], [ 647000.0, 6899000.0 ], [ 648000.0, 6899000.0 ], [ 648000.0, 6900000.0 ], [ 652000.0, 6900000.0 ], [ 652000.0, 6898000.0 ], [ 653000.0, 6898000.0 ], [ 653000.0, 6897000.0 ], [ 667000.0, 6897000.0 ], [ 667000.0, 6893000.0 ], [ 669000.0, 6893000.0 ], [ 669000.0, 6890000.0 ], [ 672000.0, 6890000.0 ], [ 672000.0, 6891000.0 ], [ 675000.0, 6891000.0 ], [ 675000.0, 6890000.0 ], [ 677000.0, 6890000.0 ], [ 677000.0, 6889000.0 ], [ 678000.0, 6889000.0 ], [ 678000.0, 6888000.0 ], [ 681000.0, 6888000.0 ], [ 681000.0, 6887000.0 ], [ 682000.0, 6887000.0 ], [ 682000.0, 6888000.0 ], [ 683000.0, 6888000.0 ], [ 683000.0, 6889000.0 ], [ 684000.0, 6889000.0 ], [ 684000.0, 6890000.0 ], [ 688000.0, 6890000.0 ], [ 688000.0, 6889000.0 ], [ 689000.0, 6889000.0 ], [ 689000.0, 6892000.0 ], [ 714000.0, 6892000.0 ], [ 714000.0, 6885000.0 ], [ 715000.0, 6885000.0 ], [ 715000.0, 6881000.0 ], [ 714000.0, 6881000.0 ], [ 714000.0, 6880000.0 ], [ 716000.0, 6880000.0 ], [ 716000.0, 6879000.0 ], [ 717000.0, 6879000.0 ], [ 717000.0, 6878000.0 ], [ 718000.0, 6878000.0 ], [ 718000.0, 6876592.5626515765 ], [ 720000.0, 6876592.5626515765 ], [ 720000.0, 6875000.0 ], [ 721000.0, 6875000.0 ], [ 721000.0, 6874000.0 ], [ 724000.0, 6874000.0 ], [ 724000.0, 6872000.0 ], [ 725000.0, 6872000.0 ], [ 725000.0, 6871000.0 ], [ 729000.0, 6871000.0 ], [ 729000.0, 6869000.0 ], [ 730000.0, 6869000.0 ], [ 730000.0, 6866000.0 ], [ 731000.0, 6866000.0 ], [ 731000.0, 6865000.0 ], [ 732629.91107518191, 6864989.814066289 ], [ 732633.30638641876, 6863986.4187550526 ], [ 735000.0, 6864000.0 ], [ 735013.58124494751, 6862687.6313662082 ], [ 738013.58124494751, 6862687.6313662082 ], [ 738000.0, 6856000.0 ], [ 737000.0, 6856000.0 ], [ 737013.58124494739, 6855298.7873888444 ], [ 734013.58124494739, 6855298.7873888444 ], [ 734013.58124494739, 6850443.1689571543 ], [ 736013.58124494739, 6850443.1689571543 ], [ 736000.0, 6846000.0 ], [ 737000.0, 6846000.0 ], [ 737000.0, 6842000.0 ], [ 736000.0, 6842000.0 ], [ 736000.0, 6841000.0 ], [ 736570.73565076792, 6840993.2093775263 ], [ 736575.98502506025, 6839999.5412917417 ], [ 741000.0, 6840000.0 ], [ 741000.0, 6839000.0 ], [ 742000.0, 6839000.0 ], [ 742000.0, 6837000.0 ], [ 743000.0, 6837000.0 ], [ 743000.0, 6834000.0 ], [ 742000.0, 6834000.0 ], [ 742000.0, 6833000.0 ], [ 740000.0, 6833000.0 ], [ 740000.0, 6831000.0 ], [ 738877.76879547292, 6831000.0 ], [ 738877.76879547292, 6830000.0 ], [ 737000.0, 6830000.0 ], [ 737000.0, 6829000.0 ], [ 738000.0, 6829000.0 ], [ 738000.0, 6826000.0 ], [ 737000.0, 6826000.0 ], [ 737000.0, 6825000.0 ], [ 736000.0, 6825000.0 ], [ 736000.0, 6824000.0 ], [ 734000.0, 6824000.0 ], [ 734000.0, 6819000.0 ], [ 732000.0, 6819000.0 ], [ 732000.0, 6814000.0 ], [ 733000.0, 6814000.0 ], [ 733000.0, 6809000.0 ], [ 732000.0, 6809000.0 ], [ 732003.39531123685, 6808407.4373484235 ], [ 729000.0, 6808404.0420371871 ], [ 729000.0, 6807000.0 ], [ 728000.0, 6807000.0 ], [ 728000.0, 6806000.0 ], [ 720000.0, 6806000.0 ], [ 720000.0, 6805000.0 ], [ 713000.0, 6805000.0 ], [ 713000.0, 6806000.0 ], [ 710000.0, 6806000.0 ], [ 710000.0, 6805000.0 ], [ 709000.0, 6805000.0 ], [ 709000.0, 6804000.0 ], [ 705000.0, 6804000.0 ], [ 705000.0, 6802000.0 ], [ 704000.0, 6802000.0 ], [ 704000.0, 6799000.0 ], [ 705000.0, 6799000.0 ], [ 705000.0, 6798000.0 ], [ 706000.0, 6798000.0 ], [ 706000.0, 6794000.0 ], [ 705000.0, 6794000.0 ], [ 705000.0, 6793000.0 ], [ 704000.0, 6793000.0 ], [ 704000.0, 6792000.0 ], [ 703000.0, 6792000.0 ], [ 703000.0, 6790000.0 ], [ 702000.0, 6790000.0 ], [ 702000.0, 6788000.0 ], [ 700000.0, 6788000.0 ], [ 700000.0, 6787000.0 ], [ 699000.0, 6787000.0 ], [ 699000.0, 6786000.0 ], [ 697000.0, 6786000.0 ], [ 697000.0, 6783000.0 ], [ 694000.0, 6783000.0 ], [ 693998.30234438158, 6782441.390460792 ], [ 691013.58124494739, 6782441.390460792 ], [ 691000.0, 6781000.0 ], [ 689716.49151172186, 6781003.3953112364 ], [ 689714.79385610344, 6780006.7906224737 ], [ 688000.0, 6780000.0 ], [ 688000.0, 6779000.0 ], [ 684000.0, 6779000.0 ], [ 684000.0, 6780000.0 ], [ 683000.0, 6780000.0 ], [ 683000.0, 6781000.0 ], [ 682000.0, 6781000.0 ], [ 682000.0, 6780000.0 ], [ 680000.0, 6780000.0 ], [ 680000.0, 6779000.0 ], [ 677741.95634599833, 6779000.0 ], [ 677741.95634599833, 6778000.0 ], [ 674000.0, 6778000.0 ], [ 674000.0, 6779000.0 ], [ 673000.0, 6779000.0 ], [ 673000.0, 6780000.0 ], [ 672000.0, 6780000.0 ], [ 672000.0, 6779000.0 ], [ 667000.0, 6779000.0 ], [ 667000.0, 6780000.0 ], [ 666000.0, 6780000.0 ], [ 666000.0, 6779000.0 ], [ 657000.0, 6779000.0 ], [ 657000.0, 6782972.8375101043 ], [ 658000.0, 6782972.8375101043 ], [ 657998.30234438169, 6784658.7712206952 ], [ 659000.00000000012, 6784660.4688763134 ], [ 659000.0, 6786000.0 ], [ 660000.0, 6786000.0 ], [ 660000.0, 6786443.1689571543 ], [ 661000.0, 6786443.1689571543 ], [ 661000.0, 6788000.0 ], [ 662000.0, 6788000.0 ], [ 662000.0, 6792000.0 ], [ 660000.0, 6792000.0 ], [ 660000.0, 6793000.0 ], [ 650000.0, 6793000.0 ], [ 650000.0, 6800000.0 ], [ 646000.0, 6800000.0 ], [ 646000.0, 6799000.0 ], [ 645000.0, 6799000.0 ], [ 645000.0, 6798000.0 ], [ 643000.0, 6798000.0 ], [ 643000.0, 6799000.0 ], [ 642000.0, 6799000.0 ], [ 642000.0, 6801000.0 ], [ 641000.0, 6801000.0 ], [ 641000.0, 6800000.0 ], [ 640000.0, 6800000.0 ], [ 640000.0, 6799000.0 ], [ 638000.0, 6799000.0 ], [ 638000.0, 6798000.0 ], [ 637000.0, 6798000.0 ], [ 637000.0, 6799000.0 ], [ 635000.0, 6799000.0 ], [ 635000.0, 6798000.0 ], [ 631000.0, 6798000.0 ], [ 631000.0, 6797000.0 ], [ 623000.0, 6797000.0 ], [ 623000.0, 6798000.0 ], [ 622000.0, 6798000.0 ], [ 622000.0, 6799000.0 ], [ 621000.0, 6799000.0 ], [ 621001.69765561842, 6803743.6540016169 ], [ 622001.69765561842, 6803743.6540016169 ], [ 622003.39531123685, 6810149.3936944222 ], [ 620003.39531123685, 6810149.3936944222 ], [ 620000.0, 6811000.0 ], [ 619000.0, 6811000.0 ], [ 619000.0, 6814000.0 ], [ 614000.0, 6814000.0 ], [ 614000.0, 6815329.3451899756 ], [ 613000.0, 6815329.3451899756 ], [ 613000.0, 6817033.9531123694 ], [ 611000.0, 6817033.9531123694 ], [ 611000.0, 6818000.0 ], [ 610000.0, 6818000.0 ], [ 610000.0, 6820000.0 ], [ 609000.0, 6820000.0 ], [ 609000.0, 6823000.0 ], [ 608000.0, 6823000.0 ], [ 608000.0, 6828000.0 ], [ 607000.0, 6828000.0 ], [ 607000.0, 6829176.5561843161 ], [ 605000.0, 6829176.5561843161 ], [ 605000.0, 6830000.0 ], [ 603000.0, 6830000.0 ], [ 603020.3718674212, 6834387.0654810024 ], [ 600000.0, 6834387.0654810024 ], [ 600000.0, 6835000.0 ], [ 599000.0, 6835000.0 ], [ 599000.0, 6838000.0 ], [ 598000.00000000012, 6838000.0 ], [ 598000.00000000012, 6839000.0 ], [ 596000.0, 6839000.0 ], [ 596000.0, 6840000.0 ], [ 595000.0, 6840000.0 ], [ 595000.0, 6844000.0 ], [ 594000.0, 6844000.0 ], [ 594000.0, 6848000.0 ], [ 595000.0, 6848000.0 ], [ 595000.0, 6851000.0 ], [ 594000.0, 6851000.0 ], [ 594000.0, 6862112.0452708164 ], [ 593000.0, 6862112.0452708164 ], [ 593000.0, 6863000.0 ], [ 592000.0, 6863000.0 ], [ 592000.0, 6864000.0 ], [ 591000.0, 6864000.0 ], [ 591000.0, 6865996.6046887627 ], [ 592000.0, 6865993.2093775263 ], [ 592000.0, 6867000.0 ], [ 591101.85933710588, 6866993.2093775263 ], [ 591098.46402586903, 6869067.9062247379 ], [ 589006.79062247381, 6869071.3015359743 ], [ 589000.0, 6871000.0 ], [ 588000.0, 6871000.0 ], [ 588000.0, 6875000.0 ], [ 586103.55699272442, 6875000.0 ], [ 586103.84284429357, 6875971.7869238332 ], [ 586000.35756107711, 6875971.3612318663 ], [ 586003.54355935147, 6880016.8289156994 ], [ 587002.32351311669, 6880022.7633628687 ], [ 587002.63550864242, 6881000.5956181437 ], [ 586592.48181083263, 6880998.5448666131 ], [ 585860.79223928868, 6884978.0113177039 ], [ 586000.0, 6885220.8569118837 ], [ 587759.98383185128, 6887000.0 ], [ 590000.0, 6887000.0 ], [ 590000.0, 6889000.0 ] ] ]
).transform("EPSG:2154", "EPSG:3857");

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
			var randPort = Math.floor(Math.random() * (8019 - 8000 + 1)) + 8000
		    var url = 'http://127.0.0.1:'+randPort+'/tms/1.1.0/Paris2016/'+z+'/'+ x +'/'+y +'.jpg';
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
	  //layImagery,
	  laySMP//,
	  //grpImgOverlay  
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


  /**
    * Elements that make up the popup.
    */
  /*
  var container = document.getElementById('popup');
  var content = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer');
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


//
      /**
       * Add a click handler to the map to render the popup.
       */
 /*     map.on('singleclick', function(evt) {
        var coordinate = evt.coordinate;
        var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
            coordinate, 'EPSG:3857', 'EPSG:4326'));

        content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
            '</code>';
        overlay.setPosition(coordinate);
      });
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
	      


/*

	// Overlay
	var menu = new ol.control.Overlay ({ closeBox : true, className: "slide-up menu", content: $("#menu") });
	map.addControl(menu);

	// A toggle control to show/hide the menu
	var t = new ol.control.Toggle(
			{	html: '<i class="fa fa-bars" ></i>',
				className: "menu",
				title: "Menu",
				onToggle: function() { menu.toggle(); }
			});
	map.addControl(t);

	// Control Select 
	var select = new ol.interaction.Select({});
	map.addInteraction(select);

	// On selected => show/hide popup
	select.getFeatures().on('add', function(e)
	{	var feature = e.element;
		var img = $("<img>").attr("src", feature.get("img"));
		var info = $("<div>").append( $("<p>").text(feature.get("text")));
		var content = $("<div>")
				.append( img )
				.append(info);
		$(".data").html(content);
	});
	select.getFeatures().on('remove', function(e)
	{	$(".data").html("");
	});

*/

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


function getCenterOfExtent(Extent){
  var X = Extent[0] + (Extent[2]-Extent[0])/2;
  var Y = Extent[1] + (Extent[3]-Extent[1])/2;
  return [X, Y];
  }



