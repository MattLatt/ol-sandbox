var map = new ol.Map({
  target: 'map',
  controls: ol.control.defaults().extend([
          new ol.control.OverviewMap(),
          new ol.control.ZoomToExtent({
            extent: [
              2.10, 48.0,
              2.8, 48.7
            ]
          }),
	  new ol.contrlo.FullScreen()
        ]),
  interactions: ol.interaction.defaults({
                doubleClickZoom: false,
                dragAndDrop: false,
                      dragPan: false,
                      keyboardPan: false,
                      keyboardZoom: false,
                      mouseWheelZoom: false,
                      pointer: false,
                      select: false
            }),
  layers: [
    new ol.layer.Tile({
            source: new ol.source.XYZ({
              attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                  'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
          })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([2.21, 48.82]),
    zoom: 8
  })
});
