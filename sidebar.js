(function() {
  
    proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");


  
    var viewInfoControl = new ol.control.ViewInfo({
	coordsource: 'center', //the coordinate to be displayed 'center'=center of the viewport or
			      //'pointer'= mouse pointer
	coordproj: 'EPSG:2154' //the projection used to display coordinates in the components
    });
  
    var map = new ol.Map({
        target: 'map',
	 controls: ol.control.defaults(/*{
          attributionOptions: {
            collapsible: false
          }
        }*/).extend([viewInfoControl]),
        layers: [
        /*
            new ol.layer.Group({
                'title': 'Base maps',
                'fold': 'open',
                layers: [
                    new ol.layer.Group({
                        title: 'Water color with labels',
                        type: 'base',
                        combine: true,
                        visible: false,
                        layers: [
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'watercolor'
                                })
                            }),
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'terrain-labels'
                                })
                            })
                        ]
                    }),
                    new ol.layer.Tile({
                        title: 'Water color',
                        type: 'base',
                        visible: false,
                        source: new ol.source.Stamen({
                            layer: 'watercolor'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    })
                ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [
                    new ol.layer.Image({
                        title: 'Countries',
                        source: new ol.source.ImageArcGISRest({
                            ratio: 1,
                            params: {'LAYERS': 'show:0'},
                            url: "https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer"
                        })
                    })
                ]
            })*/
	/*
          new ol.layer.Tile({
            source: new ol.source.XYZ({
              attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                  'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
          })	*/
	
          new ol.layer.Tile({
            source: new ol.source.XYZ({
              attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                  'rest/services/World_Imagery/MapServer">ArcGIS</a>',
              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                  'World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
          })
    /*
         new ol.layer.Tile({
            source: new ol.source.XYZ({
              attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                  'rest/services/High_Resolution_30cm_Imagery/MapServer">ArcGIS</a>',
              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                  'High_Resolution_30cm_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
          })	*/
    
        ],
        view: new ol.View({
            center: ol.proj.transform([2.48, 48.28], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
        })
    });

    // Get out-of-the-map div element with the ID "layers" and renders layers to it.
    // NOTE: If the layers are changed outside of the layer switcher then you
    // will need to call ol.control.LayerSwitcher.renderPanel again to refesh
    // the layer tree. Style the tree via CSS.
    var sidebar = new ol.control.Sidebar({ element: 'sidebar', position: 'right' });
    var toc = document.getElementById("layers");
    //ol.control.LayerSwitcher.renderPanel(map, toc);
    map.addControl(sidebar);

})();
